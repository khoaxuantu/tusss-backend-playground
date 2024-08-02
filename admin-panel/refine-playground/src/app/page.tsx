import { Suspense } from "react";
import { ServerAuthenticated } from "@components/ServerAuthenticated";
import { ThemedLayoutV2 } from "@refinedev/chakra-ui";

export default function IndexPage() {
  return (
    <ThemedLayoutV2>
      <Suspense>
        <ServerAuthenticated>
          Welcome to Tusss Admin!
        </ServerAuthenticated>
      </Suspense>
    </ThemedLayoutV2>
  );
}
