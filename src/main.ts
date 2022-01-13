import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { VALIDATION_PIPE_OPTIONS } from './shared/constants';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';
import { AppLogger } from './shared/logger/logger.service';
import { RequestIdMiddleware } from './shared/middlewares/request-id/request-id.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe(VALIDATION_PIPE_OPTIONS));
  app.use(RequestIdMiddleware);
  app.enableCors();

  const configService = app.get(ConfigService);
  app.useGlobalFilters(new AllExceptionsFilter(configService, new AppLogger()));
  const port = configService.get<number>('port');
  await app.listen(port);
}
bootstrap();
