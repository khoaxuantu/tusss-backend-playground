import { User, UserSchema } from '@/user/schema/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonUserFactory } from './common_user';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [CommonUserFactory],
  exports: [CommonUserFactory],
})
export class UserFactoryModule {}
