import { Global, Module } from '@nestjs/common';
import { UserModule } from '@domain/account/user/user.module';
import { AuthenticationController } from '@domain/account/authentication/authentication.controller';
import { AuthenticationService } from '@domain/account/authentication/authentication.service';

@Global()
@Module({
  imports: [UserModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
