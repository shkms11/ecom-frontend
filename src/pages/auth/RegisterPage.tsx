import { Register } from "@/features/auth/components";
import { AuthLayout } from "@/layouts/AuthLayout";

export const RegisterPage = () => {
  return (
    <AuthLayout>
      <Register />
    </AuthLayout>
  );
};

