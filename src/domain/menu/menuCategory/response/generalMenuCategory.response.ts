import { ObjectId } from 'mongodb';
import { Exclude, Expose, Type } from 'class-transformer';
import { GeneralMenuCategoryItemResponse } from '@domain/menu/menuCategory/response';

@Exclude()
export class GeneralMenuCategoryResponse {
  @Expose()
  @Type(() => String)
  _id: ObjectId;

  @Expose()
  name: string;

  @Expose()
  @Type(() => GeneralMenuCategoryItemResponse)
  items: GeneralMenuCategoryItemResponse[];

  @Expose()
  createdAt: Date;
}
