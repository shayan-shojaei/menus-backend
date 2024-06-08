import { Injectable } from '@nestjs/common';
import { InjectCollection } from '@common/mongo';
import { MenuCategory } from '@domain/menu/menuCategory/entity';
import { Collection, ObjectId, ReturnDocument } from 'mongodb';
import { MenuItem } from '@domain/menu/menuItem/entity';

@Injectable()
export class MenuCategoryRepository {
  constructor(
    @InjectCollection(MenuCategory.collectionName)
    private readonly menuCategoryCollection: Collection<MenuCategory>,
  ) {}

  async findUserMenuCategories(user: ObjectId): Promise<MenuCategory[]> {
    return this.menuCategoryCollection
      .find({ user: user, deletedAt: null })
      .toArray();
  }

  async findOne(id: ObjectId, user: ObjectId): Promise<MenuCategory> {
    return this.menuCategoryCollection
      .aggregate<MenuCategory>([
        {
          $match: {
            _id: id,
            user: user,
            deletedAt: null,
          },
        },
        {
          $lookup: {
            from: MenuItem.collectionName,
            let: { items: '$items._id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$_id', '$$items'],
                  },
                  deletedAt: null,
                },
              },
            ],
            as: 'lookedUpItems',
          },
        },
      ])
      .next();
  }

  async create(menuCategory: MenuCategory): Promise<MenuCategory> {
    const { insertedId } =
      await this.menuCategoryCollection.insertOne(menuCategory);
    return this.menuCategoryCollection.findOne({ _id: insertedId });
  }

  async update(
    menuCategoryId: ObjectId,
    menuCategory: Partial<MenuCategory>,
  ): Promise<MenuCategory> {
    return this.menuCategoryCollection.findOneAndUpdate(
      { _id: menuCategoryId },
      { $set: { ...menuCategory, updatedAt: new Date() } },
      { returnDocument: ReturnDocument.AFTER },
    );
  }
}
