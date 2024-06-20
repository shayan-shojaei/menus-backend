import { Injectable } from '@nestjs/common';
import { InjectCollection } from '@common/mongo';
import { Media } from '@domain/general/media/entity';
import { Collection, ObjectId } from 'mongodb';

@Injectable()
export class MediaRepository {
  constructor(
    @InjectCollection(Media.collectionName)
    private readonly mediaCollection: Collection<Media>,
  ) {}

  async create(media: Media): Promise<Media> {
    const { insertedId } = await this.mediaCollection.insertOne(media);
    return this.mediaCollection.findOne({ _id: insertedId });
  }

  async findOne(id: ObjectId): Promise<Media> {
    return this.mediaCollection.findOne({ _id: id });
  }

  async findByName(name: string): Promise<Media> {
    return this.mediaCollection.findOne({ name: name });
  }
}
