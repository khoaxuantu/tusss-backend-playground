import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { MongoFilterNumber, MongoFilterObjectId, MongoFilterString } from "../../dto/mongo.dto";
import { ResourceReadDto } from "../../dto/read.dto";

export class PlayerResourceReadDto {
  @ApiPropertyOptional({ type: MongoFilterObjectId })
  @IsOptional()
  @ValidateNested()
  @Transform(({ value }) => new MongoFilterObjectId(value))
  _id?: MongoFilterObjectId;

  @ApiPropertyOptional({ type: MongoFilterNumber })
  @IsOptional()
  @ValidateNested()
  @Type(() => MongoFilterNumber)
  level?: MongoFilterNumber;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => MongoFilterString)
  power_rank?: MongoFilterString;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => MongoFilterString)
  starter_type?: MongoFilterString;
}

export class ListPlayerResourceDto extends ResourceReadDto(PlayerResourceReadDto) {}
