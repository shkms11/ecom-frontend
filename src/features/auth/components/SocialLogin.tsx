import { useState, useEffect } from "react";
import { useToastContext } from "@/providers/toast/useToastContext";
import { Button } from "@/shared/components";
import { OAUTH_PROVIDERS } from "@/features/auth/constants/auth.constants";
import type { OAuthProvider } from "@/features/auth/types/auth.types";

export const SocialLogin = () => {
  const { showToast } = useToastContext();
  const [isLoading, setIsLoading] = useState<OAuthProvider | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const handleOAuthLogin = (provider: OAuthProvider) => {
    setIsLoading(provider);
    try {
      // Build OAuth URL
      const oauthUrl = `/api/v1/auth/oauth/${provider}`;
      setRedirectUrl(oauthUrl); // store in state instead of mutating window.location directly
    } catch {
      showToast(`Failed to login with ${provider}`, "error");
      setIsLoading(null);
    }
  };

  // Effect to perform redirect
  useEffect(() => {
    if (redirectUrl) {
      window.location.assign(redirectUrl); // safe way to redirect
    }
  }, [redirectUrl]);

  return (
    <div className="space-y-3">
      {Object.entries(OAUTH_PROVIDERS).map(([key, provider]) => {
        const providerKey = key.toLowerCase() as OAuthProvider;
        return (
          <Button
            key={key}
            type="button"
            variant="outline"
            onClick={() => handleOAuthLogin(providerKey)}
            disabled={isLoading !== null}
            className={`w-full ${provider.color} ${provider.textColor}`}
          >
            {isLoading === providerKey ? (
              <span className="flex items-center">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></span>
                Connecting...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <span className="mr-2">{provider.name}</span>
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
};
