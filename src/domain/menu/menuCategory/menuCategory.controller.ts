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
import { MenuCategoryService } from '@domain/menu/menuCategory/menuCategory.service';
import { TransformPlainToInstance } from 'class-transformer';
import { AuthenticatedUser, CurrentUser } from '@common/decorators';
import { ParseObjectIdPipe } from '@common/pipes';
import { ObjectId } from 'mongodb';
import {
  DetailedMenuCategoryResponse,
  GeneralMenuCategoryResponse,
} from '@domain/menu/menuCategory/response';
import { CreateMenuCategoryRequest } from '@domain/menu/menuCategory/request';
import { AuthenticationGuard } from '@common/guards';
import { ApiTags } from '@nestjs/swagger';

@Controller(MenuCategoryController.path)
@ApiTags(MenuCategoryController.path)
@UseGuards(AuthenticationGuard)
export class MenuCategoryController {
  static path = 'menu/categories';

  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Get()
  @TransformPlainToInstance(GeneralMenuCategoryResponse)
  async findAll(
    @CurrentUser() authenticatedUser: AuthenticatedUser,
  ): Promise<GeneralMenuCategoryResponse[]> {
    return this.menuCategoryService.findUserMenuCategories(authenticatedUser);
  }

  @Get(':id')
  @TransformPlainToInstance(DetailedMenuCategoryResponse)
  async findOne(
    @CurrentUser() authenticatedUser: AuthenticatedUser,
    @Param('id', new ParseObjectIdPipe()) id: ObjectId,
  ): Promise<DetailedMenuCategoryResponse> {
    return this.menuCategoryService.findOne(authenticatedUser, id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @TransformPlainToInstance(GeneralMenuCategoryResponse)
  async create(
    @CurrentUser() authenticatedUser: AuthenticatedUser,
    @Body() createMenuCategoryRequest: CreateMenuCategoryRequest,
  ): Promise<GeneralMenuCategoryResponse> {
    return this.menuCategoryService.create(
      authenticatedUser,
      createMenuCategoryRequest,
    );
  }

  @Put(':id')
  @TransformPlainToInstance(GeneralMenuCategoryResponse)
  async updateOne(
    @CurrentUser() authenticatedUser: AuthenticatedUser,
    @Param('id', new ParseObjectIdPipe()) id: ObjectId,
    @Body() updateMenuCategoryRequest: CreateMenuCategoryRequest,
  ): Promise<GeneralMenuCategoryResponse> {
    return this.menuCategoryService.update(
      authenticatedUser,
      id,
      updateMenuCategoryRequest,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(
    @CurrentUser() authenticatedUser: AuthenticatedUser,
    @Param('id', new ParseObjectIdPipe()) id: ObjectId,
  ): Promise<void> {
    return this.menuCategoryService.delete(authenticatedUser, id);
  }
}
