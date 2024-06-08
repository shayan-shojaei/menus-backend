import { BadRequestException, Injectable } from '@nestjs/common';
import { MenuItemRepository } from '@domain/menu/menuItem/menuItem.repository';
import { AuthenticatedUser } from '@common/decorators';
import { MenuItem } from '@domain/menu/menuItem/entity';
import { ObjectId } from 'mongodb';
import { CreateMenuItemRequest } from '@domain/menu/menuItem/request';

@Injectable()
export class MenuItemService {
  constructor(private readonly menuItemRepository: MenuItemRepository) {}

  async findUserMenuItems(
    authenticatedUser: AuthenticatedUser,
  ): Promise<MenuItem[]> {
    return this.menuItemRepository.findUserMenuItems(authenticatedUser._id);
  }

  async findOne(
    authenticatedUser: AuthenticatedUser,
    id: ObjectId,
  ): Promise<MenuItem> {
    return this.menuItemRepository.findOne(id, authenticatedUser._id);
  }

  async create(
    authenticatedUser: AuthenticatedUser,
    createMenuItemRequest: CreateMenuItemRequest,
  ): Promise<MenuItem> {
    const userMenuItems = await this.findUserMenuItems(authenticatedUser);

    const duplicateMenuItem = userMenuItems.find(
      (menuItem) =>
        menuItem.name.toLowerCase() ===
        createMenuItemRequest.name.toLowerCase(),
    );

    if (duplicateMenuItem) {
      throw new BadRequestException(
        'A menu item with this name already exists',
      );
    }

    const menuItem = new MenuItem({
      ...createMenuItemRequest,
      user: authenticatedUser._id,
    });

    return this.menuItemRepository.create(menuItem);
  }

  async update(
    authenticatedUser: AuthenticatedUser,
    menuItemId: ObjectId,
    updateMenuItemRequest: CreateMenuItemRequest,
  ): Promise<MenuItem> {
    const userMenuItems = await this.findUserMenuItems(authenticatedUser);

    const isOwner = userMenuItems.some((menuItem) =>
      menuItem._id.equals(menuItemId),
    );

    if (!isOwner) {
      throw new BadRequestException('Menu group not found');
    }

    const duplicateMenuItem = userMenuItems.find(
      (menuItem) =>
        menuItem.name.toLowerCase() ===
          updateMenuItemRequest.name.toLowerCase() &&
        !menuItem._id.equals(menuItemId),
    );

    if (duplicateMenuItem) {
      throw new BadRequestException(
        'A menu item with this name already exists',
      );
    }

    return this.menuItemRepository.update(menuItemId, updateMenuItemRequest);
  }

  async delete(
    authenticatedUser: AuthenticatedUser,
    menuItemId: ObjectId,
  ): Promise<void> {
    const userMenuItems = await this.findUserMenuItems(authenticatedUser);

    const isOwner = userMenuItems.some((menuItem) =>
      menuItem._id.equals(menuItemId),
    );

    if (!isOwner) {
      throw new BadRequestException('Menu item not found');
    }

    await this.menuItemRepository.update(menuItemId, { deletedAt: new Date() });
  }
}
