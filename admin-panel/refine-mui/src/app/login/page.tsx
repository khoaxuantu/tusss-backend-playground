import { AuthPage } from "@refinedev/mui";

export default async function Login() {
  return (
    <AuthPage
      type="login"
      rememberMe={false}
      forgotPasswordLink={false}
      registerLink={false}
      title="Tusss Refine Playground"
    />
  );
}
