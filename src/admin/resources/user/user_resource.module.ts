import { Module } from "@nestjs/common";
import { AdminUserResourceController } from "./user_resource.controller";
import { UserRepositoryModule } from "@/lib/repository/user/user.repository.module";
import { UserFactoryModule } from "@/lib/factory/user/user.module";
import { UserResourceService } from "./user_resource.service";

@Module({
  controllers: [AdminUserResourceController],
  imports: [UserRepositoryModule, UserFactoryModule],
  providers: [UserResourceService],
})
export class AdminUserResourceModule {}
