import { ForgotPasswordForm } from "@/features/auth/components";
import { AuthLayout } from "@/layouts/AuthLayout";

export const ForgotPasswordPage = () => {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

