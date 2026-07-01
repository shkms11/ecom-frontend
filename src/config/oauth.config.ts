export const OAUTH_CONFIG = {
  GOOGLE: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
    redirectUri: `${window.location.origin}/auth/callback/google`,
    scope: "openid profile email",
  },
  ...
} as const;
