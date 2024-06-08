import { Exclude, Expose, Type } from 'class-transformer';
import { GeneralBranchLocationCoordinatesResponse } from '@domain/branch/response';

@Exclude()
export class GeneralBranchLocationResponse {
  @Expose()
  address: string;

  @Expose()
  @Type(() => GeneralBranchLocationCoordinatesResponse)
  coordinates: GeneralBranchLocationCoordinatesResponse;
}
