import { Role } from '@/auth/constant/role.constant';
import { BaseSchema } from "@libs/abstract/schema.abstract";
import { PASSWORD_MAXLENGTH, PASSWORD_MINLENGTH } from '@libs/constant/constants';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsStrongPassword,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Profile, ProfileDocument } from '../profile/schema/profile.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends BaseSchema {
  @Prop({ required: true, index: true })
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @Prop({ index: true })
  @IsOptional()
  @ApiPropertyOptional()
  firstname?: string;

  @Prop({ index: true })
  @IsOptional()
  @ApiPropertyOptional()
  lastname?: string;

  @Prop({ required: true, unique: true, index: true })
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @Prop()
  @IsPhoneNumber()
  @IsOptional()
  @ApiPropertyOptional()
  phone_number?: string;

  @Prop()
  @IsOptional()
  @ApiPropertyOptional()
  address?: string;

  @Prop({ index: true })
  @IsOptional()
  @ApiPropertyOptional()
  city?: string;

  @Prop({ required: true })
  @MinLength(PASSWORD_MINLENGTH)
  @MaxLength(PASSWORD_MAXLENGTH)
  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @Prop({ index: true })
  @IsOptional()
  @Max(200)
  @IsPositive()
  @ApiPropertyOptional()
  age?: number;

  @Prop({ index: true })
  @IsOptional()
  @ApiPropertyOptional()
  nationality?: string;

  @Prop({
    type: [String],
    enum: Role,
  })
  @ApiProperty({ enum: Role, isArray: true })
  @IsNotEmpty()
  @IsEnum(Role, { each: true })
  @IsArray()
  roles: Role[];

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: Profile.name,
  })
  @ApiProperty({ type: String, isArray: true })
  @IsArray()
  profiles: Types.ObjectId[] | ProfileDocument[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(mongoosePaginate);
