import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminUserResourceModule } from './resources/user/user_resource.module';

@Module({
  imports: [AdminUserResourceModule],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
