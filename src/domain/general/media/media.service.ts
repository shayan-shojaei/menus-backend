import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MediaRepository } from '@domain/general/media/media.repository';
import { AuthenticatedUser } from '@common/decorators';
import { ObjectId } from 'mongodb';
import path from 'path';
import fs from 'fs/promises';
import { Config } from '@common/helper';
import { Media } from '@domain/general/media/entity';
import { GeneralMediaResponse } from '@domain/general/media/response';
import { Request, Response } from 'express';

export const MAX_BUFFER_SIZE = 2_000_000; // 2MB
export const ALLOWED_MEDIA_FORMATS = ['jpeg', 'jpg', 'png'];

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async uploadMedia(
    authenticatedUser: AuthenticatedUser,
    file: Express.Multer.File,
  ): Promise<GeneralMediaResponse> {
    const fileId = new ObjectId();
    const nameLength = file.originalname.lastIndexOf('.');
    const fileLength = file.originalname.length;
    const ext = file.originalname.substring(nameLength + 1, fileLength);
    const fileName = `${fileId.toHexString()}.${ext}`;

    if (!ALLOWED_MEDIA_FORMATS.includes(ext)) {
      throw new BadRequestException('Only jpg, jpeg and png file is allowed');
    }

    if (file.size > MAX_BUFFER_SIZE) {
      throw new HttpException(
        'file size is too large, max size is 2MB',
        HttpStatus.PAYLOAD_TOO_LARGE,
      );
    }

    const fileAddress = path.join(Config.UploadsFolder, fileName);

    const folderExist = await fs
      .access(Config.UploadsFolder)
      .then(() => true)
      .catch(() => false);
    if (!folderExist) {
      await fs.mkdir(Config.UploadsFolder, { recursive: true });
    }

    await fs.writeFile(path.join(fileAddress), file.buffer);

    // delete image buffer
    delete file.buffer;

    // insert media into collection
    const media = new Media({
      _id: fileId,
      name: fileName,
      path: fileAddress,
      createdBy: authenticatedUser._id,
    });

    return this.mediaRepository.create(media);
  }

  async findMedia(req: Request, res: Response): Promise<Response> {
    try {
      const fileName = req.originalUrl.split('?')[0].split('/').at(-1);

      const media = await this.mediaRepository.findByName(fileName);

      const file = await fs.open(media.path, 'r');

      const image = await file.readFile();

      return res.send(image);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
