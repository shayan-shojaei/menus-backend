import { Exclude, Expose, Type } from 'class-transformer';
import { GeneralMenuGroupCategoryResponse } from '@domain/menu/menuGroup/response';
import { DetailedMenuCategoryItemResponse } from '@domain/menu/menuCategory/response';

@Exclude()
export class DetailedMenuGroupCategoryResponse extends GeneralMenuGroupCategoryResponse {
  @Expose()
  name: string;

  @Expose()
  @Type(() => DetailedMenuCategoryItemResponse)
  items: DetailedMenuCategoryItemResponse[];
}
