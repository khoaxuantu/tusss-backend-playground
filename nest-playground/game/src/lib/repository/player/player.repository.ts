import { PlayerDocument } from '@/player/schema/player.schema';
import { AbstractModelRepository } from '@libs/interfaces/repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { SCHEMA_NAME } from '../constant/schema.constant';

@Injectable()
export class PlayerRepository extends AbstractModelRepository<PlayerDocument> {
  constructor(@InjectModel(SCHEMA_NAME.PLAYER) model: PaginateModel<PlayerDocument>) {
    super(model);
  }
}
