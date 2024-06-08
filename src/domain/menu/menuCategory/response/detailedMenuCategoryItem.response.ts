import { Exclude, Expose } from 'class-transformer';
import { GeneralMenuCategoryItemResponse } from '@domain/menu/menuCategory/response';

@Exclude()
export class DetailedMenuCategoryItemResponse extends GeneralMenuCategoryItemResponse {
  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  picture: string;

  @Expose()
  price: number;
}
