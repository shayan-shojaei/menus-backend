import { Module } from '@nestjs/common';
import { MongoModule } from '@common/mongo';
import { Branch } from '@domain/branch/entity';
import { BranchService } from '@domain/branch/branch.service';
import { BranchRepository } from '@domain/branch/branch.repository';
import { BranchController } from '@domain/branch/branch.controller';
import { UserModule } from '@domain/account/user/user.module';

@Module({
  imports: [MongoModule.forFeature([Branch.collectionName]), UserModule],
  controllers: [BranchController],
  providers: [BranchService, BranchRepository],
  exports: [BranchService],
})
export class BranchModule {}
