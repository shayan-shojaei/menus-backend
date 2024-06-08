import { Module } from '@nestjs/common';
import { DomainModule } from '@domain/domain.module';
import { MongoModule } from '@common/mongo';
import { Config } from '@common/helper';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    MongoModule.forRoot(Config.Mongo.URI, Config.Mongo.DB, {
      auth: {
        username: Config.Mongo.USERNAME,
        password: Config.Mongo.PASSWORD,
      },
    }),
    RedisModule.forRoot({
      type: 'single',
      url: Config.Redis.URI,
    }),
    DomainModule,
  ],
})
export class AppModule {}
