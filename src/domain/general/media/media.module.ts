import { Module } from '@nestjs/common';
import { MongoModule } from '@common/mongo';
import { Media } from '@domain/general/media/entity';
import { MediaController } from '@domain/general/media/media.controller';
import { MediaService } from '@domain/general/media/media.service';
import { MediaRepository } from '@domain/general/media/media.repository';

@Module({
  imports: [MongoModule.forFeature([Media.collectionName])],
  controllers: [MediaController],
  providers: [MediaService, MediaRepository],
  exports: [MediaService],
})
export class MediaModule {}
