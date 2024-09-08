import dotenv from "dotenv";
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { StartupLogger } from './config/initialize/start_up_logger';
import mongoose from 'mongoose';
import { NODE_ENV } from './config/environment';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from "./lib/filter/all-exception.filter";

bootstrap();

async function bootstrap() {
  setPreConfig();

  const app = await NestFactory.create(AppModule, { logger: new StartupLogger() });
  // app.useLogger(new Logger());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
    whitelist: true,
  }));
  app.useGlobalFilters(new AllExceptionsFilter());

  setUpSwagger(app);

  await app.listen(5000);
}

function setPreConfig() {
  debugMongo(NODE_ENV == 'development');
}

function debugMongo(canDebug: boolean) {
  if (canDebug) mongoose.set('debug', true);
}

function setUpSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest API playground')
    .setDescription('The API descriptions')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
