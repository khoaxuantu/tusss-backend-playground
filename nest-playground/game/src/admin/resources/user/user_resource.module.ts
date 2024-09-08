import { RepositoryModule } from "@/lib/repository/repository.module";
import { Module } from "@nestjs/common";
import { AdminUserResourceController } from "./user_resource.controller";
import { UserResourceService } from "./user_resource.service";

@Module({
  controllers: [AdminUserResourceController],
  imports: [RepositoryModule],
  providers: [UserResourceService],
})
export class AdminUserResourceModule {}
