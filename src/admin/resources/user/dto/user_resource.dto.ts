import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { ResourceReadDto } from '../../dto/read.dto';
import { Types } from 'mongoose';
import { MongoFilterDto } from '../../dto/mongo.dto';
import { IsDate, IsEmail, IsEnum, IsOptional, IsPhoneNumber, ValidateNested } from 'class-validator';
import { Role } from '@/auth/constant/role.constant';

export class UserResourceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  _id?: MongoFilterDto<Types.ObjectId>;

  @ApiPropertyOptional()
  @IsOptional()
  firstname?: MongoFilterDto<string>;

  @ApiPropertyOptional()
  @IsOptional()
  lastname?: MongoFilterDto<string>;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email?: MongoFilterDto<string>;

  @ApiPropertyOptional()
  @IsPhoneNumber()
  @IsOptional()
  phone_number?: MongoFilterDto<string>;

  @ApiPropertyOptional()
  @IsOptional()
  address?: MongoFilterDto<string>;

  @ApiPropertyOptional()
  @IsOptional()
  city?: MongoFilterDto<string>;

  @ApiPropertyOptional()
  @IsOptional()
  age?: MongoFilterDto<number>;

  @ApiPropertyOptional({ enum: Role, isArray: true })
  @IsEnum(Role)
  @IsOptional()
  roles?: Role[];

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  updatedAt?: MongoFilterDto<Date>;

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  createdAt?: MongoFilterDto<Date>;
}

export class ListUserResourceDto extends ResourceReadDto<UserResourceDto> {}
