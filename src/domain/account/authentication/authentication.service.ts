import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '@domain/account/user/user.service';
import { BcryptHelper } from '@common/helper';
import { LoginRequest } from '@domain/account/authentication/request';
import { LoginResponse } from '@domain/account/authentication/response';
import { JWTHelper } from '@common/helper/jwt.helper';
import { CreateUserRequest } from '@domain/account/user/request';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { User } from '@domain/account/user/entity';
import { ObjectId } from 'mongodb';
import { Request } from 'express';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const user = await this.userService.findByEmail(loginRequest.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordCorrect = BcryptHelper.checkPassword(
      user.password,
      loginRequest.password,
    );
    if (!isPasswordCorrect) {
      throw new BadRequestException('User not found');
    }

    const token = JWTHelper.generateJWT(user);

    await this.cacheToken(user, token);

    return {
      token: token,
    };
  }

  async signUp(createUserRequest: CreateUserRequest): Promise<LoginResponse> {
    const user = await this.userService.create(createUserRequest);

    const token = JWTHelper.generateJWT(user);

    await this.cacheToken(user, token);

    return {
      token: token,
    };
  }

  private async cacheToken(user: User, token: string): Promise<void> {
    // Cache token
    await this.redis.hset(`auth:token`, token, user._id.toString());
  }

  async findUser(id: ObjectId): Promise<User> {
    return this.userService.find(id);
  }

  async logout(request: Request): Promise<void> {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new BadRequestException('Token not found');
    }

    await this.redis.hdel(`auth:token`, token);
  }
}
