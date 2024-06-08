import { ObjectId } from 'mongodb';
import { UserBranch } from '@domain/account/user/entity/userBranch.entity';

export class User {
  static collectionName = 'users';

  _id: ObjectId;

  firstName: string;

  lastName: string;

  brandName: string;

  phoneNumber: string;

  email: string;

  password: string;

  branches: ObjectId[] | UserBranch[];

  createdAt: Date;

  updatedAt: Date;

  constructor(partial: Partial<User>) {
    if (partial) {
      this.branches = [];

      this.createdAt = new Date();
      this.updatedAt = null;

      Object.assign(this, partial);
    }
  }
}
