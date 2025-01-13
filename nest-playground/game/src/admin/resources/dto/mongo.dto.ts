import { Constructor } from '@libs/types/common';
import { mixin } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';
import escapeStringRegexp from 'escape-string-regexp';
import { Types } from 'mongoose';

export function CreateMongoFilterDtoWith<T extends Constructor>(type: T) {
  class MongoFilterDto {
    @ApiPropertyOptional({ type, description: 'Equal' })
    @IsOptional()
    @Type(() => type)
    $eq?: InstanceType<T>;

    @ApiPropertyOptional({ type, description: 'Not equal' })
    @IsOptional()
    @Type(() => type)
    $ne?: InstanceType<T>;

    @ApiPropertyOptional({ type, description: 'Greater than' })
    @IsOptional()
    @Type(() => type)
    $gt?: InstanceType<T>;

    @ApiPropertyOptional({ type, description: 'Greater than or equal' })
    @IsOptional()
    @Type(() => type)
    $gte?: InstanceType<T>;

    @ApiPropertyOptional({ type, description: 'Less than' })
    @IsOptional()
    @Type(() => type)
    $lt?: InstanceType<T>;

    @ApiPropertyOptional({ type, description: 'Less than or equal' })
    @IsOptional()
    @Type(() => type)
    $lte?: InstanceType<T>;

    @ApiPropertyOptional({ type, description: 'In' })
    @IsOptional()
    @IsArray()
    @Type(() => type)
    $in?: InstanceType<T>[];

    @ApiPropertyOptional({ type, description: 'Not in' })
    @IsOptional()
    @IsArray()
    @Type(() => type)
    $nin?: InstanceType<T>[];
  }

  return mixin(MongoFilterDto);
}

export class MongoFilterNumber extends CreateMongoFilterDtoWith(Number) {}
export class MongoFilterString extends CreateMongoFilterDtoWith(String) {
  @ApiPropertyOptional({ type: String, description: 'Contains' })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return undefined;
    return new RegExp(escapeStringRegexp(value), 'i');
  })
  $regex?: RegExp;
}
export class MongoFilterDate extends CreateMongoFilterDtoWith(Date) {}

export class MongoFilterObjectId extends CreateMongoFilterDtoWith(Types.ObjectId) {
  constructor(obj: any) {
    super();

    if (!obj) return;

    if (typeof obj.$eq == 'string') this.$eq = new Types.ObjectId(obj.$eq as string);
    if (typeof obj.$gt == 'string') this.$gt = new Types.ObjectId(obj.$gt as string);
    if (typeof obj.$gte == 'string') this.$gte = new Types.ObjectId(obj.$gte as string);
    if (typeof obj.$ne == 'string') this.$ne = new Types.ObjectId(obj.$ne as string);
    if (typeof obj.$lt == 'string') this.$lt = new Types.ObjectId(obj.$lt as string);
    if (typeof obj.$lte == 'string') this.$lte = new Types.ObjectId(obj.$lte as string);
    if (Array.isArray(obj.$in) && Object.keys(obj.$in).length) {
      this.$in = (obj.$in as string[])
        .filter((val) => typeof val == 'string')
        .map((val) => new Types.ObjectId(val));
    }
    if (Array.isArray(obj.$nin) && Object.keys(obj.$nin).length) {
      this.$nin = (obj.$nin as string[])
        .filter((val) => typeof val == 'string')
        .map((val) => new Types.ObjectId(val));
    }
  }
}
