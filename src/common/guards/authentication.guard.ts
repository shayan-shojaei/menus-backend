import { CanActivate, ExecutionContext, UseGuards } from '@nestjs/common';
import { UserService } from '@domain/account/user/user.service';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Request } from 'express';
import { JWTHelper } from '@common/helper/jwt.helper';
import { ObjectId } from 'mongodb';

export const AUTHENTICATED_USER = 'AUTHENTICATED_USER';

@UseGuards()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    const isJwtValid = JWTHelper.verifyJWT(token);

    if (!isJwtValid) {
      return false;
    }

    const userId = await this.redis.hget('auth:token', token);

    if (!userId) {
      return false;
    }

    const user = await this.userService.find(new ObjectId(userId));

    if (!user) {
      return false;
    }

    request[AUTHENTICATED_USER] = user;

    return true;
  }
}
