import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from '@domain/account/authentication/authentication.service';
import { TransformPlainToInstance } from 'class-transformer';
import { LoginResponse } from '@domain/account/authentication/response';
import { LoginRequest } from '@domain/account/authentication/request';
import { CreateUserRequest } from '@domain/account/user/request';

@Controller(AuthenticationController.path)
export class AuthenticationController {
  static path = 'account/auth';

  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @TransformPlainToInstance(LoginResponse)
  async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    return await this.authenticationService.login(loginRequest);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @TransformPlainToInstance(LoginResponse)
  async signUp(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<LoginResponse> {
    return await this.authenticationService.signUp(createUserRequest);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(): Promise<void> {
    throw new Error('Not implemented');
  }
}
