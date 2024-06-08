import { Exclude, Expose, Type } from 'class-transformer';
import {
  GeneralMenuCategoryResponse,
  DetailedMenuCategoryItemResponse,
  GeneralMenuCategoryItemResponse,
} from '@domain/menu/menuCategory/response';

@Exclude()
export class DetailedMenuCategoryResponse extends GeneralMenuCategoryResponse {
  @Expose()
  @Type(() => DetailedMenuCategoryItemResponse)
  items: GeneralMenuCategoryItemResponse[] | DetailedMenuCategoryItemResponse[];
}
