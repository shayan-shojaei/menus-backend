import {
  IsDefined,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBranchLocationCoordinatesRequest } from '@domain/branch/request';

export class CreateBranchLocationRequest {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateBranchLocationCoordinatesRequest)
  coordinates: CreateBranchLocationCoordinatesRequest;
}
