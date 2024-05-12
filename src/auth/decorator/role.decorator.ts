import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY, Role } from "../constant/role.constant";

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
