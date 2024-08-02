import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEnum, IsOptional, IsPositive, ValidateNested } from "class-validator";
import { RESOURCE_READ_TYPE } from "../constant/common";
import { Type } from "class-transformer";
import { mixin } from "@nestjs/common";
import { Constructor } from "@/lib/types/common";

export class ResourcePaginateDto {
  @ApiPropertyOptional({
    description: "The current page of the query",
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({
    description: "The limit records per page",
    example: 5,
    default: 10,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number = 10;

  @ApiPropertyOptional({ isArray: true })
  @IsArray()
  @IsOptional()
  @Type(() => Array<String>)
  sort?: string[];

  @ApiPropertyOptional({ isArray: true })
  @IsArray()
  @IsOptional()
  @Type(() => Array<String>)
  order?: string[];
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
