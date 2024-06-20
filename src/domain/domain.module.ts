import { Module } from '@nestjs/common';
import { AccountModule } from '@domain/account/account.module';
import { BranchModule } from '@domain/branch/branch.module';
import { MenuModule } from '@domain/menu/menu.module';
import { GeneralModule } from '@domain/general/general.module';

@Module({
  imports: [AccountModule, BranchModule, MenuModule, GeneralModule],
})
export class DomainModule {}
