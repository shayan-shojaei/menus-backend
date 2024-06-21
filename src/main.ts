import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FormatResponseInterceptor } from '@common/interceptors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Menus App')
    .setDescription('The Menus App API Description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}

bootstrap().then(() => {});
