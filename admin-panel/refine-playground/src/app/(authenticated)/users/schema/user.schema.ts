import { FieldUseTextInput } from "@components/Forms/Input/types";
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
  Photographer = "photographer",
}

export const Roles = enumToArray<string>(Role);

export const UserSchema = yup.object({
  name: yup.string().required(RESOURCE_MESSAGE.ERROR.REQUIRED_FIELD("name")),
  age: yup.number().positive().max(200).integer().optional(),
  email: yup.string().email().required(RESOURCE_MESSAGE.ERROR.REQUIRED_FIELD("email")),
  address: yup.string().transform((value) => {
    if (value == "") return undefined;
    return value;
  }),
  city: yup.string().transform((value) => {
    if (value == "") return undefined;
    return value;
  }),
  firstname: yup.string().transform((value) => {
    if (value == "") return undefined;
    return value;
  }),
  lastname: yup.string().transform((value) => {
    if (value == "") return undefined;
    return value;
  }),
  nationality: yup.string().transform((value) => {
    if (value == "") return undefined;
    return value;
  }),
  password: yup.string().transform((value) => {
    if (value == "") return undefined;
    return value;
  }).required(RESOURCE_MESSAGE.ERROR.REQUIRED_FIELD("password")),
  phone_number: yup.string().transform((value) => {
    if (value == "") return undefined;
    return value;
  }),
  roles: yup.array().compact().min(1, RESOURCE_MESSAGE.ERROR.REQUIRED_FIELD("roles")).required(),
});
