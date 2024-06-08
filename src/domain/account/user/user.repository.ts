import { Injectable } from '@nestjs/common';
import { InjectCollection } from '@common/mongo';
import { User } from '@domain/account/user/entity';
import { Collection, ObjectId, ReturnDocument } from 'mongodb';
import { Branch } from '@domain/branch/entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectCollection(User.collectionName)
    private readonly userCollection: Collection<User>,
  ) {}

  async create(user: User): Promise<User> {
    const { insertedId } = await this.userCollection.insertOne(user);

    return this.userCollection.findOne({ _id: insertedId });
  }

  async update(id: ObjectId, user: Partial<User>): Promise<User> {
    return this.userCollection.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          ...user,
          updatedAt: new Date(),
        },
      },
      {
        returnDocument: ReturnDocument.AFTER,
      },
    );
  }

  async find(id: ObjectId): Promise<User> {
    return this.userCollection.findOne({ _id: id });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userCollection.findOne({ email: email });
  }

  async findWithBranches(id: ObjectId): Promise<User> {
    const [user] = await this.userCollection
      .aggregate<User>([
        {
          $match: {
            _id: id,
          },
        },
        {
          $lookup: {
            from: Branch.collectionName,
            localField: 'branches',
            foreignField: '_id',
            as: 'branches',
          },
        },
      ])
      .toArray();

    return user;
  }
}
