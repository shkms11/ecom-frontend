// User & Role Types
export type UserRole = "customer" | "admin" | "seller";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isEmailVerified: boolean;
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

// Auth State
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Authentication Request Types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: UserRole;
  phone?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// API Response Types
export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken?: string;
  };
}

export interface RefreshApiResponse {
  success: boolean;
  data: RefreshTokenResponse;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// OAuth Types
export type OAuthProvider = "google" | "github" | "facebook";

export interface OAuthCallbackData {
  provider: OAuthProvider;
  code: string;
  state?: string;
}

// Email Verification
export interface EmailVerificationData {
  token: string;
}

// Password Strength
export type PasswordStrengthLevel = 0 | 1 | 2 | 3 | 4 | 5;

export const PasswordStrengthLevels = {
  VERY_WEAK: 0,
  WEAK: 1,
  FAIR: 2,
  GOOD: 3,
  STRONG: 4,
  VERY_STRONG: 5,
} as const;

export interface PasswordStrength {
  score: PasswordStrengthLevel;
  feedback: string;
  color: string;
  suggestions: string[];
}

// Validation Types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: ValidationError[];
  statusCode: number;
}

// Permissions
export interface UserPermissions {
  canViewProducts: boolean;
  canManageProducts: boolean;
  canViewOrders: boolean;
  canManageOrders: boolean;
  canViewUsers: boolean;
  canManageUsers: boolean;
  canViewAnalytics: boolean;
  canManageSettings: boolean;
}

// Session Management
export interface SessionInfo {
  device: string;
  browser: string;
  ip: string;
  lastActive: string;
  isCurrentSession: boolean;
}

// Two-Factor Authentication (future implementation)
export interface TwoFactorAuth {
  enabled: boolean;
  method: "sms" | "email" | "authenticator";
  verified: boolean;
}

// Profile Update
export interface UpdateProfileData {
  name?: string;
  phone?: string;
  avatar?: string;
}

// Redux Action Types
export const AuthActionTypes = {
  LOGIN_REQUEST: "auth/loginRequest",
  LOGIN_SUCCESS: "auth/loginSuccess",
  LOGIN_FAILURE: "auth/loginFailure",
  LOGOUT: "auth/logout",
  REGISTER_REQUEST: "auth/registerRequest",
  REGISTER_SUCCESS: "auth/registerSuccess",
  REGISTER_FAILURE: "auth/registerFailure",
  REFRESH_TOKEN: "auth/refreshToken",
  UPDATE_USER: "auth/updateUser",
} as const;
