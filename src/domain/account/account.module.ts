import { Module } from '@nestjs/common';
import { UserModule } from '@domain/account/user/user.module';
import { AuthenticationModule } from '@domain/account/authentication/authentication.module';

@Module({
  imports: [UserModule, AuthenticationModule],
})
export class AccountModule {}
