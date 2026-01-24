import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "@/features/auth/api/authApi";
import { useToastContext } from "@/providers/toast/useToastContext";
import { validateForgotPasswordForm } from "@/features/auth/utils";
import { Input, Button } from "@/shared/components";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "@/features/auth/constants/auth.constants";

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const { showToast } = useToastContext();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validation = validateForgotPasswordForm(email);
    if (!validation.isValid) {
      setEmailError(Object.values(validation.errors)[0] || "");
      return;
    }

    try {
      await forgotPassword({ email: email.trim() }).unwrap();
      setIsSubmitted(true);
      showToast(SUCCESS_MESSAGES.PASSWORD_RESET_EMAIL_SENT, "success");
    } catch (err: unknown) {
      let errorMessage: string = ERROR_MESSAGES.SERVER_ERROR;

      if (err && typeof err === "object" && err !== null) {
        if ("data" in err) {
          const data = (err as { data?: { message?: string } }).data;
          if (typeof data?.message === "string") {
            errorMessage = data.message;
          }
        } else if (
          "message" in err &&
          typeof (err as { message: unknown }).message === "string"
        ) {
          errorMessage = (err as { message: string }).message;
        }
      }

      showToast(errorMessage, "error");
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="rounded-md bg-green-50 p-4">
          <div className="text-sm text-green-800">
            {SUCCESS_MESSAGES.PASSWORD_RESET_EMAIL_SENT}
          </div>
        </div>

        <p className="text-sm text-gray-600">
          Please check your email for the password reset link.
        </p>

        <Button onClick={() => navigate("/login")} className="w-full">
          Back to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Forgot password?</h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          error={emailError}
          required
          autoComplete="email"
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Sending..." : "Send reset link"}
        </Button>
      </form>

      <div className="text-center">
        <a
          href="/login"
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          Back to login
        </a>
      </div>
    </div>
  );
};
