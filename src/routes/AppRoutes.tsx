import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/features/auth/constants/auth.constants";
import { ProtectedRoute, RoleBasedRoute } from "@/features/auth/guards";
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyEmailPage,
} from "@/pages/auth";
import { CustomerDashboard } from "@/pages/dashboard/CustomerDashboard";
import { SellerDashboard } from "@/pages/dashboard/SellerDashboard";
import { AdminDashboard } from "@/pages/dashboard/AdminDashboard";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import { UnauthorizedPage } from "@/pages/UnauthorizedPage";
import { Layout } from "@/layouts";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Wrap all main pages with Layout */}
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path={ROUTE_PATHS.HOME} element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
        <Route path={ROUTE_PATHS.REGISTER} element={<RegisterPage />} />
        <Route
          path={ROUTE_PATHS.FORGOT_PASSWORD}
          element={<ForgotPasswordPage />}
        />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />

        {/* Protected Routes */}
        <Route
          path={ROUTE_PATHS.DASHBOARD}
          element={
            <ProtectedRoute>
              <Navigate to={ROUTE_PATHS.CUSTOMER_DASHBOARD} replace />
            </ProtectedRoute>
          }
        />

        {/* Role-Based Routes */}
        <Route
          path={ROUTE_PATHS.CUSTOMER_DASHBOARD}
          element={
            <RoleBasedRoute allowedRoles={["customer"]}>
              <CustomerDashboard />
            </RoleBasedRoute>
          }
        />

        <Route
          path={ROUTE_PATHS.SELLER_DASHBOARD}
          element={
            <RoleBasedRoute allowedRoles={["seller"]}>
              <SellerDashboard />
            </RoleBasedRoute>
          }
        />

        <Route
          path={ROUTE_PATHS.ADMIN_DASHBOARD}
          element={
            <RoleBasedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </RoleBasedRoute>
          }
        />

        {/* Unauthorized */}
        <Route path={ROUTE_PATHS.UNAUTHORIZED} element={<UnauthorizedPage />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to={ROUTE_PATHS.HOME} replace />} />
      </Route>
    </Routes>
  );
};
