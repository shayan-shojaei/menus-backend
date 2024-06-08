import { Exclude, Expose, Type } from 'class-transformer';
import {
  GeneralMenuGroupCategoryResponse,
  GeneralMenuGroupResponse,
} from '@domain/menu/menuGroup/response';
import { DetailedMenuGroupCategoryResponse } from '@domain/menu/menuGroup/response/detailedMenuGroupCategory.response';

@Exclude()
export class DetailedMenuGroupResponse extends GeneralMenuGroupResponse {
  @Expose()
  @Type(() => DetailedMenuGroupCategoryResponse)
  categories:
    | GeneralMenuGroupCategoryResponse[]
    | DetailedMenuGroupCategoryResponse[];
}
