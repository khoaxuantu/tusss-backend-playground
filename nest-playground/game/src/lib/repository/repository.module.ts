import { AdminSchema } from '@/admin/schema/admin.schema';
import { PlayerSchema } from '@/player/schema/player.schema';
import { UserSchema } from '@/user/schema/user.schema';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminRepository } from './admin/admin.repository';
import { SCHEMA_NAME } from './constant/schema.constant';
import { PlayerRepository } from './player/player.repository';
import { UserRepository } from './user/user.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SCHEMA_NAME.USER, schema: UserSchema },
      { name: SCHEMA_NAME.ADMIN, schema: AdminSchema },
      { name: SCHEMA_NAME.PLAYER, schema: PlayerSchema },
    ]),
  ],
  providers: [UserRepository, AdminRepository, PlayerRepository],
  exports: [UserRepository, AdminRepository, PlayerRepository],
})
export class RepositoryModule {}
