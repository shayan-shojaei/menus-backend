import { Exclude, Expose, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';

@Exclude()
export class GeneralMediaResponse {
  @Expose()
  @Type(() => String)
  _id: ObjectId;

  @Expose()
  name: string;

  @Expose()
  createdAt: Date;
}
