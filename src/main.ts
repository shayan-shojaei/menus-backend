import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FormatResponseInterceptor } from '@common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      validateCustomDecorators: true,
      transform: true,
      whitelist: true,
    }),
  );

  app.useGlobalInterceptors(new FormatResponseInterceptor());

  app.enableCors();

  await app.listen(3000);
}

bootstrap().then(() => {});
