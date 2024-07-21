import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/user/schema/user.schema';
import { UserRepository } from './user/user.repository';
import { Admin, AdminSchema } from '@/admin/schema/admin.schema';
import { AdminRepository } from './admin/admin.repository';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Admin.name, schema: AdminSchema },
  ])],
  providers: [UserRepository, AdminRepository],
  exports: [UserRepository, AdminRepository],
})
export class RepositoryModule {}
