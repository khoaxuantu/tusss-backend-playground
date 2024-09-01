import { Admin, AdminDocument } from "@/admin/schema/admin.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel } from "mongoose";
import { AbstractModelRepository } from "../interfaces/repository.interface";

@Injectable()
export class AdminRepository extends AbstractModelRepository<AdminDocument> {
  constructor(@InjectModel(Admin.name) model: PaginateModel<AdminDocument>) {
    super(model);
  }
}
