import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AUTHENTICATED_USER } from '@common/guards/authentication.guard';
import { User } from '@domain/account/user/entity';

export type AuthenticatedUser = User;

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request[AUTHENTICATED_USER];
  },
);
