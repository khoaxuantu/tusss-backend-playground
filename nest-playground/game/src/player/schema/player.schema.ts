import { SCHEMA_NAME } from '@/lib/repository/constant/schema.constant';
import { POWER_RANK } from '@/lib/system/power';
import { UserDocument } from '@/user/schema/user.schema';
import { BaseSchema } from '@libs/abstract/schema.abstract';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { STARTER_TYPE } from '../constant/player.constant';
import { Stats, StatsSchema } from './stats.schema';

export type PlayerDocument = HydratedDocument<Player>;

@Schema({ timestamps: true })
export class Player extends BaseSchema {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @Prop({ type: SchemaTypes.ObjectId, ref: SCHEMA_NAME.USER, index: true, required: true })
  user: Types.ObjectId | UserDocument;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  name: string;

  @ApiProperty({ type: Stats })
  @IsNotEmpty()
  @Type(() => Stats)
  @Prop({ type: StatsSchema, default: {} })
  stats: Stats;

  @ApiProperty()
  @IsNotEmpty()
  @Prop({ default: 0 })
  experience_stored: number;

  @ApiProperty()
  @IsNotEmpty()
  @Prop({ index: true, default: 1 })
  level: number;

  @ApiProperty({ enum: POWER_RANK })
  @IsNotEmpty()
  @IsEnum(POWER_RANK)
  @Prop({ default: POWER_RANK.PHAM_NHAN, enum: POWER_RANK })
  power_rank: POWER_RANK;

  @ApiProperty({ enum: STARTER_TYPE })
  @IsNotEmpty()
  @IsEnum(POWER_RANK)
  @Prop({ default: STARTER_TYPE.BALANCE, enum: STARTER_TYPE })
  starter_type: STARTER_TYPE;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
