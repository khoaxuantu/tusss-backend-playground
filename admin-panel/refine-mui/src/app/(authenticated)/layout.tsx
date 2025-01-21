import { ServerAuthenticated } from "@lib/shared/components/ServerAuthenticated";
import { ThemedLayoutV2 } from "@refinedev/mui";
import React, { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <ThemedLayoutV2>
        <ServerAuthenticated>
          {children}
        </ServerAuthenticated>
      </ThemedLayoutV2>
    </Suspense>
  );
}
