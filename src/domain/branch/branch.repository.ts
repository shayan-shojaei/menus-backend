import { Injectable } from '@nestjs/common';
import { InjectCollection } from '@common/mongo';
import { Branch } from '@domain/branch/entity';
import { Collection, ObjectId, ReturnDocument } from 'mongodb';

@Injectable()
export class BranchRepository {
  constructor(
    @InjectCollection(Branch.collectionName)
    private readonly branchCollection: Collection<Branch>,
  ) {}

  async find(branches: ObjectId[]): Promise<Branch[]> {
    return this.branchCollection
      .find({ _id: { $in: branches }, deletedAt: null })
      .toArray();
  }

  async findOne(branchId: ObjectId): Promise<Branch> {
    return this.branchCollection.findOne({ _id: branchId, deletedAt: null });
  }

  async create(branch: Branch): Promise<Branch> {
    const { insertedId } = await this.branchCollection.insertOne(branch);
    return this.branchCollection.findOne({ _id: insertedId });
  }

  async update(branchId: ObjectId, branch: Partial<Branch>): Promise<Branch> {
    return this.branchCollection.findOneAndUpdate(
      {
        _id: branchId,
      },
      {
        $set: branch,
      },
      {
        returnDocument: ReturnDocument.AFTER,
      },
    );
  }
}
