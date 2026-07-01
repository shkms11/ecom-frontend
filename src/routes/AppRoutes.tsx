import { Routes, Route, Navigate } from "react-router-dom";

import { ROUTE_PATHS } from "@/features/auth/constants/auth.constants";
import { ProtectedRoute, RoleBasedRoute } from "@/features/auth/guards";

import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  AuthLandingPage,
} from "@/features/auth/pages";

import { CustomerDashboard } from "@/pages/dashboard/CustomerDashboard";
import { SellerDashboard } from "@/pages/dashboard/SellerDashboard";
import { AdminDashboard } from "@/pages/dashboard/AdminDashboard";

import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetailPage from "@/features/products/pages/ProductDetailsPage";

import { UnauthorizedPage } from "@/pages/UnauthorizedPage";
import { Layout } from "@/layouts";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public */}
        <Route path={ROUTE_PATHS.HOME} element={<Home />} />

        {/* Shop */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:productId" element={<ProductDetailPage />} />

        {/* ================= AUTH ================= */}

        {/* /auth */}
        <Route path="/auth" element={<AuthLandingPage />} />

        {/* /auth/login */}
        <Route path="/auth/login" element={<LoginPage />} />

        {/* /auth/register */}
        <Route path="/auth/register" element={<RegisterPage />} />

        {/* /auth/forgot-password */}
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

        {/* /auth/reset-password/:token */}

        {/* 
        <Route
          path="/auth/reset-password/:token"
          element={<ResetPasswordPage />}
        />
        */}

        {/* /auth/verify-email/:token */}
        {/* 
        <Route path="/auth/verify-email/:token" element={<VerifyEmailPage />} />
        */}

        {/* ============== DASHBOARD ============== */}

        <Route
          path={ROUTE_PATHS.DASHBOARD}
          element={
            <ProtectedRoute>
              <Navigate to={ROUTE_PATHS.CUSTOMER_DASHBOARD} replace />
            </ProtectedRoute>
          }
        />

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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
