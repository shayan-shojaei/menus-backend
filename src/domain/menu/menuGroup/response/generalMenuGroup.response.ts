import { ObjectId } from 'mongodb';
import { Exclude, Expose, Type } from 'class-transformer';
import { GeneralMenuGroupCategoryResponse } from '@domain/menu/menuGroup/response';

@Exclude()
export class GeneralMenuGroupResponse {
  @Expose()
  @Type(() => String)
  _id: ObjectId;

  @Expose()
  name: string;

  @Expose()
  @Type(() => GeneralMenuGroupCategoryResponse)
  categories: GeneralMenuGroupCategoryResponse[];

  @Expose()
  createdAt: Date;
}
