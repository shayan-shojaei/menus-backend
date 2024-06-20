import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from '@domain/general/media/media.service';
import { AuthenticationGuard } from '@common/guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticatedUser, CurrentUser } from '@common/decorators';
import { GeneralMediaResponse } from '@domain/general/media/response';
import { TransformPlainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@Controller(MediaController.path)
@ApiTags(MediaController.path)
export class MediaController {
  static path = 'general/media';

  constructor(private readonly mediaService: MediaService) {}

  @Get('*')
  @HttpCode(HttpStatus.OK)
  async simpleGet(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    return this.mediaService.findMedia(req, res);
  }

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthenticationGuard)
  @TransformPlainToInstance(GeneralMediaResponse)
  async uploadMedia(
    @CurrentUser() authenticatedUser: AuthenticatedUser,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<GeneralMediaResponse> {
    return this.mediaService.uploadMedia(authenticatedUser, file);
  }
}
