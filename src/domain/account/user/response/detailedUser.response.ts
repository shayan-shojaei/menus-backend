import { Exclude, Expose, Type } from 'class-transformer';
import { GeneralUserResponse } from '@domain/account/user/response';
import { ObjectId } from 'mongodb';

@Exclude()
export class DetailedUserBranchResponse {
  @Expose()
  @Type(() => String)
  _id: ObjectId;

  @Expose()
  name: string;
}

@Exclude()
export class DetailedUserResponse extends GeneralUserResponse {
  @Expose()
  @Type(() => DetailedUserBranchResponse)
  branches: ObjectId[] | DetailedUserBranchResponse[];
}
