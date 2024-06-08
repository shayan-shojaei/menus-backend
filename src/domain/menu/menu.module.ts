import { Module } from '@nestjs/common';
import { MenuGroupModule } from '@domain/menu/menuGroup/menuGroup.module';
import { MenuCategoryModule } from '@domain/menu/menuCategory/menuCategory.module';
import { MenuItemModule } from '@domain/menu/menuItem/menuItem.module';

@Module({
  imports: [MenuGroupModule, MenuCategoryModule, MenuItemModule],
})
export class MenuModule {}
