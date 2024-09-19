import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { RepositoryModule } from '@/lib/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
