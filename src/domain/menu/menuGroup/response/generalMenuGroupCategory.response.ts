import { ObjectId } from 'mongodb';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class GeneralMenuGroupCategoryResponse {
  @Expose()
  @Type(() => String)
  _id: ObjectId;

  @Expose()
  position: number;
}
