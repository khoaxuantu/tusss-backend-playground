import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsPhoneNumber, IsStrongPassword } from 'class-validator';
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

  @IsEmail()
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @IsPhoneNumber()
  @Prop()
  phone_number?: string;

  @Prop()
  address?: string;

  @Prop({ index: true })
  city?: string;

  @IsStrongPassword()
  @Prop({ required: true })
  password: string;

  @Prop({ index: true })
  age?: number;

  @Prop({ index: true })
  nationality?: string;

  @Prop({ required: true, index: true })
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', function (this, next) {
  this.updated_at = new Date();
  next();
})
