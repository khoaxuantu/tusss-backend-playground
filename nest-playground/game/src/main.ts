import dotenv from "dotenv";
dotenv.config();

import { AllExceptionsFilter } from "@libs/filter/all-exception.filter";
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { AppModule } from './app.module';
import { NODE_ENV } from './config/environment';
import { StartupLogger } from './config/initialize/start_up_logger';

bootstrap();

async function bootstrap() {
  setPreConfig();

  const app = await NestFactory.create(AppModule, { logger: new StartupLogger() });
  // app.useLogger(new Logger());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
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
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: "alpha",
      operationsSorter: "alpha",
    },
  });
}
