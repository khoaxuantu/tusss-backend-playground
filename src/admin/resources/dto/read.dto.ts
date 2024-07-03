import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEnum, IsOptional, ValidateNested } from "class-validator";
import { RESOURCE_READ_TYPE } from "../constant/common";

export class ResourcePaginateDto {
  @ApiPropertyOptional()
  @IsOptional()
  _start?: number;

  @ApiPropertyOptional()
  @IsOptional()
  _end?: number;

  @ApiPropertyOptional()
  @IsOptional()
  _sort?: string;

  @ApiPropertyOptional()
  @IsOptional()
  _order?: string;
}

export class ResourceReadDto<T = any> extends ResourcePaginateDto {
  @ApiProperty({ enum: RESOURCE_READ_TYPE })
  @IsEnum(RESOURCE_READ_TYPE)
  read_type: RESOURCE_READ_TYPE;

  @ApiPropertyOptional({ isArray: true })
  @IsOptional()
  @IsArray()
  ids?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  $or?: T;

  @ValidateNested()
  @IsOptional()
  filter?: T;
}
