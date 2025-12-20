import { STORAGE_KEYS, SESSION_KEYS } from "../constants/auth.constants";
import type { User } from "../types/auth.types";

class TokenService {
  // Token Management
  setTokens(
    accessToken: string,
    refreshToken?: string,
    rememberMe: boolean = false,
  ): void {
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, "true");

      if (refreshToken) {
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      }
    } else {
      sessionStorage.setItem(SESSION_KEYS.ACCESS_TOKEN, accessToken);
      localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
    }
  }

  getAccessToken(): string | null {
    return (
      localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) ||
      sessionStorage.getItem(SESSION_KEYS.ACCESS_TOKEN)
    );
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  // User Data Management
  setUser(user: User, rememberMe: boolean = false): void {
    const userData = JSON.stringify(user);

    if (rememberMe) {
      localStorage.setItem(STORAGE_KEYS.USER_DATA, userData);
    } else {
      sessionStorage.setItem(SESSION_KEYS.USER_DATA, userData);
    }
  }

  getUser(): User | null {
    const userData =
      localStorage.getItem(STORAGE_KEYS.USER_DATA) ||
      sessionStorage.getItem(SESSION_KEYS.USER_DATA);

    if (userData) {
      try {
        return JSON.parse(userData) as User;
      } catch {
        console.error("Error parsing user data");
        return null;
      }
    }

    return null;
  }

  updateUser(user: Partial<User>): void {
    const currentUser = this.getUser();

    if (currentUser) {
      const updatedUser = { ...currentUser, ...user };
      const isRemembered = this.isRememberMe();
      this.setUser(updatedUser, isRemembered);
    }
  }

  // Cleanup
  clearTokens(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);

    sessionStorage.removeItem(SESSION_KEYS.ACCESS_TOKEN);
    sessionStorage.removeItem(SESSION_KEYS.USER_DATA);
  }

  // Authentication Check
  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }

  isRememberMe(): boolean {
    return localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === "true";
  }

  // JWT Token Utilities
  decodeToken(token: string): Record<string, unknown> | null {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );

      return JSON.parse(jsonPayload);
    } catch {
      console.error("Error decoding token");
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = this.decodeToken(token);

      if (!decoded || !decoded.exp) {
        return true;
      }

      const currentTime = Date.now() / 1000;
      return (decoded.exp as number) < currentTime;
    } catch {
      return true;
    }
  }

  getTokenExpiration(token: string): Date | null {
    try {
      const decoded = this.decodeToken(token);

      if (!decoded || !decoded.exp) {
        return null;
      }

      return new Date((decoded.exp as number) * 1000);
    } catch {
      return null;
    }
  }

  getTimeUntilExpiry(token: string): number {
    try {
      const decoded = this.decodeToken(token);

      if (!decoded || !decoded.exp) {
        return 0;
      }

      const currentTime = Date.now() / 1000;
      const timeRemaining = (decoded.exp as number) - currentTime;

      return Math.max(0, Math.floor(timeRemaining));
    } catch {
      return 0;
    }
  }

  // Token Refresh Scheduling
  scheduleTokenRefresh(refreshCallback: () => void): NodeJS.Timeout | null {
    const token = this.getAccessToken();

    if (!token) {
      return null;
    }

    const timeUntilExpiry = this.getTimeUntilExpiry(token);

    // Refresh 1 minute before expiration
    const refreshTime = Math.max(0, (timeUntilExpiry - 60) * 1000);

    if (refreshTime > 0) {
      return setTimeout(() => {
        refreshCallback();
      }, refreshTime);
    }

    return null;
  }

  // CSRF Token Management
  setCSRFToken(token: string): void {
    sessionStorage.setItem("csrf_token", token);
  }

  getCSRFToken(): string | null {
    return sessionStorage.getItem("csrf_token");
  }

  clearCSRFToken(): void {
    sessionStorage.removeItem("csrf_token");
  }
}

export const tokenService = new TokenService();
