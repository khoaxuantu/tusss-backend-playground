import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guard/jwt_auth.guard';
import { RolesGuard } from './auth/guard/roles.guard';
import { CommonConfiguration } from './config/configuration';
import { connectMongo } from './config/initialize/connect_mongo';
import { PlayerModule } from './player/player.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [CommonConfiguration], cache: true }),
    MongooseModule.forRootAsync(connectMongo()),
    UserModule,
    AuthModule,
    AdminModule,
    PlayerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule {}
