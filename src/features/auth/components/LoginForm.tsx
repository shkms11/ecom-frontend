import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, isLoggingIn } = useAuth();
  const { showToast } = useToastContext();

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ??
    "/dashboard";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMe = watch("rememberMe");

  async function onSubmit(data: LoginFormValues) {
    try {
      await login(data);

      showToast(SUCCESS_MESSAGES.LOGIN_SUCCESS, "success");

      navigate(from, {
        replace: true,
      });
    } catch (err: any) {
      showToast(
        err?.data?.message ??
          err?.message ??
          ERROR_MESSAGES.INVALID_CREDENTIALS,
        "error",
      );
    }
  }

  return (
    <Card className="w-full max-w-md border-border shadow-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl font-semibold tracking-tight">
          Welcome back
        </CardTitle>

        <CardDescription>Sign in to continue to your account.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
              })}
            />

            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) =>
                  setValue("rememberMe", Boolean(checked))
                }
              />

              <Label htmlFor="remember" className="cursor-pointer">
                Remember me
              </Label>
            </div>

            <Link
              to="/forgot-password"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            {isLoggingIn ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>

          <div className="relative flex justify-center">
            <span className="bg-background px-3 text-xs uppercase tracking-wider text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <SocialLogin />

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-foreground transition-colors hover:text-primary"
          >
            Create account
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
