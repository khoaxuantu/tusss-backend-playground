import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from '@nestjs/config';
import { CommonConfiguration } from './config/configuration';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { connectMongo } from './config/initialize/connect_mongo';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [CommonConfiguration] }),
    MongooseModule.forRootAsync(connectMongo()),
    CatsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
