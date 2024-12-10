import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { PlayerResourceModule } from './resources/player/player-resource.module';
import { AdminUserResourceModule } from './resources/user/user_resource.module';

@Module({
  imports: [AdminUserResourceModule, PlayerResourceModule],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
