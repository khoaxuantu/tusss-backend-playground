import { UserDocument } from "@/user/schema/user.schema";
import { AbstractResourceService } from "../interfaces/service.interface";
import { UserRepository } from "@/lib/repository/user/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserResourceService extends AbstractResourceService<UserDocument> {
  constructor(repository: UserRepository) {
    super(repository);
  }
}
