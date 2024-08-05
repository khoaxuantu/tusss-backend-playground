"use server";

import { CONFIG } from "@lib/constants/config";
import { AuthProviderServer } from "@lib/providers/auth-provider";
import { AuthService } from "@lib/services/auth.service";
import { SigninInDto } from "@lib/services/dto/signin.in.dto";
import { sign } from "jsonwebtoken";

export async function login(payload: SigninInDto) {
  const data = await AuthService.login(payload);

  return sign(data, process.env.JWT_SECRET || "", { expiresIn: `${CONFIG.JWT_LIFE_TIME}d` });
}

export async function checkLogin() {
  const result = await AuthProviderServer.check();
  return result;
}

export async function getIdentity() {
  const user = await AuthProviderServer.getIdentity();
  return user;
}

export async function getPermissions() {
  const permissions = await AuthProviderServer.getPermissions();
  return permissions;
}
