import { STARTER_TYPE } from '@/player/constant/player.constant';
import { Player } from '@/player/schema/player.schema';
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';

export class CreatePlayerResourceDto extends PickType(Player, ['user', 'name']) {
  @ApiProperty({ enum: STARTER_TYPE })
  starter_type: STARTER_TYPE;
}

export class UpdatePlayerResourceDto extends PickType(PartialType(Player), ['name']) {}
