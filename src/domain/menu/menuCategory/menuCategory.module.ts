import { Module } from '@nestjs/common';
import { MongoModule } from '@common/mongo';
import { MenuCategory } from '@domain/menu/menuCategory/entity';
import { MenuCategoryController } from '@domain/menu/menuCategory/menuCategory.controller';
import { MenuCategoryRepository } from '@domain/menu/menuCategory/menuCategory.repository';
import { MenuCategoryService } from '@domain/menu/menuCategory/menuCategory.service';

@Module({
  imports: [MongoModule.forFeature([MenuCategory.collectionName])],
  controllers: [MenuCategoryController],
  providers: [MenuCategoryService, MenuCategoryRepository],
  exports: [MenuCategoryService],
})
export class MenuCategoryModule {}
