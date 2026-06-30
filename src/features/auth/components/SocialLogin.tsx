import { useState } from "react";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { useToastContext } from "@/providers/toast/useToastContext";

type OAuthProvider = "google" | "github";

const PROVIDERS = [
  {
    id: "google",
    label: "Continue with Google",
    icon: FcGoogle,
  },
  {
    id: "github",
    label: "Continue with GitHub",
    icon: FaGithub,
  },
] as const;

export function SocialLogin() {
  const { showToast } = useToastContext();

  const [loadingProvider, setLoadingProvider] = useState<OAuthProvider | null>(
    null,
  );

  const handleLogin = (provider: OAuthProvider) => {
    try {
      setLoadingProvider(provider);

      window.location.assign(`/api/v1/auth/oauth/${provider}`);
    } catch {
      setLoadingProvider(null);

      showToast(
        `Unable to continue with ${provider}. Please try again.`,
        "error",
      );
    }
  };

  return (
    <div className="grid gap-3">
      {PROVIDERS.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          type="button"
          variant="outline"
          className="h-11 justify-center gap-3"
          disabled={loadingProvider !== null}
          onClick={() => handleLogin(id)}
        >
          {loadingProvider === id ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Icon className="size-5" />
              {label}
            </>
          )}
        </Button>
      ))}
    </div>
  );
}
