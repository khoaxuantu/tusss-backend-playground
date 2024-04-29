import { User } from "@/models/mongodb/user.schema";
import { UserFactory } from "./interface/user";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CommonUserFactory implements UserFactory {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create<User>(user: User) {
    return new this.userModel(user);
  };
}
