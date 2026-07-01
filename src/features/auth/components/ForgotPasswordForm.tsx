import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks";
import { useToastContext } from "@/providers/toast/useToastContext";

import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "@/features/auth/constants/auth.constants";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type ForgotPasswordFormValues = {
  email: string;
};

export function ForgotPasswordForm() {
  const { forgotPassword, isSendingResetLink } = useAuth();
  const { showToast } = useToastContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordFormValues) {
    try {
      await forgotPassword(data.email);

      showToast(SUCCESS_MESSAGES.RESET_LINK_SENT, "success");
    } catch (err: any) {
      showToast(
        err?.data?.message ?? err?.message ?? ERROR_MESSAGES.SERVER_ERROR,
        "error",
      );
    }
  }

  return (
    <Card className="w-full max-w-md border border-border shadow-none">
      {/* Header */}
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Forgot password
        </CardTitle>

        <CardDescription>
          Enter your email and we’ll send you a reset link.
        </CardDescription>

        <p className="text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link
            to="/auth/login"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            Sign in
          </Link>
        </p>
      </CardHeader>

      {/* Form */}
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              disabled={isSendingResetLink}
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

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            disabled={isSendingResetLink}
          >
            {isSendingResetLink ? "Sending reset link..." : "Send reset link"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
