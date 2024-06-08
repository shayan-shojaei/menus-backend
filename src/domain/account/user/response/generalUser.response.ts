import { ObjectId } from 'mongodb';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class GeneralUserResponse {
  @Expose()
  @Type(() => String)
  _id: ObjectId;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  brandName: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  email: string;
}
