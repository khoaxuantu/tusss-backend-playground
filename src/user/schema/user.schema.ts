import { Role } from '@/auth/constant/role.constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsPhoneNumber, IsPositive, IsStrongPassword, Max } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ index: true })
  firstname?: string;

  @Prop({ index: true })
  lastname?: string;

  @Prop({ required: true, unique: true, index: true })
  @IsEmail()
  email: string;

  @Prop()
  @IsPhoneNumber()
  phone_number?: string;

  @Prop()
  address?: string;

  @Prop({ index: true })
  city?: string;

  @Prop({ required: true })
  password: string;

  @Prop({ index: true })
  @Max(200)
  @IsPositive()
  age?: number;

  @Prop({ index: true })
  nationality?: string;

  @Prop({ index: true })
  updated_at: Date;

  @Prop()
  roles: Role[];

  isAdmin?() {
    return this.roles.includes(Role.Admin);
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.loadClass(User);

UserSchema.pre<UserDocument>('save', function (this, next) {
  this.updated_at = new Date();
  next();
})
