import { AuthProviderServer } from "@lib/auth/providers";
import { ApiError } from "next/dist/server/api-utils";

export class HeadersAdapter {
  constructor(private opts?: Record<string, any>) {}

  async transform(): Promise<Headers> {
    const identity = await AuthProviderServer.getIdentity();
    if (!identity) throw new ApiError(401, "Unauthorized");

    const accessToken = identity.access_token;
    const headers = new Headers();

    headers.append("Authorization", `Bearer ${accessToken}`);
    headers.append("Content-Type", "application/json");
    Object.entries(this.opts ?? {}).forEach((entry) => {
      headers.append(entry[0], entry[1]);
    });

    return headers;
  }
}
