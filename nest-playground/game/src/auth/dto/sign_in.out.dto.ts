import { User, UserDocument } from "@/user/schema/user.schema";
import { MongoHelper } from "@libs/helper/mongo.helper";
import { ApiProperty, IntersectionType, OmitType } from "@nestjs/swagger";
import { Document } from "mongoose";

export class SignInOutDto extends OmitType(IntersectionType(User, Document), ["password"]) {
  @ApiProperty()
  access_token: string;

  constructor(user: UserDocument, accessToken: string) {
    super();

    this._id = MongoHelper.getObjectIdAsString(user);
    this.name = user.name;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.phone_number = user.phone_number;
    this.address = user.address;
    this.city = user.city;
    this.age = user.age;
    this.nationality = user.nationality;
    this.roles = user.roles;
    this.access_token = accessToken;
  }
}
