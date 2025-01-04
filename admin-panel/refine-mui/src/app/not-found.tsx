import Container from "@mui/material/Container";
import { ErrorComponent } from "@refinedev/core";
import { Suspense } from "react";

export default function NotFound() {
  return (
    <Suspense>
      <Container style={{ textAlign: "center" }}>
        <ErrorComponent />
      </Container>
    </Suspense>
  );
}
