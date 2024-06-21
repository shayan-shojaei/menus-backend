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
import { MenuGroupService } from '@domain/menu/menuGroup/menuGroup.service';
import { TransformPlainToInstance } from 'class-transformer';
import {
  DetailedMenuGroupResponse,
  GeneralMenuGroupResponse,
} from '@domain/menu/menuGroup/response';
import { AuthenticatedUser, CurrentUser } from '@common/decorators';
import { CreateMenuGroupRequest } from '@domain/menu/menuGroup/request';
import { ParseObjectIdPipe } from '@common/pipes';
import { ObjectId } from 'mongodb';
import { AuthenticationGuard } from '@common/guards';
import { ApiTags } from '@nestjs/swagger';

@Controller(MenuGroupController.path)
@ApiTags(MenuGroupController.path)
export class MenuGroupController {
  static path = 'menu/groups';

  constructor(private readonly menuGroupService: MenuGroupService) {}

  @Get()
  @TransformPlainToInstance(GeneralMenuGroupResponse)
  @UseGuards(AuthenticationGuard)
  async findAll(
    @CurrentUser() authenticatedUser: AuthenticatedUser,
  ): Promise<GeneralMenuGroupResponse[]> {
    return this.menuGroupService.findUserMenuGroups(authenticatedUser);
  }

  @Get(':id')
  @TransformPlainToInstance(GeneralMenuGroupResponse)
  @UseGuards(AuthenticationGuard)
  async findOne(
    @CurrentUser() authenticatedUser: AuthenticatedUser,
    @Param('id', new ParseObjectIdPipe()) id: ObjectId,
  ): Promise<GeneralMenuGroupResponse> {
    return this.menuGroupService.findOnePure(authenticatedUser, id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @TransformPlainToInstance(GeneralMenuGroupResponse)
  @UseGuards(AuthenticationGuard)
  async create(
    @CurrentUser() authenticatedUser: AuthenticatedUser,
    @Body() createMenuGroupRequest: CreateMenuGroupRequest,
  ): Promise<GeneralMenuGroupResponse> {
    return this.menuGroupService.create(
      authenticatedUser,
      createMenuGroupRequest,
    );
  }

  @Put(':id')
  @TransformPlainToInstance(GeneralMenuGroupResponse)
  @UseGuards(AuthenticationGuard)
  async updateOne(
    @CurrentUser() authenticatedUser: AuthenticatedUser,
    @Param('id', new ParseObjectIdPipe()) id: ObjectId,
    @Body() updateMenuGroupRequest: CreateMenuGroupRequest,
  ): Promise<GeneralMenuGroupResponse> {
    return this.menuGroupService.update(
      authenticatedUser,
      id,
      updateMenuGroupRequest,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthenticationGuard)
  async deleteOne(
    @CurrentUser() authenticatedUser: AuthenticatedUser,
    @Param('id', new ParseObjectIdPipe()) id: ObjectId,
  ): Promise<void> {
    return this.menuGroupService.delete(authenticatedUser, id);
  }

  @Get(':id/public')
  @TransformPlainToInstance(DetailedMenuGroupResponse)
  async customerFindOne(
    @Param('id', new ParseObjectIdPipe()) id: ObjectId,
  ): Promise<DetailedMenuGroupResponse> {
    return this.menuGroupService.findOne(id);
  }
}
