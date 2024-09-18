import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

@Schema({ _id: false })
export class Personality {
  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  strength: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  magic: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  ki: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  reflex: number;
}

export const PersonalitySchema = SchemaFactory.createForClass(Personality);

@Schema({ _id: false })
export class Stats {
  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  base_atk: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  physical_atk: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  magic_atk: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  atk_spd: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  crit_chance: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  crit_damage: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  base_def: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  physical_def: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  magic_def: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  hp: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  life_steal: number;

  @ApiPropertyOptional({ type: Personality })
  @IsOptional()
  @Type(() => Personality)
  @Prop({ type: PersonalitySchema })
  personality: Personality;
}

export const StatsSchema = SchemaFactory.createForClass(Stats);
