import { Authenticated, ErrorComponent } from "@refinedev/core";

export default function NotFound() {
  return (
    <Authenticated key="not-found">
      <ErrorComponent />
    </Authenticated>
  );
}
