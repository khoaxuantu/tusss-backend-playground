import { Module } from "@nestjs/common";
import { AdminUserResourceController } from "./user_resource.controller";
import { UserResourceService } from "./user_resource.service";

@Module({
  controllers: [AdminUserResourceController],
  providers: [UserResourceService],
})
export class AdminUserResourceModule {}
