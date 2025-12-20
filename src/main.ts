import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Видаляє зайві поля, яких немає в DTO
      forbidNonWhitelisted: true, //Кидає помилку за зайві поля
      transform: true, //Перетворює plain object → DTO class
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
