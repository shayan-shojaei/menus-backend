import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoginResponse {
  @Expose()
  token: string;
}
