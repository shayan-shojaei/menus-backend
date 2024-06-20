import { Module } from '@nestjs/common';
import { MediaModule } from '@domain/general/media/media.module';

@Module({
  imports: [MediaModule],
})
export class GeneralModule {}
