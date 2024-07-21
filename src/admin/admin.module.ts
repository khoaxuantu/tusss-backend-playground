import { Module } from '@nestjs/common';
import { AdminUserResourceModule } from './resources/user/user_resource.module';
import { RepositoryModule } from '@/lib/repository/repository.module';
import { AdminService } from './admin.service';

@Module({
  imports: [AdminUserResourceModule, RepositoryModule],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
