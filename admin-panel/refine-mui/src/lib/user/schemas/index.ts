import { RESOURCE_MESSAGE } from "@lib/resource/constants";
import { enumToArray } from "@lib/shared/helpers/enum.helper";
import yup from "@lib/yup/extended";

export interface UserShowProps {
  _id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  age: number;
  address: string;
  city: string;
  name: string;
  firstname: string;
  lastname: string;
  nationality: string;
  phone_number: string;
  roles: Role[];
}

export interface UserCreateProps extends yup.InferType<typeof UserCreateSchema> {}

export enum Role {
  User = "user",
  Photographer = "photographer",
}

export const Roles = enumToArray<string>(Role);

export const UserCreateSchema = yup.object({
  name: yup.string().required(RESOURCE_MESSAGE.ERROR.REQUIRED_FIELD("name")),
  age: yup.number().positive().max(200).integer().optional(),
  email: yup.string().email().required(RESOURCE_MESSAGE.ERROR.REQUIRED_FIELD("email")),
  address: yup.string().stripEmpty(),
  city: yup.string().stripEmpty(),
  firstname: yup.string().stripEmpty(),
  lastname: yup.string().stripEmpty(),
  nationality: yup.string().stripEmpty(),
  password: yup.string().stripEmpty().required(RESOURCE_MESSAGE.ERROR.REQUIRED_FIELD("password")),
  phone_number: yup.string().stripEmpty(),
  roles: yup.array().compact().min(1, RESOURCE_MESSAGE.ERROR.REQUIRED_FIELD("roles")).required(),
});

export const UserEditSchema = yup.object({
  name: yup.string(),
  age: yup.number().positive().max(200).integer().optional(),
  email: yup.string().email(),
  address: yup.string().stripEmpty(),
  city: yup.string().stripEmpty(),
  firstname: yup.string().stripEmpty(),
  lastname: yup.string().stripEmpty(),
  nationality: yup.string().stripEmpty(),
  password: yup.string().stripEmpty(),
  phone_number: yup.string().stripEmpty(),
  roles: yup.array().compact().min(1, RESOURCE_MESSAGE.ERROR.REQUIRED_FIELD("roles")).required(),
});

export const LIST_PROPS_AS_TEXT: (keyof UserCreateProps)[] = ["email", "name"];
