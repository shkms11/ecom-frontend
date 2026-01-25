import { useParams } from "react-router-dom";
import { EmailVerification } from "@/features/auth/components";
import { AuthLayout } from "@/layouts/AuthLayout";

export const VerifyEmailPage = () => {
  const { token } = useParams<{ token: string }>();

  if (!token) {
    return (
      <AuthLayout>
        <div className="text-center text-red-600">
          Invalid verification token. Please request a new verification email.
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <EmailVerification token={token} />
    </AuthLayout>
  );
};

