import { BadRequestException, Injectable } from '@nestjs/common';
import { MenuGroupRepository } from '@domain/menu/menuGroup/menuGroup.repository';
import { MenuGroup } from '@domain/menu/menuGroup/entity';
import { CreateMenuGroupRequest } from '@domain/menu/menuGroup/request';
import { AuthenticatedUser } from '@common/decorators';
import { ObjectId } from 'mongodb';
import { MenuCategory } from '@domain/menu/menuCategory/entity';
import { MenuItem } from '@domain/menu/menuItem/entity';

@Injectable()
export class MenuGroupService {
  constructor(private readonly menuGroupRepository: MenuGroupRepository) {}

  async findUserMenuGroups(
    authenticatedUser: AuthenticatedUser,
  ): Promise<MenuGroup[]> {
    return this.menuGroupRepository.findUserMenuGroups(authenticatedUser._id);
  }

  async findOne(
    authenticatedUser: AuthenticatedUser,
    id: ObjectId,
  ): Promise<MenuGroup> {
    const menuGroup = (await this.menuGroupRepository.findOne(
      id,
      authenticatedUser._id,
    )) as MenuGroup & { lookedUpCategories: MenuCategory[] };

    menuGroup.categories = menuGroup.categories.map((category) => {
      const lookedUpCategory = menuGroup.lookedUpCategories.find(
        (lookedUpCategory) => lookedUpCategory._id.equals(category._id),
      ) as MenuCategory & { lookedUpItems: MenuItem[] };

      lookedUpCategory.items = lookedUpCategory.items.map((item) => ({
        ...lookedUpCategory.lookedUpItems.find((lookedUpItem) =>
          lookedUpItem._id.equals(item._id),
        ),
        position: item.position,
      }));
      delete lookedUpCategory.lookedUpItems;

      return {
        ...lookedUpCategory,
        position: category.position,
      };
    });

    delete menuGroup.lookedUpCategories;

    return menuGroup;
  }

  async create(
    authenticatedUser: AuthenticatedUser,
    createMenuGroupRequest: CreateMenuGroupRequest,
  ): Promise<MenuGroup> {
    const userMenuGroups = await this.findUserMenuGroups(authenticatedUser);

    const duplicateMenuGroup = userMenuGroups.find(
      (menuGroup) =>
        menuGroup.name.toLowerCase() ===
        createMenuGroupRequest.name.toLowerCase(),
    );

    if (duplicateMenuGroup) {
      throw new BadRequestException(
        'A menu group with this name already exists',
      );
    }

    const menuGroup = new MenuGroup({
      ...createMenuGroupRequest,
      user: authenticatedUser._id,
    });

    return this.menuGroupRepository.create(menuGroup);
  }

  async update(
    authenticatedUser: AuthenticatedUser,
    menuGroupId: ObjectId,
    updateMenuGroupRequest: CreateMenuGroupRequest,
  ): Promise<MenuGroup> {
    const userMenuGroups = await this.findUserMenuGroups(authenticatedUser);

    const isOwner = userMenuGroups.some((menuGroup) =>
      menuGroup._id.equals(menuGroupId),
    );

    if (!isOwner) {
      throw new BadRequestException('Menu group not found');
    }

    const duplicateMenuGroup = userMenuGroups.find(
      (menuGroup) =>
        menuGroup.name.toLowerCase() ===
          updateMenuGroupRequest.name.toLowerCase() &&
        !menuGroup._id.equals(menuGroupId),
    );

    if (duplicateMenuGroup) {
      throw new BadRequestException(
        'A menu group with this name already exists',
      );
    }

    return this.menuGroupRepository.update(menuGroupId, updateMenuGroupRequest);
  }

  async delete(
    authenticatedUser: AuthenticatedUser,
    menuGroupId: ObjectId,
  ): Promise<void> {
    const userMenuGroups = await this.findUserMenuGroups(authenticatedUser);

    const isOwner = userMenuGroups.some((menuGroup) =>
      menuGroup._id.equals(menuGroupId),
    );

    if (!isOwner) {
      throw new BadRequestException('Menu group not found');
    }

    await this.menuGroupRepository.update(menuGroupId, {
      deletedAt: new Date(),
    });
  }
}
