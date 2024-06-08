import { BadRequestException, Injectable } from '@nestjs/common';
import { MenuCategoryRepository } from '@domain/menu/menuCategory/menuCategory.repository';
import { AuthenticatedUser } from '@common/decorators';
import { MenuCategory } from '@domain/menu/menuCategory/entity';
import { ObjectId } from 'mongodb';
import { CreateMenuCategoryRequest } from '@domain/menu/menuCategory/request';
import { MenuItem } from '@domain/menu/menuItem/entity';

@Injectable()
export class MenuCategoryService {
  constructor(
    private readonly menuCategoryRepository: MenuCategoryRepository,
  ) {}

  async findUserMenuCategories(
    authenticatedUser: AuthenticatedUser,
  ): Promise<MenuCategory[]> {
    return this.menuCategoryRepository.findUserMenuCategories(
      authenticatedUser._id,
    );
  }

  async findOne(
    authenticatedUser: AuthenticatedUser,
    id: ObjectId,
  ): Promise<MenuCategory> {
    const menuCategory = (await this.menuCategoryRepository.findOne(
      id,
      authenticatedUser._id,
    )) as MenuCategory & { lookedUpItems: MenuItem[] };

    menuCategory.items = menuCategory.items.map((item) => ({
      ...menuCategory.lookedUpItems.find((lookedUpItem) =>
        lookedUpItem._id.equals(item._id),
      ),
      position: item.position,
    }));
    delete menuCategory.lookedUpItems;

    return menuCategory;
  }

  async create(
    authenticatedUser: AuthenticatedUser,
    createMenuCategoryRequest: CreateMenuCategoryRequest,
  ): Promise<MenuCategory> {
    const userMenuCategories =
      await this.findUserMenuCategories(authenticatedUser);

    const duplicateMenuCategory = userMenuCategories.find(
      (menuCategory) =>
        menuCategory.name.toLowerCase() ===
        createMenuCategoryRequest.name.toLowerCase(),
    );

    if (duplicateMenuCategory) {
      throw new BadRequestException(
        'A menu item with this name already exists',
      );
    }

    const menuCategory = new MenuCategory({
      ...createMenuCategoryRequest,
      user: authenticatedUser._id,
    });

    return this.menuCategoryRepository.create(menuCategory);
  }

  async update(
    authenticatedUser: AuthenticatedUser,
    menuCategoryId: ObjectId,
    updateMenuCategoryRequest: CreateMenuCategoryRequest,
  ): Promise<MenuCategory> {
    const userMenuCategories =
      await this.findUserMenuCategories(authenticatedUser);

    const isOwner = userMenuCategories.some((menuCategory) =>
      menuCategory._id.equals(menuCategoryId),
    );

    if (!isOwner) {
      throw new BadRequestException('Menu group not found');
    }

    const duplicateMenuCategory = userMenuCategories.find(
      (menuCategory) =>
        menuCategory.name.toLowerCase() ===
          updateMenuCategoryRequest.name.toLowerCase() &&
        !menuCategory._id.equals(menuCategoryId),
    );

    if (duplicateMenuCategory) {
      throw new BadRequestException(
        'A menu category with this name already exists',
      );
    }

    return this.menuCategoryRepository.update(
      menuCategoryId,
      updateMenuCategoryRequest,
    );
  }

  async delete(
    authenticatedUser: AuthenticatedUser,
    menuCategoryId: ObjectId,
  ): Promise<void> {
    const userMenuCategories =
      await this.findUserMenuCategories(authenticatedUser);

    const isOwner = userMenuCategories.some((menuCategory) =>
      menuCategory._id.equals(menuCategoryId),
    );

    if (!isOwner) {
      throw new BadRequestException('Menu category not found');
    }

    await this.menuCategoryRepository.update(menuCategoryId, {
      deletedAt: new Date(),
    });
  }
}
