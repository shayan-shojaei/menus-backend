import { Exclude, Expose, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { GeneralBranchLocationResponse } from '@domain/branch/response';

@Exclude()
export class GeneralBranchResponse {
  @Expose()
  @Type(() => String)
  _id: ObjectId;

  @Expose()
  name: string;

  @Expose()
  @Type(() => GeneralBranchLocationResponse)
  location: GeneralBranchLocationResponse;

  @Expose()
  @Type(() => String)
  menuGroup?: ObjectId;

  @Expose()
  tables?: string[];
}
