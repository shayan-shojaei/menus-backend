import { ObjectId } from 'mongodb';

export class Branch {
  static collectionName = 'branches';

  _id: ObjectId;

  name: string;
}
