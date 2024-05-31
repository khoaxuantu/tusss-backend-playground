import { Controller } from "@nestjs/common";
import { AbstractResourceController } from "../interfaces/resource.interface";
import { UserRepository } from "@/lib/repository/user/user.repository";
import { CommonUserFactory } from "@/lib/factory/user/common_user";
import { ApiTags } from "@nestjs/swagger";

@Controller("admin/user")
@ApiTags("Admin Resource")
export class AdminUserResourceController extends AbstractResourceController {
  constructor(repository: UserRepository, factory: CommonUserFactory) {
    super(repository, factory);
  }
}
