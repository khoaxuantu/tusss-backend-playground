import { UserOutDto } from '@/user/dto/user.out.dto';
import { MongoHelper } from '@libs/helper/mongo.helper';
import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { isNotEmptyObject } from 'class-validator';
import { Document } from 'mongoose';
import { Player, PlayerDocument } from '../schema/player.schema';

export class PlayerOutDto extends PickType(IntersectionType(Player, Document), [
  'experience_stored',
  'level',
  'power_rank',
  '_id',
  'createdAt',
  'updatedAt',
  'stats',
  'name',
  'starter_type',
]) {
  @ApiProperty()
  user: UserOutDto;

  constructor(params?: PlayerDocument) {
    super();

    if (!params || !isNotEmptyObject(params)) return;

    this.experience_stored = params.experience_stored;
    this.level = params.level;
    this.power_rank = params.power_rank;
    this._id = MongoHelper.getObjectIdAsString(params._id);
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.stats = params.stats;
    this.user = new UserOutDto(params.user);
    this.name = params.name;
    this.starter_type = params.starter_type;
  }
}
