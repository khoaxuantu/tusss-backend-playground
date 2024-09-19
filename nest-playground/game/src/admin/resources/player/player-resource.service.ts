import { PlayerRepository } from '@/lib/repository/player/player.repository';
import { PlayerDocument } from '@/player/schema/player.schema';
import { Injectable } from '@nestjs/common';
import { AbstractResourceService } from '../interfaces/service.interface';

@Injectable()
export class PlayerResourceService extends AbstractResourceService<PlayerDocument> {
  constructor(repository: PlayerRepository) {
    super(repository);
  }

  override createOne(payload: any): Promise<PlayerDocument> {
    return super.createOne(payload);
  }
}
