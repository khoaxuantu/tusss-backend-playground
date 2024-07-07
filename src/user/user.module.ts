import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { UserFactoryModule } from '@/lib/factory/user/user.module';
import { UserRepositoryModule } from '@/lib/repository/user/user.repository.module';

@Module({
  imports: [
    UserFactoryModule,
    UserRepositoryModule,
  ],
  controllers: [UserController],
  providers: [UserService, ConfigService],
  exports: [UserService],
})
export class UserModule {}
