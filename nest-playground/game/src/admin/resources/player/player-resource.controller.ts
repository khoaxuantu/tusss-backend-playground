import { Controller } from '@nestjs/common';
import { AbstractResourceController } from '../interfaces/controller.interface';
import { PlayerDocument } from '@/player/schema/player.schema';
import { PlayerResourceService } from './player-resource.service';
import { PlayerOutDto } from '@/player/dto/player.out.dto';

@Controller('admin/players')
export class PlayerResourceController extends AbstractResourceController<PlayerDocument> {
  constructor(service: PlayerResourceService) {
    super(service, PlayerOutDto);
  }
}
