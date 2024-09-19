import { AdminDocument } from "@/admin/schema/admin.schema";
import { AbstractModelRepository } from "@libs/interfaces/repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel } from "mongoose";
import { SCHEMA_NAME } from "../constant/schema.constant";

@Injectable()
export class AdminRepository extends AbstractModelRepository<AdminDocument> {
  constructor(@InjectModel(SCHEMA_NAME.ADMIN) model: PaginateModel<AdminDocument>) {
    super(model);
  }
}
