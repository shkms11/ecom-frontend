// ==============================
// Storage
// ==============================

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "ecom_access_token",
  REFRESH_TOKEN: "ecom_refresh_token",
  USER: "ecom_user",
  REMEMBER_ME: "ecom_remember_me",
} as const;

export const SESSION_KEYS = {
  ACCESS_TOKEN: "ecom_session_token",
  USER: "ecom_session_user",
} as const;

// ==============================
// Routes
// ==============================

export const ROUTE_PATHS = {
  HOME: "/",

  LOGIN: "/login",

  REGISTER: "/register",

  FORGOT_PASSWORD: "/forgot-password",

  RESET_PASSWORD: "/reset-password/:token",

  VERIFY_EMAIL: "/verify-email/:token",

  DASHBOARD: "/dashboard",

  PROFILE: "/profile",

  SETTINGS: "/settings",

  UNAUTHORIZED: "/unauthorized",
} as const;

// ==============================
// API Endpoints
// ==============================

export const AUTH_ENDPOINTS = {
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

  UPDATE_PROFILE: "/auth/profile",

  OAUTH_GOOGLE: "/auth/oauth/google",

  OAUTH_GITHUB: "/auth/oauth/github",
} as const;

// ==============================
// Validation
// ==============================

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,

  MAX_LENGTH: 128,

  REQUIRE_UPPERCASE: true,

  REQUIRE_LOWERCASE: true,

  REQUIRE_NUMBER: true,

  REQUIRE_SPECIAL_CHAR: true,
} as const;

// ==============================
// User Roles
// ==============================

export const USER_ROLES = {
  CUSTOMER: {
    value: "customer",
    label: "Customer",
  },

  SELLER: {
    value: "seller",
    label: "Seller",
  },

  ADMIN: {
    value: "admin",
    label: "Administrator",
  },
} as const;

// ==============================
// OAuth
// ==============================

export const OAUTH_PROVIDERS = {
  GOOGLE: {
    id: "google",
    label: "Continue with Google",
  },

  GITHUB: {
    id: "github",
    label: "Continue with GitHub",
  },
} as const;

// ==============================
// Messages
// ==============================

export const ERROR_MESSAGES = {
  INVALID_EMAIL: "Please enter a valid email address",

  EMAIL_REQUIRED: "Email is required",

  PASSWORD_REQUIRED: "Password is required",

  PASSWORD_TOO_SHORT: `Password must be at least ${PASSWORD_REQUIREMENTS.MIN_LENGTH} characters`,

  PASSWORD_TOO_LONG: `Password must not exceed ${PASSWORD_REQUIREMENTS.MAX_LENGTH} characters`,

  PASSWORD_UPPERCASE: "Password must contain at least one uppercase letter",

  PASSWORD_LOWERCASE: "Password must contain at least one lowercase letter",

  PASSWORD_NUMBER: "Password must contain at least one number",

  PASSWORD_SPECIAL: "Password must contain at least one special character",

  PASSWORD_MISMATCH: "Passwords do not match",

  NAME_REQUIRED: "Name is required",

  INVALID_CREDENTIALS: "Invalid email or password",

  NETWORK_ERROR: "Network error. Please check your connection.",

  SERVER_ERROR: "Something went wrong. Please try again.",

  UNAUTHORIZED: "You are not authorized to access this resource.",

  SESSION_EXPIRED: "Your session has expired. Please sign in again.",

  EMAIL_ALREADY_EXISTS: "An account with this email already exists.",

  TOKEN_EXPIRED: "This link has expired.",

  INVALID_TOKEN: "Invalid or expired token.",
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Signed in successfully.",

  REGISTER_SUCCESS: "Account created successfully.",

  LOGOUT_SUCCESS: "Signed out successfully.",

  PASSWORD_CHANGED: "Password changed successfully.",

  PASSWORD_RESET_EMAIL_SENT: "Password reset email sent.",

  PASSWORD_RESET_SUCCESS: "Password reset successfully.",

  EMAIL_VERIFIED: "Email verified successfully.",

  VERIFICATION_EMAIL_SENT: "Verification email sent.",

  PROFILE_UPDATED: "Profile updated successfully.",
} as const;

// ==============================
// App Config
// ==============================

export const AUTH_CONFIG = {
  API_TIMEOUT: 30_000,

  TOAST_DURATION: 4_000,

  MAX_LOGIN_ATTEMPTS: 5,
} as const;
