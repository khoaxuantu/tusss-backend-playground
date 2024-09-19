import { STARTER_TYPE } from '@/player/constant/player.constant';
import { Player } from '@/player/schema/player.schema';
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';

export class PlayerResourceWriteDto extends PickType(PartialType(Player), ['user', 'name']) {
  @ApiProperty({ enum: STARTER_TYPE })
  starter_type: STARTER_TYPE;
}
