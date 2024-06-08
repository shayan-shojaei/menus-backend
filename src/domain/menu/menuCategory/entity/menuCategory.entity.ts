import { ObjectId } from 'mongodb';
import { MenuCategoryItem } from '@domain/menu/menuCategory/entity';

export class MenuCategory {
  static collectionName = 'menuCategories';

  _id: ObjectId;

  name: string;

  items: MenuCategoryItem[];

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;

  user: ObjectId;

  constructor(partial: Partial<MenuCategory>) {
    if (partial) {
      this.createdAt = new Date();
      this.updatedAt = null;
      this.deletedAt = null;

      this.items = [];

      Object.assign(this, partial);
    }
  }
}
