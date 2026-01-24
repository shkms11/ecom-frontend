import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "@/features/auth/api/authApi";
import { useToastContext } from "@/providers/toast/useToastContext";
import { validateResetPasswordForm } from "@/features/auth/utils";
import { Input, Button } from "@/shared/components";
import { PasswordStrength } from "@/features/auth/components";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "@/features/auth/constants/auth.constants";

interface ResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  token,
}) => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { showToast } = useToastContext();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form
    const validation = validateResetPasswordForm(
      formData.newPassword,
      formData.confirmPassword,
    );
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    try {
      await resetPassword({
        token,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      }).unwrap();

      showToast(SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS, "success");
      navigate("/login");
    } catch (err: unknown) {
      let errorMessage: string = ERROR_MESSAGES.INVALID_TOKEN;

      if (err && typeof err === "object" && err !== null) {
        const maybeData = (err as { data?: { message?: string } }).data;
        if (maybeData && typeof maybeData.message === "string") {
          errorMessage = maybeData.message;
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

  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Reset password</h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            error={formErrors.password}
            required
            autoComplete="new-password"
          />
          {formData.newPassword && (
            <PasswordStrength password={formData.newPassword} />
          )}
        </div>

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={formErrors.confirmPassword}
          required
          autoComplete="new-password"
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Resetting..." : "Reset password"}
        </Button>
      </form>
    </div>
  );
};
