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

  // app.setGlobalPrefix('v1', {
  //   exclude: [{ path: 'health', method: RequestMethod.GET }],
  // });
  // app.useGlobalGuards(new GlobalGuard());
  // app.useGlobalFilters(new GlobalExceptionFilter());
  // app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
