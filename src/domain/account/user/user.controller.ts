import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '@domain/account/user/user.service';
import { TransformPlainToInstance } from 'class-transformer';
import {
  DetailedUserResponse,
  GeneralUserResponse,
} from '@domain/account/user/response';
import { AuthenticationGuard } from '@common/guards';
import { AuthenticatedUser, CurrentUser } from '@common/decorators';
import {
  ChangePasswordRequest,
  UpdateUserRequest,
} from '@domain/account/user/request';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller(UserController.path)
@ApiTags(UserController.path)
@UseGuards(AuthenticationGuard)
export class UserController {
  static path = 'account/users';
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @TransformPlainToInstance(DetailedUserResponse)
  @ApiResponse({
    status: HttpStatus.OK,
    type: DetailedUserResponse,
  })
  async me(
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<DetailedUserResponse> {
    return this.userService.findWithBranches(user._id);
  }

  @Put('me')
  @TransformPlainToInstance(GeneralUserResponse)
  @ApiResponse({
    status: HttpStatus.OK,
    type: GeneralUserResponse,
  })
  async updateMe(
    @CurrentUser() user: AuthenticatedUser,
    @Body() updateUserRequest: UpdateUserRequest,
  ): Promise<GeneralUserResponse> {
    return this.userService.update(user._id, updateUserRequest);
  }

  @Patch('me/password')
  @TransformPlainToInstance(GeneralUserResponse)
  @ApiResponse({
    status: HttpStatus.OK,
    type: GeneralUserResponse,
  })
  async updatePassword(
    @CurrentUser() user: AuthenticatedUser,
    @Body() changePasswordRequest: ChangePasswordRequest,
  ): Promise<GeneralUserResponse> {
    return this.userService.changePassword(user._id, changePasswordRequest);
  }
}
