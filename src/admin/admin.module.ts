import { Module } from '@nestjs/common';
import { AdminUserResourceController } from './resources/controllers';
import { UserRepositoryModule } from '@/lib/repository/user/user.repository.module';
import { UserFactoryModule } from '@/lib/factory/user/user.module';

@Module({
  controllers: [AdminUserResourceController],
  imports: [UserRepositoryModule, UserFactoryModule]
})
export class AdminModule {}
