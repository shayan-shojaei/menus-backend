import { Branch, BranchLocation } from '@domain/branch/entity';
import { ObjectId } from 'mongodb';
import {
  IsArray,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBranchLocationRequest } from '@domain/branch/request';

export class CreateBranchRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateBranchLocationRequest)
  location: CreateBranchLocationRequest;

  @IsOptional()
  @IsMongoId()
  menuGroup?: ObjectId;

  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsArray()
  tables?: string[];
}
