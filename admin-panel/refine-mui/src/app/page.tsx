import { ServerAuthenticated } from "@lib/shared/components/ServerAuthenticated";
import { ThemedLayoutV2 } from "@refinedev/mui";
import { Suspense } from "react";

export default function IndexPage() {
  return (
    <Suspense>
      <ThemedLayoutV2>
        <ServerAuthenticated>Welcome to Tusss Admin!</ServerAuthenticated>
      </ThemedLayoutV2>
    </Suspense>
  );
}
