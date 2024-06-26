import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthenticationService } from '@domain/account/authentication/authentication.service';
import { TransformPlainToInstance } from 'class-transformer';
import { LoginResponse } from '@domain/account/authentication/response';
import { LoginRequest } from '@domain/account/authentication/request';
import { CreateUserRequest } from '@domain/account/user/request';
import {
  ApiNotImplementedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

@Controller(AuthenticationController.path)
@ApiTags(AuthenticationController.path)
export class AuthenticationController {
  static path = 'account/auth';

  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @TransformPlainToInstance(LoginResponse)
  @ApiResponse({
    status: HttpStatus.OK,
    type: LoginResponse,
  })
  async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    return this.authenticationService.login(loginRequest);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @TransformPlainToInstance(LoginResponse)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: LoginResponse,
  })
  async signUp(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<LoginResponse> {
    return this.authenticationService.signUp(createUserRequest);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNotImplementedResponse()
  async logout(@Req() request: Request): Promise<void> {
    return this.authenticationService.logout(request);
  }
}
