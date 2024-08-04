import { CONFIG } from "@lib/constants/config";
import type { AuthProvider } from "@refinedev/core";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { AuthJwtProps } from "./types";

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
      console.warn("[authProviderServer.check]", JSON.stringify(error));
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
        const user = verify(JSON.parse(auth.value), CONFIG.JWT_SECRET) as AuthJwtProps;
        return user.roles;
      }
    } catch (error) {
      console.warn("[authProviderServer.getPermissions]", JSON.stringify(error));
    }

    return null;
  },
  getIdentity: async () => {
    const cookieStore = cookies();
    const auth = cookieStore.get("auth");

    try {
      if (auth) {
        const user = verify(JSON.parse(auth.value), CONFIG.JWT_SECRET) as AuthJwtProps;
        return user;
      }
    } catch (error) {
      console.warn("[authProviderServer.getPermissions]", JSON.stringify(error));
    }

    return null;
  },
};
