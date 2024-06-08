import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class UpdateUserRequest {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  brandName: string;

  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  phoneNumber: string;
}
