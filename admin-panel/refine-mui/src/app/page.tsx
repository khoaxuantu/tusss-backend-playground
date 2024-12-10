import { ServerAuthenticated } from "@components/ServerAuthenticated";
import { ThemedLayoutV2 } from "@refinedev/mui";

export default function IndexPage() {
  return (
    <ThemedLayoutV2>
      <ServerAuthenticated>Welcome to Tusss Admin!</ServerAuthenticated>
    </ThemedLayoutV2>
  );
}
