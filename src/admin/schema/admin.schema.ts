import { User } from "@/user/schema/user.schema";
import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ timestamps: true, autoIndex: true })
export class Admin extends User {}

export const AdminSchema = SchemaFactory.createForClass(Admin);
