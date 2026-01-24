import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks";
import { useToastContext } from "@/providers/toast/useToastContext";
import { validateRegisterForm } from "@/features/auth/utils";
import { Input, Button } from "@/shared/components";
import { PasswordStrength, SocialLogin } from "@/features/auth/components";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "@/features/auth/constants/auth.constants";
import type { RegisterData } from "@/features/auth/types/auth.types";

export const Register = () => {
  const navigate = useNavigate();
  const { register, isRegistering, error, clearError } = useAuth();
  const { showToast } = useToastContext();

  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    clearError();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    // Validate form
    const validation = validateRegisterForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phone: formData.phone?.trim() || undefined,
      });

      showToast(SUCCESS_MESSAGES.REGISTER_SUCCESS, "success");
      navigate("/verify-email");
    } catch (err: unknown) {
      let errorMessage: string = ERROR_MESSAGES.SERVER_ERROR;

      if (err && typeof err === "object" && err !== null) {
        // API error shape
        if ("data" in err) {
          const data = (err as { data?: { message?: string } }).data;
          if (typeof data?.message === "string") {
            errorMessage = data.message;
          }
        }
        // JS Error
        else if (
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
        <h2 className="text-3xl font-bold text-gray-900">Create account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </a>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={formErrors.name}
          required
          autoComplete="name"
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={formErrors.email}
          required
          autoComplete="email"
        />

        <Input
          label="Phone (Optional)"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={formErrors.phone}
          autoComplete="tel"
        />

        <div>
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            required
            autoComplete="new-password"
          />
          {formData.password && (
            <PasswordStrength password={formData.password} />
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

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-800">{error}</div>
          </div>
        )}

        <Button type="submit" disabled={isRegistering} className="w-full">
          {isRegistering ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <SocialLogin />
    </div>
  );
};
