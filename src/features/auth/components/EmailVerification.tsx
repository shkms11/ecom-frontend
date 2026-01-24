import { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useVerifyEmailMutation,
  useResendVerificationEmailMutation,
} from "@/features/auth/api/authApi";
import { useToastContext } from "@/providers/toast/useToastContext";
import { Button } from "@/shared/components";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "@/features/auth/constants/auth.constants";

interface EmailVerificationProps {
  token: string;
}

type Status = "idle" | "verifying" | "success" | "error";

const DEFAULT_INVALID_TOKEN = ERROR_MESSAGES.INVALID_TOKEN as string;
const DEFAULT_SERVER_ERROR = ERROR_MESSAGES.SERVER_ERROR as string;

export const EmailVerification: React.FC<EmailVerificationProps> = ({
  token,
}) => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();

  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendEmail, { isLoading: isResending }] =
    useResendVerificationEmailMutation();

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const didVerify = useRef(false);

  const handleVerify = useCallback(async () => {
    setStatus("verifying");

    try {
      await verifyEmail({ token }).unwrap();
      setStatus("success");
      showToast(SUCCESS_MESSAGES.EMAIL_VERIFIED, "success");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: unknown) {
      let message: string = DEFAULT_INVALID_TOKEN;

      if (err && typeof err === "object" && err !== null) {
        const maybeData = (err as { data?: { message?: string } }).data;

        if (typeof maybeData?.message === "string") {
          message = maybeData.message;
        } else if (
          "message" in err &&
          typeof (err as { message?: unknown }).message === "string"
        ) {
          message = (err as { message: string }).message;
        }
      }

      setErrorMessage(message);
      setStatus("error");
      showToast(message, "error");
    }
  }, [verifyEmail, token, navigate, showToast]);

  useEffect(() => {
    if (!token || didVerify.current) return;
    didVerify.current = true;

    queueMicrotask(() => {
      handleVerify();
    });
  }, [token, handleVerify]);

  const handleResend = async () => {
    try {
      await resendEmail().unwrap();
      showToast(SUCCESS_MESSAGES.VERIFICATION_EMAIL_SENT, "success");
    } catch (err: unknown) {
      let message: string = DEFAULT_SERVER_ERROR;

      if (err && typeof err === "object" && err !== null) {
        const maybeData = (err as { data?: { message?: string } }).data;

        if (typeof maybeData?.message === "string") {
          message = maybeData.message;
        } else if (
          "message" in err &&
          typeof (err as { message?: unknown }).message === "string"
        ) {
          message = (err as { message: string }).message;
        }
      }

      showToast(message, "error");
    }
  };

  if (status === "verifying") {
    return (
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
        <p className="text-sm text-gray-600">Verifying your email...</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="rounded-md bg-green-50 p-4">
          <div className="text-sm text-green-800">
            {SUCCESS_MESSAGES.EMAIL_VERIFIED}
          </div>
        </div>
        <p className="text-sm text-gray-600">Redirecting to login page...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="w-full max-w-md space-y-6">
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-800">{errorMessage}</div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full"
          >
            {isVerifying ? "Verifying..." : "Try Again"}
          </Button>

          <Button
            onClick={handleResend}
            disabled={isResending}
            variant="outline"
            className="w-full"
          >
            {isResending ? "Sending..." : "Resend Verification Email"}
          </Button>

          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="w-full"
          >
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  return null;
};
