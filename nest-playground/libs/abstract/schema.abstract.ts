import { ApiPropertyOptional } from "@nestjs/swagger";

export abstract class BaseSchema {
  @ApiPropertyOptional()
  updatedAt: Date;

  @ApiPropertyOptional()
  createdAt: Date;
}
