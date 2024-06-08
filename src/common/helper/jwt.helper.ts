import { Config } from '@common/helper/config.helper';
import { User } from '@domain/account/user/entity';
import * as jwt from 'jsonwebtoken';

export type JWTPayload = {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};
export class JWTHelper {
  private static SECRET_KEY = Config.Authorization.JWT_SECRET;

  static generateJWT(user: User): string {
    const data: JWTPayload = {
      user: {
        _id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    };

    return jwt.sign(data, JWTHelper.SECRET_KEY, {
      expiresIn: `${Config.Authorization.JWT_EXPIRATION_DAYS}h`,
    });
  }

  static verifyJWT(token: string): JWTPayload {
    try {
      const verified = jwt.verify(token, JWTHelper.SECRET_KEY);
      if (verified) {
        return verified as JWTPayload;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}
