import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEnum, IsOptional, IsPositive, ValidateNested } from "class-validator";
import { RESOURCE_READ_TYPE } from "../constant/common";
import { Type } from "class-transformer";
import { mixin } from "@nestjs/common";
import { Constructor } from "@/lib/types/common";

export class ResourcePaginateDto {
  @ApiPropertyOptional({
    description: "The n-th starting record of a resource",
    example: 1,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  _start?: number;

  @ApiPropertyOptional({
    description: "The ending record in a range of a resource, must be larger than _start",
    example: 5,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  _end?: number;

  @ApiPropertyOptional()
  @IsOptional()
  _sort?: string;

  @ApiPropertyOptional()
  @IsOptional()
  _order?: string;
}

export function ResourceReadDto<T extends Constructor>(resource: T) {
  class ResourceReadDto extends ResourcePaginateDto {
    @ApiProperty({ enum: RESOURCE_READ_TYPE })
    @IsEnum(RESOURCE_READ_TYPE)
    read_type: RESOURCE_READ_TYPE;

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    ids?: string[];

    @IsOptional()
    @ValidateNested()
    @Type(() => resource)
    $or?: InstanceType<T>;

    @IsOptional()
    @ValidateNested()
    @Type(() => resource)
    filter?: InstanceType<T>;
  }

  return mixin(ResourceReadDto);
}

export class AbstractResourceReadDto extends ResourceReadDto<any>(undefined) {}
