import { ObjectId } from 'mongodb';

export class MenuItem {
  static collectionName = 'menuItems';

  _id: ObjectId;

  name: string;

  picture: string;

  price: number;

  description: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;

  user: ObjectId;

  constructor(partial: Partial<MenuItem>) {
    if (partial) {
      this.createdAt = new Date();
      this.updatedAt = null;
      this.deletedAt = null;

      Object.assign(this, partial);
    }
  }
}
