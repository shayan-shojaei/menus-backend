import { Injectable } from '@nestjs/common';
import { InjectCollection } from '@common/mongo';
import { MenuGroup } from '@domain/menu/menuGroup/entity';
import { Collection, ObjectId, ReturnDocument } from 'mongodb';
import { MenuCategory } from '@domain/menu/menuCategory/entity';
import { MenuItem } from '@domain/menu/menuItem/entity';

@Injectable()
export class MenuGroupRepository {
  constructor(
    @InjectCollection(MenuGroup.collectionName)
    private readonly menuGroupCollection: Collection<MenuGroup>,
  ) {}

  async findUserMenuGroups(user: ObjectId): Promise<MenuGroup[]> {
    return this.menuGroupCollection
      .find({ user: user, deletedAt: null })
      .toArray();
  }

  async findOne(id: ObjectId, user: ObjectId): Promise<MenuGroup> {
    return this.menuGroupCollection
      .aggregate<MenuGroup>([
        {
          $match: {
            _id: id,
            user: user,
            deletedAt: null,
          },
        },
        {
          $lookup: {
            from: MenuCategory.collectionName,
            let: { categories: '$categories._id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$_id', '$$categories'],
                  },
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
            ],
            as: 'lookedUpCategories',
          },
        },
      ])
      .next();
  }

  async create(menuGroup: MenuGroup): Promise<MenuGroup> {
    const { insertedId } = await this.menuGroupCollection.insertOne(menuGroup);
    return this.menuGroupCollection.findOne({ _id: insertedId });
  }

  async update(
    menuGroupId: ObjectId,
    menuGroup: Partial<MenuGroup>,
  ): Promise<MenuGroup> {
    return this.menuGroupCollection.findOneAndUpdate(
      { _id: menuGroupId },
      { $set: { ...menuGroup, updatedAt: new Date() } },
      { returnDocument: ReturnDocument.AFTER },
    );
  }
}
