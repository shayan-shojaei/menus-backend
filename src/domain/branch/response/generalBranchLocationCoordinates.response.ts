import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GeneralBranchLocationCoordinatesResponse {
  @Expose()
  lat: number;

  @Expose()
  lng: number;
}
