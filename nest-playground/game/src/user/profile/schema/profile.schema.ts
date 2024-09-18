import { User, UserDocument } from '@/user/schema/user.schema';
import { BaseSchema } from '@libs/abstract/schema.abstract';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Stats, StatsSchema } from './stats.schema';
import { POWER_RANK } from '@/lib/system/power';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ timestamps: true })
export class Profile extends BaseSchema {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, index: true })
  user: Types.ObjectId | UserDocument;

  @ApiProperty({ type: Stats })
  @IsNotEmpty()
  @Type(() => Stats)
  @Prop({ type: StatsSchema, default: {} })
  stats: Stats;

  @ApiProperty()
  @IsNotEmpty()
  @Prop()
  experiment_stored: number;

  @ApiProperty()
  @IsNotEmpty()
  @Prop()
  experiment_capacity: number;

  @ApiProperty()
  @IsNotEmpty()
  @Prop({ index: true, default: 1 })
  level: number;

  @ApiProperty({ type: POWER_RANK })
  @IsNotEmpty()
  @IsEnum(POWER_RANK)
  @Prop()
  power_rank: POWER_RANK;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
