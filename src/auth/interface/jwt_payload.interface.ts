import { Role } from "../constant/role.constant";

export interface IJwtPayload {
  sub: string,
  username: string,
  roles: Role[],
}
