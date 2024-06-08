import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '@domain/account/user/user.repository';
import {
  ChangePasswordRequest,
  CreateUserRequest,
  UpdateUserRequest,
} from '@domain/account/user/request';
import { User } from '@domain/account/user/entity';
import { BcryptHelper } from '@common/helper';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async find(id: ObjectId): Promise<User> {
    return this.userRepository.find(id);
  }

  async findWithBranches(id: ObjectId): Promise<User> {
    return this.userRepository.findWithBranches(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  async create(createUserRequest: CreateUserRequest): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(
      createUserRequest.email,
    );

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    createUserRequest.password = BcryptHelper.hashPassword(
      createUserRequest.password,
    );

    const user = new User(createUserRequest);
    return this.userRepository.create(user);
  }

  async update(
    id: ObjectId,
    updateUserRequest: UpdateUserRequest,
  ): Promise<User> {
    return this.userRepository.update(id, updateUserRequest);
  }

  async changePassword(
    id: ObjectId,
    changePasswordRequest: ChangePasswordRequest,
  ): Promise<User> {
    const user = await this.userRepository.find(id);

    const isPasswordCorrect = BcryptHelper.checkPassword(
      user.password,
      changePasswordRequest.currentPassword,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException('Current password is incorrect');
    }

    const hashedPassword = BcryptHelper.hashPassword(
      changePasswordRequest.newPassword,
    );

    return this.userRepository.update(id, {
      password: hashedPassword,
    });
  }

  async addUserBranch(user: ObjectId, branch: ObjectId): Promise<void> {
    await this.userRepository.addUserBranch(user, branch);
  }
}
