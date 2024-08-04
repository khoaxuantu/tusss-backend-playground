import { SigninOutDto } from "@lib/services/dto/signin.out.dto";
import { JwtPayload } from "jsonwebtoken";

export type AuthJwtProps = JwtPayload & SigninOutDto;
