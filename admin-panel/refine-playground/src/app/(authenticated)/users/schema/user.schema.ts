import { FieldUseTextInput } from "@components/Forms/TextInput/types";
import { RESOURCE_MESSAGE } from "@lib/constants/resource";
import { enumToArray } from "@lib/helpers/enum.helper";
import * as yup from "yup";

export type UserProps = yup.InferType<typeof UserSchema>;

export type UserPropsForTextInput = FieldUseTextInput<
  UserProps,
  | "address"
  | "city"
  | "firstname"
  | "lastname"
  | "email"
  | "name"
  | "nationality"
  | "password"
  | "phone_number"
>;

export enum Role {
  User = "user",
  Admin = "admin",
  Photographer = "photographer",
}

export const Roles = enumToArray<string>(Role);

export const UserSchema = yup.object({
  name: yup.string().required(),
  age: yup.number().positive().max(200).integer(),
  email: yup.string().email().required(),
  address: yup.string(),
  city: yup.string(),
  firstname: yup.string(),
  lastname: yup.string(),
  nationality: yup.string(),
  password: yup.string(),
  phone_number: yup.string(),
  roles: yup.array().compact().min(1, RESOURCE_MESSAGE.ERROR.REQUIRED_FIELD("roles")).required(),
});
