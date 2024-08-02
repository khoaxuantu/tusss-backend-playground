import { Injectable } from "@nestjs/common";
import { AbstractModelRepository } from "../interfaces/repository.interface";
import { Admin, AdminDocument } from "@/admin/schema/admin.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class AdminRepository extends AbstractModelRepository<AdminDocument> {
  constructor(@InjectModel(Admin.name) model: Model<Admin>) {
    super(model);
  }
}
