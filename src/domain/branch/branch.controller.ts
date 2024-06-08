import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BranchService } from '@domain/branch/branch.service';
import { TransformPlainToInstance } from 'class-transformer';
import { GeneralBranchResponse } from '@domain/branch/response';
import { AuthenticationGuard } from '@common/guards';
import { AuthenticatedUser, CurrentUser } from '@common/decorators';
import { CreateBranchRequest } from '@domain/branch/request';
import { ObjectId } from 'mongodb';
import { ParseObjectIdPipe } from '@common/pipes';

@Controller(BranchController.path)
@UseGuards(AuthenticationGuard)
export class BranchController {
  static path = 'branches';

  constructor(private readonly branchService: BranchService) {}

  @Get()
  @TransformPlainToInstance(GeneralBranchResponse)
  async getBranches(
    @CurrentUser() authenticatedUser: AuthenticatedUser,
  ): Promise<GeneralBranchResponse[]> {
    return this.branchService.findUserBranches(authenticatedUser);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @TransformPlainToInstance(GeneralBranchResponse)
  async createBranch(
    @CurrentUser() authenticatedUser: AuthenticatedUser,
    @Body() createBranchRequest: CreateBranchRequest,
  ): Promise<GeneralBranchResponse> {
    return this.branchService.createBranch(
      authenticatedUser,
      createBranchRequest,
    );
  }

  @Put(':id')
  @TransformPlainToInstance(GeneralBranchResponse)
  async updateBranch(
    @CurrentUser() authenticatedUser: AuthenticatedUser,
    @Param('id', new ParseObjectIdPipe()) branchId: ObjectId,
    @Body() createBranchRequest: CreateBranchRequest,
  ): Promise<GeneralBranchResponse> {
    return this.branchService.updateBranch(
      authenticatedUser,
      branchId,
      createBranchRequest,
    );
  }

  @Get(':id')
  @TransformPlainToInstance(GeneralBranchResponse)
  async getBranch(
    @CurrentUser() authenticatedUser: AuthenticatedUser,
    @Param('id', new ParseObjectIdPipe()) branchId: ObjectId,
  ): Promise<GeneralBranchResponse> {
    return this.branchService.findOne(authenticatedUser, branchId);
  }
}
