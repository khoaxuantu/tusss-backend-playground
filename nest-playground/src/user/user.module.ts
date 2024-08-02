import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { UserFactoryModule } from '@/lib/factory/user/user.module';
import { RepositoryModule } from '@/lib/repository/repository.module';

@Module({
  imports: [
    UserFactoryModule,
    RepositoryModule,
  ],
  controllers: [UserController],
  providers: [UserService, ConfigService],
  exports: [UserService],
})
export class UserModule {}
