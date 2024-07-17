import { Constructor } from "@/lib/types/common";
import { mixin } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsArray, IsOptional } from "class-validator";

export function CreateMongoFilterDtoWith<T extends Constructor>(type: T) {
  class MongoFilterDto {
    @IsOptional()
    @Type(() => type)
    $eq?: InstanceType<T>

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
