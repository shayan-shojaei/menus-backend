import { IsDefined, IsNumber } from 'class-validator';

export class CreateBranchLocationCoordinatesRequest {
  @IsDefined()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  lat: number;

  @IsDefined()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  lng: number;
}
