import { ObjectId } from 'mongodb';
import { MenuGroupCategory } from '@domain/menu/menuGroup/entity/menuGroupCategory.entity';

export class MenuGroup {
  static collectionName = 'menuGroups';

  _id: ObjectId;

  name: string;

  categories: MenuGroupCategory[];

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;

  user: ObjectId;

  constructor(partial: Partial<MenuGroup>) {
    if (partial) {
      this.createdAt = new Date();
      this.updatedAt = null;
      this.deletedAt = null;

      this.categories = [];

      Object.assign(this, partial);
    }
  }
}
