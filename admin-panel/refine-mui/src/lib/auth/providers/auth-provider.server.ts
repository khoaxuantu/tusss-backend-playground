import { CONFIG } from "@lib/config";
import { sanitizeObject } from "@lib/shared/helpers/params.helper";
import type { AuthProvider } from "@refinedev/core";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthJwtProps } from "./types";

export class AuthProviderServer {
  static async check(): ReturnType<AuthProvider["check"]> {
    const cookieStore = await cookies();
    const auth = cookieStore.get("auth");

    try {
      if (auth) {
        verify(auth.value, CONFIG.JWT_SECRET);

        return {
          authenticated: true,
        };
      }
    } catch (error) {
      console.warn("[AuthProviderServer.check]", JSON.stringify(error));
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
      error: { message: "Logging Out...", name: "Invalid Credentials." },
    };
  }

  static async getPermissions() {
    const cookieStore = await cookies();
    const auth = cookieStore.get("auth");

    try {
      if (auth) {
        const user = verify(auth.value, CONFIG.JWT_SECRET) as AuthJwtProps;
        return user.roles;
      }
    } catch (error) {
      console.warn("[AuthProviderServer.getPermissions]", JSON.stringify(error));
    }

    return null;
  }

  static async getIdentity() {
    const cookieStore = await cookies();
    const auth = cookieStore.get("auth");

    try {
      if (auth) {
        const user = verify(auth.value, CONFIG.JWT_SECRET) as AuthJwtProps;
        return user;
      }
    } catch (error) {
      console.warn("[AuthProviderServer.getIdentity]", JSON.stringify(error));
    }

    return null;
  }

  static async withAuthHandler<T>(callback: () => Promise<T>) {
    try {
      return await callback();
    } catch (error: any) {
      if (this.isUnauthorized(error.statusCode)) redirect("/login");
      return sanitizeObject(error);
    }
  }

  static isUnauthorized(statusCode: number): boolean {
    return statusCode == 401 || statusCode == 403;
  }
};
