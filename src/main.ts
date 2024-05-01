import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { StartupLogger } from './config/initialize/start_up_logger';
import mongoose from 'mongoose';
import { NODE_ENV } from './config/environment';

bootstrap();

async function bootstrap() {
  setPreConfig();

  const app = await NestFactory.create(AppModule, { logger: new StartupLogger() });
  // app.useLogger(new Logger());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

function setPreConfig() {
  debugMongo(NODE_ENV == 'development');
}

function debugMongo(canDebug: boolean) {
  if (canDebug) mongoose.set('debug', true);
}
