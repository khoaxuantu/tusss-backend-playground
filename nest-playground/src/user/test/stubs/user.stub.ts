import { Role } from "@/auth/constant/role.constant";
import { User, UserDocument } from "@/user/schema/user.schema";
import { Types } from "mongoose";

export function createUser(payload?: Partial<UserDocument>) {
  return {
    name: "Tusss",
    firstname: "Tusss",
    lastname: "Tusss",
    email: "Tusss",
    phone_number: "+84123456789",
    address: "An address",
    city: "Hanoi",
    password: "fjidsofs#ssssHHH2@@@",
    age: 24,
    nationality: "Vietnam",
    roles: [Role.User],
    createdAt: new Date(),
    updatedAt: new Date(),
    ...payload,
  } as User;
}

export function createUserDocument(payload?: Partial<UserDocument>) {
  return {
    _id: new Types.ObjectId(),
    ...createUser(payload),
  } as UserDocument;
}
