import { Module } from "@nestjs/common";
import { AdminUserResourceController } from "./user_resource.controller";
import { UserFactoryModule } from "@/lib/factory/user/user.module";
import { UserResourceService } from "./user_resource.service";
import { RepositoryModule } from "@/lib/repository/repository.module";

@Module({
  controllers: [AdminUserResourceController],
  imports: [RepositoryModule, UserFactoryModule],
  providers: [UserResourceService],
})
export class AdminUserResourceModule {}
