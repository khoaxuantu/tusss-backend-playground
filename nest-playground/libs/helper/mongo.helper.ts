import { isObjectIdOrHexString } from "mongoose";

export const MongoHelper = {
  getObjectIdAsString: (obj: any): string => {
    if (!obj) return "";
    if (isObjectIdOrHexString(obj)) return obj.toString();
    if (obj._id) return obj._id.toString();
    if (obj.id) return obj.id.toString();
    return "";
  }
};
