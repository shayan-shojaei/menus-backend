import { Module } from '@nestjs/common';
import { MongoModule } from '@common/mongo';
import { MenuItem } from '@domain/menu/menuItem/entity';
import { MenuItemController } from '@domain/menu/menuItem/menuItem.controller';
import { MenuItemRepository } from '@domain/menu/menuItem/menuItem.repository';
import { MenuItemService } from '@domain/menu/menuItem/menuItem.service';

@Module({
  imports: [MongoModule.forFeature([MenuItem.collectionName])],
  controllers: [MenuItemController],
  providers: [MenuItemService, MenuItemRepository],
  exports: [MenuItemService],
})
export class MenuItemModule {}
