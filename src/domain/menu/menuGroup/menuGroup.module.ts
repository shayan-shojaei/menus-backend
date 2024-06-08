import { Module } from '@nestjs/common';
import { MongoModule } from '@common/mongo';
import { MenuGroup } from '@domain/menu/menuGroup/entity';
import { MenuGroupController } from '@domain/menu/menuGroup/menuGroup.controller';
import { MenuGroupRepository } from '@domain/menu/menuGroup/menuGroup.repository';
import { MenuGroupService } from '@domain/menu/menuGroup/menuGroup.service';

@Module({
  imports: [MongoModule.forFeature([MenuGroup.collectionName])],
  controllers: [MenuGroupController],
  providers: [MenuGroupService, MenuGroupRepository],
  exports: [MenuGroupService],
})
export class MenuGroupModule {}
