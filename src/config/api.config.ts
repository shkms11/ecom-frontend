// API Base Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const API_VERSION = "v1";
export const API_URL = `${API_BASE_URL}/${API_VERSION}`;

// Timing Configuration
export const API_TIMEOUT = 30000; // 30 seconds

// Retry Configuration
export const API_RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  retryableStatuses: [408, 429, 500, 502, 503, 504],
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    CHANGE_PASSWORD: "/auth/change-password",
    VERIFY_EMAIL: "/auth/verify-email",
    RESEND_VERIFICATION: "/auth/resend-verification",
    ME: "/auth/me",
    PROFILE: "/auth/profile",
  },

  OAUTH: {
    GOOGLE: "/auth/oauth/google",
    GITHUB: "/auth/oauth/github",
    FACEBOOK: "/auth/oauth/facebook",
    CALLBACK: "/auth/oauth/callback",
  },

  USERS: {
    LIST: "/users",
    GET: (id: string) => `/users/${id}`,
    CREATE: "/users",
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },

  PRODUCTS: {
    LIST: "/products",
    GET: (id: string) => `/products/${id}`,
    CREATE: "/products",
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
  },

  ORDERS: {
    LIST: "/orders",
    GET: (id: string) => `/orders/${id}`,
    CREATE: "/orders",
    UPDATE: (id: string) => `/orders/${id}`,
    CANCEL: (id: string) => `/orders/${id}/cancel`,
  },
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Request Headers
export const REQUEST_HEADERS = {
  CONTENT_TYPE: "Content-Type",
  AUTHORIZATION: "Authorization",
  ACCEPT: "Accept",
  X_REQUESTED_WITH: "X-Requested-With",
} as const;

// Content Types
export const CONTENT_TYPES = {
  JSON: "application/json",
  FORM_DATA: "multipart/form-data",
  URL_ENCODED: "application/x-www-form-urlencoded",
} as const;

// OAuth Configuration
export const OAUTH_CONFIG = {
  GOOGLE: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
    redirectUri: `${window.location.origin}/auth/callback/google`,
    scope: "openid profile email",
  },
  GITHUB: {
    clientId: import.meta.env.VITE_GITHUB_CLIENT_ID || "",
    redirectUri: `${window.location.origin}/auth/callback/github`,
    scope: "read:user user:email",
  },
  FACEBOOK: {
    clientId: import.meta.env.VITE_FACEBOOK_CLIENT_ID || "",
    redirectUri: `${window.location.origin}/auth/callback/facebook`,
    scope: "email public_profile",
  },
} as const;

// Environment
export const IS_PRODUCTION = import.meta.env.MODE === "production";
export const IS_DEVELOPMENT = import.meta.env.MODE === "development";

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_OAUTH: true,
  ENABLE_TWO_FACTOR: false,
  ENABLE_SOCIAL_LOGIN: true,
  ENABLE_EMAIL_VERIFICATION: true,
  ENABLE_PASSWORD_RESET: true,
} as const;
