import { Role } from '@/auth/constant/role.constant';
import { PASSWORD_MAXLENGTH, PASSWORD_MINLENGTH } from '@/lib/constant/constants';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsStrongPassword,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, index: true })
  @ApiProperty()
  name: string;

  @Prop({ index: true })
  @ApiProperty()
  firstname?: string;

  @Prop({ index: true })
  @ApiProperty()
  lastname?: string;

  @Prop({ required: true, unique: true, index: true })
  @IsEmail()
  @ApiProperty()
  email: string;

  @Prop()
  @IsPhoneNumber()
  @IsOptional()
  @ApiPropertyOptional()
  phone_number?: string;

  @Prop()
  @ApiPropertyOptional()
  address?: string;

  @Prop({ index: true })
  @ApiPropertyOptional()
  city?: string;

  @Prop({ required: true })
  @MinLength(PASSWORD_MINLENGTH)
  @MaxLength(PASSWORD_MAXLENGTH)
  @IsStrongPassword()
  @ApiProperty()
  password: string;

  @Prop({ index: true })
  @IsOptional()
  @Max(200)
  @IsPositive()
  @ApiPropertyOptional()
  age?: number;

  @Prop({ index: true })
  @ApiPropertyOptional()
  nationality?: string;

  @Prop()
  @ApiProperty()
  roles: Role[];

  updatedAt: Date;
  createdAt: Date;

  isAdmin?() {
    return this.roles.includes(Role.Admin);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.loadClass(User);
