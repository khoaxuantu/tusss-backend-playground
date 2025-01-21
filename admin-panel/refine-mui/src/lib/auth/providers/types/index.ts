import { SigninOutDto } from "@lib/auth/services/dto/signin.out.dto";
import { JwtPayload } from "jsonwebtoken";

export type AuthJwtProps = JwtPayload & SigninOutDto;
