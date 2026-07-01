import { RegisterForm } from "../components/RegisterForm";
import { AuthLayout } from "@/layouts/AuthLayout";

export const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};
