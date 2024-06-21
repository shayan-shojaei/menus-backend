import { BadRequestException, Injectable } from '@nestjs/common';
import { BranchRepository } from '@domain/branch/branch.repository';
import { AuthenticatedUser } from '@common/decorators';
import { ObjectId } from 'mongodb';
import { Branch } from '@domain/branch/entity';
import {
  CreateBranchRequest,
  UpdateBranchRequest,
} from '@domain/branch/request';
import { UserService } from '@domain/account/user/user.service';

@Injectable()
export class BranchService {
  constructor(
    private readonly branchRepository: BranchRepository,
    private readonly userService: UserService,
  ) {}

  async findUserBranches(
    authenticatedUser: AuthenticatedUser,
  ): Promise<Branch[]> {
    return this.branchRepository.find(authenticatedUser.branches as ObjectId[]);
  }

  async findOne(
    authenticatedUser: AuthenticatedUser,
    id: ObjectId,
  ): Promise<Branch> {
    const isOwner = authenticatedUser.branches.find((branch: ObjectId) =>
      branch.equals(id),
    );

    if (!isOwner) {
      throw new BadRequestException('Branch not found');
    }

    return this.branchRepository.findOne(id);
  }

  async findBranch(id: ObjectId): Promise<Branch> {
    return this.branchRepository.findOne(id);
  }

  async createBranch(
    authenticatedUser: AuthenticatedUser,
    createBranchRequest: CreateBranchRequest,
  ): Promise<Branch> {
    const userBranches = await this.findUserBranches(authenticatedUser);

    const duplicateBranchName = userBranches.find(
      (branch) =>
        branch.name.toLowerCase() === createBranchRequest.name.toLowerCase(),
    );

    if (duplicateBranchName) {
      throw new BadRequestException('Branch name already exists');
    }

    const branch = new Branch(createBranchRequest);

    const createdBranch = await this.branchRepository.create(branch);

    await this.userService.addUserBranch(
      authenticatedUser._id,
      createdBranch._id,
    );

    return createdBranch;
  }

  async updateBranch(
    authenticatedUser: AuthenticatedUser,
    branchId: ObjectId,
    updateBranchRequest: UpdateBranchRequest,
  ): Promise<Branch> {
    const userBranches = await this.findUserBranches(authenticatedUser);

    const duplicateBranchName = userBranches.find(
      (branch) =>
        branch.name.toLowerCase() === updateBranchRequest.name.toLowerCase() &&
        !branch._id.equals(branchId),
    );

    if (duplicateBranchName) {
      throw new BadRequestException('Branch name already exists');
    }

    return this.branchRepository.update(branchId, updateBranchRequest);
  }
}
