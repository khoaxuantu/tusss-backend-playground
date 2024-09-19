import { Module } from '@nestjs/common';
import { PlayerResourceService } from './player-resource.service';
import { PlayerResourceController } from './player-resource.controller';
import { RepositoryModule } from '@/lib/repository/repository.module';

@Module({
  providers: [PlayerResourceService],
  controllers: [PlayerResourceController],
  imports: [RepositoryModule],
})
export class PlayerResourceModule {}
