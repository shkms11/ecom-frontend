import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAuth } from "@/features/auth/hooks";
import { useToastContext } from "@/providers/toast/useToastContext";

import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "@/features/auth/constants/auth.constants";

import { SocialLogin } from "@/features/auth/components";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type RegisterFormValues = {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
};

export function RegisterForm() {
  const navigate = useNavigate();

  const { register: signup, isRegistering } = useAuth();
  const { showToast } = useToastContext();

  const [showError, setShowError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  async function onSubmit(data: RegisterFormValues) {
    try {
      setShowError(null);

      if (data.password !== data.confirmPassword) {
        setShowError("Passwords do not match");
        return;
      }

      await signup({
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password,
        confirmPassword: data.confirmPassword,
        phone: data.phone?.trim() || undefined,
      });

      showToast(SUCCESS_MESSAGES.REGISTER_SUCCESS, "success");

      navigate("/auth/verify-email");
    } catch (err: any) {
      setShowError(
        err?.data?.message ?? err?.message ?? ERROR_MESSAGES.SERVER_ERROR,
      );
    }
  }

  return (
    <Card className="w-full max-w-md border border-border shadow-none">
      {/* Header */}
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Create account
        </CardTitle>

        <CardDescription>
          Join us and start shopping in seconds.
        </CardDescription>

        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            Sign in
          </Link>
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              autoComplete="name"
              disabled={isRegistering}
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              disabled={isRegistering}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+8801XXXXXXXXX"
              autoComplete="tel"
              disabled={isRegistering}
              {...register("phone")}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              disabled={isRegistering}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Min 8 characters required",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              disabled={isRegistering}
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Error */}
          {showError && (
            <div className="rounded-md border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
              {showError}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            disabled={isRegistering}
          >
            {isRegistering ? "Creating account..." : "Create account"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground uppercase">
            or continue with
          </span>
          <Separator className="flex-1" />
        </div>

        {/* Social */}
        <SocialLogin />
      </CardContent>
    </Card>
  );
}
