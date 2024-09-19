import { Role } from '@/auth/constant/role.constant';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import {
  MongoFilterDate,
  MongoFilterNumber,
  MongoFilterObjectId,
  MongoFilterString,
} from '../../dto/mongo.dto';
import { ResourceReadDto } from '../../dto/read.dto';

export class UserResourceDto {
  @ApiPropertyOptional({ type: MongoFilterObjectId })
  @IsOptional()
  @ValidateNested()
  @Transform(({ value }) => new MongoFilterObjectId(value))
  _id?: MongoFilterObjectId;

  @ApiPropertyOptional({ type: MongoFilterString })
  @IsOptional()
  @ValidateNested()
  @Type(() => MongoFilterString)
  name?: MongoFilterString;

  @ApiPropertyOptional({ type: MongoFilterString })
  @IsOptional()
  @ValidateNested()
  @Type(() => MongoFilterString)
  firstname?: MongoFilterString;

  @ApiPropertyOptional({ type: MongoFilterString })
  @IsOptional()
  @ValidateNested()
  @Type(() => MongoFilterString)
  lastname?: MongoFilterString;

  @ApiPropertyOptional({ type: MongoFilterString })
  @IsOptional()
  @ValidateNested()
  @Type(() => MongoFilterString)
  email?: MongoFilterString;

  @ApiPropertyOptional({ type: MongoFilterString })
  @IsOptional()
  @ValidateNested()
  @Type(() => MongoFilterString)
  phone_number?: MongoFilterString;

  @ApiPropertyOptional({ type: MongoFilterString })
  @IsOptional()
  @ValidateNested()
  @Type(() => MongoFilterString)
  address?: MongoFilterString;

  @ApiPropertyOptional({ type: MongoFilterString })
  @IsOptional()
  @ValidateNested()
  @Type(() => MongoFilterString)
  city?: MongoFilterString;

  @ApiPropertyOptional({ type: MongoFilterNumber })
  @IsOptional()
  @ValidateNested()
  @Type(() => MongoFilterNumber)
  age?: MongoFilterNumber;

  @ApiPropertyOptional({ enum: Role, isArray: true })
  @IsEnum(Role)
  @IsOptional()
  roles?: Role[];

  @ApiPropertyOptional({ type: MongoFilterDate })
  @IsDate()
  @IsOptional()
  @ValidateNested()
  @Type(() => MongoFilterDate)
  updatedAt?: MongoFilterDate;

  @ApiPropertyOptional({ type: MongoFilterDate })
  @IsDate()
  @IsOptional()
  @ValidateNested()
  @Type(() => MongoFilterDate)
  createdAt?: MongoFilterDate;
}

export class ListUserResourceDto extends ResourceReadDto(UserResourceDto) {}
