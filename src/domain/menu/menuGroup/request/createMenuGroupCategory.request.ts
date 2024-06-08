import { IsArray, IsDefined, IsInt, IsOptional, Min } from 'class-validator';
import { IsObjectId } from '@common/validators';
import { Transform } from 'class-transformer';
import { toObjectId } from '@common/transformers';
import { ObjectId } from 'mongodb';

export class CreateMenuGroupCategoryRequest {
  @IsDefined()
  @IsObjectId()
  @Transform(toObjectId)
  _id: ObjectId;

  @IsDefined()
  @IsInt()
  @Min(0)
  position: number;
}
