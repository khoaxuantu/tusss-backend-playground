import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { CommonConfiguration } from '@/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [CommonConfiguration] }),
  ],
  controllers: [UserController]
})
export class UserModule {}
