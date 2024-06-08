import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMenuCategoryItemRequest } from '@domain/menu/menuCategory/request';

export class CreateMenuCategoryRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMenuCategoryItemRequest)
  items?: CreateMenuCategoryItemRequest[];
}
