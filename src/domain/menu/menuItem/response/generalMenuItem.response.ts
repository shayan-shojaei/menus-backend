import { ObjectId } from 'mongodb';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class GeneralMenuItemResponse {
  @Expose()
  @Type(() => String)
  _id: ObjectId;

  @Expose()
  name: string;

  @Expose()
  picture: string;

  @Expose()
  price: number;

  @Expose()
  description: string;

  @Expose()
  createdAt: Date;
}
