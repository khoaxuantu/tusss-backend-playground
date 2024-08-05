import { AuthJwtProps, authProviderServer } from "@lib/providers/auth-provider";

export class HeadersAdapter {
  constructor(private opts?: Record<string, any>) {}

  async transform(): Promise<Headers> {
    const identity = await authProviderServer.getIdentity!() as AuthJwtProps;
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
