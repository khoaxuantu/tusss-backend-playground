import { CONFIG } from "@lib/constants/config";
import type { AuthProvider } from "@refinedev/core";
import { verify } from "jsonwebtoken";
import { ApiError } from "next/dist/server/api-utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthJwtProps } from "./types";

export class AuthProviderServer {
  static async check(): ReturnType<AuthProvider["check"]> {
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
      console.warn("[AuthProviderServer.check]", JSON.stringify(error));
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  }

  static async getPermissions() {
    const cookieStore = cookies();
    const auth = cookieStore.get("auth");

    try {
      if (auth) {
        const user = verify(JSON.parse(auth.value), CONFIG.JWT_SECRET) as AuthJwtProps;
        return user.roles;
      }
    } catch (error) {
      console.warn("[AuthProviderServer.getPermissions]", JSON.stringify(error));
    }

    return null;
  }

  static async getIdentity() {
    const cookieStore = cookies();
    const auth = cookieStore.get("auth");

    try {
      if (auth) {
        const user = verify(JSON.parse(auth.value), CONFIG.JWT_SECRET) as AuthJwtProps;
        return user;
      }
    } catch (error) {
      console.warn("[AuthProviderServer.getPermissions]", JSON.stringify(error));
    }

    return null;
  }

  static async withAuthHandler(callback: () => Promise<any>) {
    try {
      return await callback();
    } catch (error) {
      if (error instanceof ApiError) {
        if (this.isUnauthorized(error.statusCode)) redirect("/login");
      }

      throw error;
    }
  }

  static isUnauthorized(statusCode: number): boolean {
    return statusCode == 401 || statusCode == 403;
  }
};
