import { ObjectId } from 'mongodb';
import { BranchLocation } from '@domain/branch/entity';

export class Branch {
  static collectionName = 'branches';

  _id: ObjectId;

  name: string;

  location: BranchLocation;

  tables?: string[];

  menuGroup?: ObjectId;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;

  constructor(partial: Partial<Branch>) {
    if (partial) {
      this.tables = undefined;
      this.menuGroup = undefined;

      this.createdAt = new Date();
      this.updatedAt = null;
      this.deletedAt = null;

      Object.assign(this, partial);
    }
  }
}
