import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { CommonConfiguration } from '@/config/configuration';
import { UserService } from './user.service';
import { UserFactoryModule } from '@/lib/factory/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [CommonConfiguration] }),
    UserFactoryModule,
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
