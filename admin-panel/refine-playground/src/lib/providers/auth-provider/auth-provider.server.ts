import { CONFIG } from "@lib/constants/config";
import { SigninOutDto } from "@lib/services/dto/signin.out.dto";
import type { AuthProvider } from "@refinedev/core";
import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export const authProviderServer: Pick<AuthProvider, "check" | "getIdentity" | "getPermissions"> = {
  check: async () => {
    const cookieStore = cookies();
    const auth = cookieStore.get("auth");
    console.log("🚀 ~ check: ~ auth:", auth);

    try {
      if (auth) {
        verify(JSON.parse(auth.value), CONFIG.JWT_SECRET);

        return {
          authenticated: true,
        };
      }
    } catch (error) {
      console.log("[authProviderServer.check]", JSON.stringify(error));
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    const cookieStore = cookies();
    const auth = cookieStore.get("auth");

    try {
      if (auth) {
        const user = verify(JSON.parse(auth.value), CONFIG.JWT_SECRET) as JwtPayload & SigninOutDto;
        return user.roles;
      }
    } catch (error) {
      console.log("[authProviderServer.getPermissions]", JSON.stringify(error));
    }

    return null;
  },
  getIdentity: async () => {
    const cookieStore = cookies();
    const auth = cookieStore.get("auth");

    try {
      if (auth) {
        const user = verify(JSON.parse(auth.value), CONFIG.JWT_SECRET) as JwtPayload & SigninOutDto;
        return user;
      }
    } catch (error) {
      console.log("[authProviderServer.getPermissions]", JSON.stringify(error));
    }

    return null;
  },
};
