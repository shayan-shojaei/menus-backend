import { Module } from '@nestjs/common';
import { MongoModule } from '@common/mongo';
import { UserService } from '@domain/account/user/user.service';
import { UserRepository } from '@domain/account/user/user.repository';
import { User } from '@domain/account/user/entity';
import { UserController } from '@domain/account/user/user.controller';

@Module({
  imports: [MongoModule.forFeature([User.collectionName])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
