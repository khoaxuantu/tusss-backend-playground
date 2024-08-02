import { ServerAuthenticated } from "@components/ServerAuthenticated";
import { ThemedLayoutV2 } from "@refinedev/chakra-ui";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemedLayoutV2>
      <ServerAuthenticated>
        {children}
      </ServerAuthenticated>
    </ThemedLayoutV2>
  );
}
