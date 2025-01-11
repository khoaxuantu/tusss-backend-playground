import { ClassTransformerHelper } from '@libs/helper/transform.helper';
import { Constructor } from '@libs/types/common';
import { mixin } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsPositive, ValidateNested } from 'class-validator';
import { RESOURCE_READ_TYPE } from '../constant/common';

export class ResourcePaginateDto {
  @ApiPropertyOptional({
    description: 'The current page of the query',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'The limit records per page',
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
  @Transform(({ value }) => ClassTransformerHelper.transformArrParams({ cls: String, value }))
  sort?: string[];

  @ApiPropertyOptional({ isArray: true })
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => ClassTransformerHelper.transformArrParams({ cls: String, value }))
  order?: string[];
}

export function ResourceReadDto<T extends Constructor>(resource: T) {
  class FilterResourceDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => resource)
    $or?: InstanceType<T>[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => resource)
    $and?: InstanceType<T>[];
  }

  class ResourceReadDto extends ResourcePaginateDto {
    @ApiProperty({ enum: RESOURCE_READ_TYPE })
    @IsEnum(RESOURCE_READ_TYPE)
    read_type: RESOURCE_READ_TYPE;

    @ApiPropertyOptional({ isArray: true })
    @IsOptional()
    @IsArray()
    @Transform(({ value }) => ClassTransformerHelper.transformArrParams({ cls: String, value }))
    ids?: string[];

    @IsOptional()
    @ValidateNested()
    @Type(() => FilterResourceDto)
    filter?: FilterResourceDto;
  }

  return mixin(ResourceReadDto);
}

export class AbstractResourceReadDto extends ResourceReadDto<any>(undefined) {}
