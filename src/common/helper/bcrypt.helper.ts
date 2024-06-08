import { compareSync, hashSync } from 'bcrypt';

export const bcryptSaltRounds = 10;

export class BcryptHelper {
  static hashPassword(inputPassword: string): string {
    return hashSync(inputPassword, bcryptSaltRounds);
  }

  static checkPassword(hashedPassword: string, inputPassword: string): boolean {
    return compareSync(inputPassword, hashedPassword);
  }
}
