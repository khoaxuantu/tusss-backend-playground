import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

type ReadType = 'list' | 'one' | 'many';

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

export class ResourceReadDto extends ResourcePaginateDto {
  @ApiProperty()
  read_type: ReadType;
}
