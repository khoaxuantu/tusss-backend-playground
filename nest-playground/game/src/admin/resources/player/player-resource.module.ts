import { Module } from '@nestjs/common';
import { PlayerResourceController } from './player-resource.controller';
import { PlayerResourceService } from './player-resource.service';

@Module({
  providers: [PlayerResourceService],
  controllers: [PlayerResourceController],
})
export class PlayerResourceModule {}
