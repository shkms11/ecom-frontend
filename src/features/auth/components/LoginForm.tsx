import { useState, type FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks";
import { useToastContext } from "@/providers/toast/useToastContext";
import { validateLoginForm } from "@/features/auth/utils";
import { Input, Button } from "@/shared/components";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "@/features/auth/constants/auth.constants";
import { SocialLogin } from "@/features/auth/components";

export const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoggingIn, error, clearError } = useAuth();
  const { showToast } = useToastContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const from =
    (location.state as { from?: Location })?.from?.pathname || "/dashboard";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear field error on change
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
    const validation = validateLoginForm(formData.email, formData.password);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    try {
      await login({
        email: formData.email.trim(),
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      showToast(SUCCESS_MESSAGES.LOGIN_SUCCESS, "success");
      navigate(from, { replace: true });
    } catch (err: unknown) {
      let errorMessage: string = ERROR_MESSAGES.INVALID_CREDENTIALS;

      if (err && typeof err === "object" && "data" in err) {
        const maybeErr = err as { data?: { message?: string } };
        if (maybeErr.data?.message) {
          errorMessage = maybeErr.data.message;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      showToast(errorMessage, "error");
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Sign in</h2>
        <p className="mt-2 text-sm text-gray-600">
          Or{" "}
          <a
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            create a new account
          </a>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={formErrors.password}
          required
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>
          <a
            href="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Forgot password?
          </a>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-800">{error}</div>
          </div>
        )}

        <Button type="submit" disabled={isLoggingIn} className="w-full">
          {isLoggingIn ? "Logging in..." : "Sign in"}
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
