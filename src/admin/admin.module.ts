import { Module } from '@nestjs/common';
import { AdminUserResourceModule } from './resources/user/user_resource.module';

@Module({
  imports: [AdminUserResourceModule]
})
export class AdminModule {}
