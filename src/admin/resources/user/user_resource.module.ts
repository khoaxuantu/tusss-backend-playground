import { Module } from "@nestjs/common";
import { AdminUserResourceController } from "./user_resource.controller";
import { UserRepositoryModule } from "@/lib/repository/user/user.repository.module";
import { UserFactoryModule } from "@/lib/factory/user/user.module";

@Module({
  controllers: [AdminUserResourceController],
  imports: [UserRepositoryModule, UserFactoryModule]
})
export class AdminUserResourceModule {}
