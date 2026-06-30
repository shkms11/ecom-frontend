import { LoginForm } from "@/features/auth/components";
import { AuthLayout } from "@/layouts/AuthLayout";

export const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
