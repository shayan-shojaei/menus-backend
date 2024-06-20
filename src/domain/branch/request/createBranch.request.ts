import { ObjectId } from 'mongodb';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CreateBranchLocationRequest } from '@domain/branch/request';
import { IsObjectId } from '@common/validators';
import { toObjectId } from '@common/transformers';

export class CreateBranchRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateBranchLocationRequest)
  location: CreateBranchLocationRequest;

  @IsOptional()
  @IsObjectId()
  @Transform(toObjectId)
  menuGroup?: ObjectId;

  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsArray()
  tables?: string[];
}
