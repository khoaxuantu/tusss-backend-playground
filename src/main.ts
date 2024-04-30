import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { StartupLogger } from './config/initialize/start_up_logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new StartupLogger() });
  // app.useLogger(new Logger());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
