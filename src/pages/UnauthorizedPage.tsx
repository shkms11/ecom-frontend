import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/shared/components";
import { ROUTE_PATHS } from "@/features/auth/constants/auth.constants";

export const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || ROUTE_PATHS.HOME;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-6xl font-bold text-gray-900">403</h1>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Access Denied
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            You don't have permission to access this resource.
          </p>
        </div>
        <div className="space-y-4">
          <Button
            onClick={() => navigate(from)}
            className="w-full"
          >
            Go Back
          </Button>
          <Button
            onClick={() => navigate(ROUTE_PATHS.HOME)}
            variant="outline"
            className="w-full"
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

