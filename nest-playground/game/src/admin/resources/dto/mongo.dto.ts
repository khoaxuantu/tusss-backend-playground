import { Constructor } from '@libs/types/common';
import { mixin } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export function CreateMongoFilterDtoWith<T extends Constructor>(type: T) {
  class MongoFilterDto {
    @IsOptional()
    @Type(() => type)
    $eq?: InstanceType<T>;

    @IsOptional()
    @Type(() => type)
    $ne?: InstanceType<T>;

    @IsOptional()
    @Type(() => type)
    $gt?: InstanceType<T>;

    @IsOptional()
    @Type(() => type)
    $gte?: InstanceType<T>;

    @IsOptional()
    @Type(() => type)
    $lt?: InstanceType<T>;

    @IsOptional()
    @Type(() => type)
    $lte?: InstanceType<T>;

    @IsOptional()
    @IsArray()
    @Type(() => type)
    $in?: InstanceType<T>[];

    @IsOptional()
    @IsArray()
    @Type(() => type)
    $nin?: InstanceType<T>[];
  }

  return mixin(MongoFilterDto);
}

export class MongoFilterNumber extends CreateMongoFilterDtoWith(Number) {}
export class MongoFilterString extends CreateMongoFilterDtoWith(String) {}
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
