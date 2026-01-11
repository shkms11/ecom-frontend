// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "ecom_access_token",
  REFRESH_TOKEN: "ecom_refresh_token",
  USER_DATA: "ecom_user_data",
  REMEMBER_ME: "ecom_remember_me",
} as const;

export const SESSION_KEYS = {
  ACCESS_TOKEN: "ecom_session_token",
  USER_DATA: "ecom_session_user",
} as const;

// API Endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/refresh",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  CHANGE_PASSWORD: "/auth/change-password",
  VERIFY_EMAIL: "/auth/verify-email",
  RESEND_VERIFICATION: "/auth/resend-verification",
  OAUTH_GOOGLE: "/auth/oauth/google",
  OAUTH_GITHUB: "/auth/oauth/github",
  OAUTH_CALLBACK: "/auth/oauth/callback",
  ME: "/auth/me",
  UPDATE_PROFILE: "/auth/profile",
} as const;

// Password Requirements
export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 128,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBER: true,
  REQUIRE_SPECIAL_CHAR: true,
  SPECIAL_CHARS: "!@#$%^&*()_+-=[]{}|;:,.<>?",
} as const;

// Password Strength UI Config
export const PASSWORD_STRENGTH_CONFIG = {
  VERY_WEAK: {
    score: 0,
    label: "Very Weak",
    color: "bg-red-500",
    textColor: "text-red-600",
  },
  WEAK: {
    score: 1,
    label: "Weak",
    color: "bg-orange-500",
    textColor: "text-orange-600",
  },
  FAIR: {
    score: 2,
    label: "Fair",
    color: "bg-yellow-500",
    textColor: "text-yellow-600",
  },
  GOOD: {
    score: 3,
    label: "Good",
    color: "bg-blue-500",
    textColor: "text-blue-600",
  },
  STRONG: {
    score: 4,
    label: "Strong",
    color: "bg-green-500",
    textColor: "text-green-600",
  },
  VERY_STRONG: {
    score: 5,
    label: "Very Strong",
    color: "bg-green-600",
    textColor: "text-green-700",
  },
} as const;

// Validation
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Token Expiration (in seconds)
export const TOKEN_EXPIRATION = {
  ACCESS_TOKEN: 15 * 60, // 15 minutes
  REFRESH_TOKEN: 7 * 24 * 60 * 60, // 7 days
  RESET_PASSWORD_TOKEN: 60 * 60, // 1 hour
  EMAIL_VERIFICATION_TOKEN: 24 * 60 * 60, // 24 hours
} as const;

// User Roles Configuration
export const USER_ROLES = {
  CUSTOMER: {
    value: "customer",
    label: "Customer",
    color: "bg-blue-100 text-blue-800",
    description: "Browse and purchase products",
  },
  SELLER: {
    value: "seller",
    label: "Seller",
    color: "bg-green-100 text-green-800",
    description: "Manage products and sales",
  },
  ADMIN: {
    value: "admin",
    label: "Administrator",
    color: "bg-purple-100 text-purple-800",
    description: "Full system access",
  },
} as const;

// Route Paths
export const ROUTE_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password/:token",
  VERIFY_EMAIL: "/verify-email/:token",
  DASHBOARD: "/dashboard",
  CUSTOMER_DASHBOARD: "/dashboard/customer",
  SELLER_DASHBOARD: "/dashboard/seller",
  ADMIN_DASHBOARD: "/dashboard/admin",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  UNAUTHORIZED: "/unauthorized",
} as const;

// Error Messages
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
  NETWORK_ERROR: "Network error. Please check your connection",
  SERVER_ERROR: "Server error. Please try again later",
  UNAUTHORIZED: "You are not authorized to access this resource",
  SESSION_EXPIRED: "Your session has expired. Please login again",
  EMAIL_ALREADY_EXISTS: "An account with this email already exists",
  TOKEN_EXPIRED: "Token has expired. Please request a new one",
  INVALID_TOKEN: "Invalid or expired token",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login successful!",
  REGISTER_SUCCESS: "Registration successful! Please verify your email",
  LOGOUT_SUCCESS: "Logged out successfully",
  PASSWORD_CHANGED: "Password changed successfully",
  PASSWORD_RESET_EMAIL_SENT: "Password reset link sent to your email",
  PASSWORD_RESET_SUCCESS: "Password reset successfully",
  EMAIL_VERIFIED: "Email verified successfully",
  VERIFICATION_EMAIL_SENT: "Verification email sent",
  PROFILE_UPDATED: "Profile updated successfully",
} as const;

// OAuth Providers
export const OAUTH_PROVIDERS = {
  GOOGLE: {
    name: "Google",
    icon: "google",
    color: "bg-white hover:bg-gray-50 border border-gray-300",
    textColor: "text-gray-700",
  },
  GITHUB: {
    name: "GitHub",
    icon: "github",
    color: "bg-gray-900 hover:bg-gray-800",
    textColor: "text-white",
  },
  FACEBOOK: {
    name: "Facebook",
    icon: "facebook",
    color: "bg-blue-600 hover:bg-blue-700",
    textColor: "text-white",
  },
} as const;

// Timing & Limits
export const VALIDATION_DEBOUNCE_TIME = 300; // ms
export const TOAST_DURATION = 4000; // ms
export const API_TIMEOUT = 30000; // ms
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in ms
