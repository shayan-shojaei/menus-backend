import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MenuItemService } from '@domain/menu/menuItem/menuItem.service';
import { TransformPlainToInstance } from 'class-transformer';
import { GeneralMenuItemResponse } from '@domain/menu/menuItem/response';
import { AuthenticatedUser, CurrentUser } from '@common/decorators';
import { ParseObjectIdPipe } from '@common/pipes';
import { ObjectId } from 'mongodb';
import { CreateMenuItemRequest } from '@domain/menu/menuItem/request';
import { AuthenticationGuard } from '@common/guards';

@Controller(MenuItemController.path)
@UseGuards(AuthenticationGuard)
export class MenuItemController {
  static path = 'menu/items';

  constructor(private readonly menuItemService: MenuItemService) {}

  @Get()
  @TransformPlainToInstance(GeneralMenuItemResponse)
  async findAll(
    @CurrentUser() authenticatedUser: AuthenticatedUser,
  ): Promise<GeneralMenuItemResponse[]> {
    return this.menuItemService.findUserMenuItems(authenticatedUser);
  }

  @Get(':id')
  @TransformPlainToInstance(GeneralMenuItemResponse)
  async findOne(
    @CurrentUser() authenticatedUser: AuthenticatedUser,
    @Param('id', new ParseObjectIdPipe()) id: ObjectId,
  ): Promise<GeneralMenuItemResponse> {
    return this.menuItemService.findOne(authenticatedUser, id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @TransformPlainToInstance(GeneralMenuItemResponse)
  async create(
    @CurrentUser() authenticatedUser: AuthenticatedUser,
    @Body() createMenuItemRequest: CreateMenuItemRequest,
  ): Promise<GeneralMenuItemResponse> {
    return this.menuItemService.create(
      authenticatedUser,
      createMenuItemRequest,
    );
  }

  @Put(':id')
  @TransformPlainToInstance(GeneralMenuItemResponse)
  async updateOne(
    @CurrentUser() authenticatedUser: AuthenticatedUser,
    @Param('id', new ParseObjectIdPipe()) id: ObjectId,
    @Body() updateMenuItemRequest: CreateMenuItemRequest,
  ): Promise<GeneralMenuItemResponse> {
    return this.menuItemService.update(
      authenticatedUser,
      id,
      updateMenuItemRequest,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(
    @CurrentUser() authenticatedUser: AuthenticatedUser,
    @Param('id', new ParseObjectIdPipe()) id: ObjectId,
  ): Promise<void> {
    return this.menuItemService.delete(authenticatedUser, id);
  }
}
