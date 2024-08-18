import { Role } from '@/auth/constant/role.constant';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';
import { CreateMongoFilterDtoWith } from '../../dto/mongo.dto';
import { ResourceReadDto } from '../../dto/read.dto';

class MongoFilterAge extends CreateMongoFilterDtoWith(Number) {}
class MongoFilterString extends CreateMongoFilterDtoWith(String) {}
class MongoFilterDate extends CreateMongoFilterDtoWith(Date) {}
class MongoFilterObjectId extends CreateMongoFilterDtoWith(Types.ObjectId) {}

export class UserResourceDto {
  @ApiPropertyOptional({ type: MongoFilterObjectId })
  @IsOptional()
  @ValidateNested()
  @Type(() => MongoFilterObjectId)
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

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => MongoFilterString)
  email?: MongoFilterString;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => MongoFilterString)
  phone_number?: MongoFilterString;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => MongoFilterString)
  address?: MongoFilterString;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => MongoFilterString)
  city?: MongoFilterString;

  @ApiPropertyOptional({ type: MongoFilterAge })
  @IsOptional()
  @ValidateNested()
  @Type(() => MongoFilterAge)
  age?: MongoFilterAge;

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
