import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { CommonConfiguration } from '@/config/configuration';
import { UserService } from './user.service';
import { UserFactoryModule } from '@/lib/factory/user/user.module';
import { UserRepositoryModule } from '@/lib/repository/user/user.repository.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [CommonConfiguration] }),
    UserFactoryModule,
    UserRepositoryModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
