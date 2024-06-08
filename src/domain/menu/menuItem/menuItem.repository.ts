import { Injectable } from '@nestjs/common';
import { InjectCollection } from '@common/mongo';
import { Collection, ObjectId, ReturnDocument } from 'mongodb';
import { MenuItem } from '@domain/menu/menuItem/entity';

@Injectable()
export class MenuItemRepository {
  constructor(
    @InjectCollection(MenuItem.collectionName)
    private readonly menuItemCollection: Collection<MenuItem>,
  ) {}

  async findUserMenuItems(user: ObjectId): Promise<MenuItem[]> {
    return this.menuItemCollection
      .find({ user: user, deletedAt: null })
      .toArray();
  }

  async findOne(id: ObjectId, user: ObjectId): Promise<MenuItem> {
    return this.menuItemCollection.findOne({
      _id: id,
      user: user,
      deletedAt: null,
    });
  }

  async create(menuItem: MenuItem): Promise<MenuItem> {
    const { insertedId } = await this.menuItemCollection.insertOne(menuItem);
    return this.menuItemCollection.findOne({ _id: insertedId });
  }

  async update(
    menuItemId: ObjectId,
    menuItem: Partial<MenuItem>,
  ): Promise<MenuItem> {
    return this.menuItemCollection.findOneAndUpdate(
      { _id: menuItemId },
      { $set: { ...menuItem, updatedAt: new Date() } },
      { returnDocument: ReturnDocument.AFTER },
    );
  }
}
