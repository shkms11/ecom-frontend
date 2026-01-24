import { useState, type FormEvent } from "react";
import { useChangePasswordMutation } from "@/features/auth/api/authApi";
import { useToastContext } from "@/providers/toast/useToastContext";
import { validateChangePasswordForm } from "@/features/auth/utils";
import { Input, Button } from "@/shared/components";
import { PasswordStrength } from "@/features/auth/components";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "@/features/auth/constants/auth.constants";

const DEFAULT_SERVER_ERROR = ERROR_MESSAGES.SERVER_ERROR as string;

export const ChangePasswordForm = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const { showToast } = useToastContext();

  const [formData, setFormData] = useState({
    currentPassword: "",
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

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validation = validateChangePasswordForm(
      formData.currentPassword,
      formData.newPassword,
      formData.confirmPassword,
    );

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      }).unwrap();

      showToast(SUCCESS_MESSAGES.PASSWORD_CHANGED, "success");

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
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

  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Change password</h2>
        <p className="mt-2 text-sm text-gray-600">
          Update your password to keep your account secure.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Current Password"
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          error={formErrors.currentPassword}
          required
          autoComplete="current-password"
        />

        <div>
          <Input
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            error={formErrors.newPassword}
            required
            autoComplete="new-password"
          />
          {formData.newPassword && (
            <PasswordStrength password={formData.newPassword} />
          )}
        </div>

        <Input
          label="Confirm New Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={formErrors.confirmPassword}
          required
          autoComplete="new-password"
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Changing..." : "Change password"}
        </Button>
      </form>
    </div>
  );
};
