import { CONFIG } from "@lib/config";
import { SigninInDto } from "./dto/signin.in.dto";

export class AuthService {
  static async login(payload: SigninInDto) {
    const backendUrl = new URL("/signin", CONFIG.BACKEND_URL);
    const headers = new Headers();
    headers.set("Content-Type", "application/json")

    const res = await fetch(backendUrl, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        isAdmin: true,
      }),
      headers,
    });

    return res;
  }
}
