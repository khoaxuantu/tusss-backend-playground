import { AuthPage } from "@refinedev/chakra-ui";

export default async function Login() {
  console.log("render login page");

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
