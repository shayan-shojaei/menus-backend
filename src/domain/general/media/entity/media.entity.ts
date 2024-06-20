import { ObjectId } from 'mongodb';

export class Media {
  static collectionName = 'media';

  _id: ObjectId;

  name: string;

  path: string;

  createdBy: ObjectId;

  createdAt: Date;

  constructor(partial: Partial<Media>) {
    if (partial) {
      this.createdAt = new Date();
      Object.assign(this, partial);
    }
  }
}
