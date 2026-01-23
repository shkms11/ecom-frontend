import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { ProtectedRoute } from "@/features/auth/guards";
import { ROUTE_PATHS } from "@/features/auth/constants/auth.constants";
import type { UserRole } from "@/features/auth/types/auth.types";

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  requireEmailVerification?: boolean;
}

export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  children,
  allowedRoles,
  requireEmailVerification = false,
}) => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <ProtectedRoute requireEmailVerification={requireEmailVerification}>
      {user && allowedRoles.includes(user.role) ? (
        <>{children}</>
      ) : (
        <Navigate
          to={ROUTE_PATHS.UNAUTHORIZED}
          state={{ from: location }}
          replace
        />
      )}
    </ProtectedRoute>
  );
};

