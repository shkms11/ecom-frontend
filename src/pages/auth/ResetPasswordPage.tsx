import { useParams } from "react-router-dom";
import { ResetPasswordForm } from "@/features/auth/components";
import { AuthLayout } from "@/layouts/AuthLayout";

export const ResetPasswordPage = () => {
  const { token } = useParams<{ token: string }>();

  if (!token) {
    return (
      <AuthLayout>
        <div className="text-center text-red-600">
          Invalid reset token. Please request a new password reset link.
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <ResetPasswordForm token={token} />
    </AuthLayout>
  );
};

