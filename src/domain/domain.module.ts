import { Module } from '@nestjs/common';
import { AccountModule } from '@domain/account/account.module';

@Module({
  imports: [AccountModule],
})
export class DomainModule {}
