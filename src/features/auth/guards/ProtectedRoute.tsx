import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { tokenService } from "@/features/auth/services/tokenService";
import { ROUTE_PATHS } from "@/features/auth/constants/auth.constants";
import { Loader } from "@/shared/components";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireEmailVerification?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireEmailVerification = false,
}) => {
  const location = useLocation();
  const { isAuthenticated, user, isLoading } = useAppSelector(
    (state) => state.auth,
  );
  const accessToken = tokenService.getAccessToken();

  // Show loader while checking authentication
  if (isLoading) {
    return <Loader />;
  }

  // Check if token exists and is valid
  if (!accessToken || !isAuthenticated) {
    // Store the attempted location for redirect after login
    return (
      <Navigate
        to={ROUTE_PATHS.LOGIN}
        state={{ from: location }}
        replace
      />
    );
  }

  // Check if token is expired
  if (tokenService.isTokenExpired(accessToken)) {
    // Try to refresh token
    const refreshToken = tokenService.getRefreshToken();
    if (!refreshToken) {
      return (
        <Navigate
          to={ROUTE_PATHS.LOGIN}
          state={{ from: location }}
          replace
        />
      );
    }
    // Token refresh will be handled by RTK Query interceptor
    // For now, show loader while refresh happens
    return <Loader />;
  }

  // Check email verification requirement
  if (requireEmailVerification && user && !user.isEmailVerified) {
    return (
      <Navigate
        to={ROUTE_PATHS.VERIFY_EMAIL}
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
};

