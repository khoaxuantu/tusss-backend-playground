import { Role } from "@/auth/constant/role.constant";
import { IJwtPayload } from "@/auth/interface/jwt_payload.interface";
import { userDocumentStub } from "@test/stubs/users.stub";

export const accessTokenStub = 'lmao access token from jwt.';
export const jwtPayloadStub: IJwtPayload = {
  sub: userDocumentStub()._id.toString(),
  username: userDocumentStub().name,
  roles: [Role.User],
}
