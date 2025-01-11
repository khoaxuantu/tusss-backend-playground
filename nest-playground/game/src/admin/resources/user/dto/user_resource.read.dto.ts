import { Role } from '@/auth/constant/role.constant';
import { ClassTransformerHelper } from '@libs/helper/transform.helper';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmptyObject, IsOptional, ValidateNested } from 'class-validator';
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
  @IsNotEmptyObject()
  @Transform(({ value }) => new MongoFilterObjectId(value))
  _id?: MongoFilterObjectId;

  @ApiPropertyOptional({ type: MongoFilterString })
  @IsOptional()
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => MongoFilterString)
  name?: MongoFilterString;

  @ApiPropertyOptional({ type: MongoFilterString })
  @IsOptional()
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => MongoFilterString)
  firstname?: MongoFilterString;

  @ApiPropertyOptional({ type: MongoFilterString })
  @IsOptional()
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => MongoFilterString)
  lastname?: MongoFilterString;

  @ApiPropertyOptional({ type: MongoFilterString })
  @IsOptional()
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => MongoFilterString)
  email?: MongoFilterString;

  @ApiPropertyOptional({ type: MongoFilterString })
  @IsOptional()
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => MongoFilterString)
  phone_number?: MongoFilterString;

  @ApiPropertyOptional({ type: MongoFilterString })
  @IsOptional()
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => MongoFilterString)
  address?: MongoFilterString;

  @ApiPropertyOptional({ type: MongoFilterString })
  @IsOptional()
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => MongoFilterString)
  city?: MongoFilterString;

  @ApiPropertyOptional({ type: MongoFilterNumber })
  @IsOptional()
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => MongoFilterNumber)
  age?: MongoFilterNumber;

  @ApiPropertyOptional({ enum: Role, isArray: true, example: `${Role.User},${Role.Photographer}` })
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => ClassTransformerHelper.transformArrParams({ cls: String, value }))
  roles?: Role[];

  @ApiPropertyOptional({ type: MongoFilterDate })
  @IsOptional()
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => MongoFilterDate)
  updatedAt?: MongoFilterDate;

  @ApiPropertyOptional({ type: MongoFilterDate })
  @IsOptional()
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => MongoFilterDate)
  createdAt?: MongoFilterDate;
}

export class ListUserResourceDto extends ResourceReadDto(UserResourceDto) {}
