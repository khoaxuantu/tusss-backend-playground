import { Types } from "mongoose";

export interface FindUserOpt {
  _id?: Types.ObjectId;
  name?: string;
  email?: string;
}
