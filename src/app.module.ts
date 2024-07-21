import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CommonConfiguration } from './config/configuration';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { connectMongo } from './config/initialize/connect_mongo';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guard/jwt_auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guard/roles.guard';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [CommonConfiguration], cache: true }),
    MongooseModule.forRootAsync(connectMongo()),
    UserModule,
    AuthModule,
    AdminModule,
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
