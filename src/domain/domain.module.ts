import { Module } from '@nestjs/common';
import { AccountModule } from '@domain/account/account.module';
import { BranchModule } from '@domain/branch/branch.module';

@Module({
  imports: [AccountModule, BranchModule],
})
export class DomainModule {}
