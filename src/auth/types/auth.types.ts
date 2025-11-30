export type UserRole = "customer" | "admin" | "seller";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isEmailVerified: boolean;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

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
