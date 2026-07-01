import { describe, it, expect, beforeEach, vi } from 'vitest';
import { tokenService } from '../../../../features/auth/services/tokenService';
import { STORAGE_KEYS, SESSION_KEYS } from '../../../../features/auth/constants/auth.constants';
import { mockUser, mockTokens } from '../../../../../tests/fixtures/auth.fixtures';

describe('TokenService', () => {
  beforeEach(() => {
    // Clear all storage before each test
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('Token Management', () => {
    it('should set tokens in localStorage when rememberMe is true', () => {
      tokenService.setTokens(mockTokens.accessToken, mockTokens.refreshToken, true);

      expect(localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)).toBe(mockTokens.accessToken);
      expect(localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)).toBe(mockTokens.refreshToken);
      expect(localStorage.getItem(STORAGE_KEYS.REMEMBER_ME)).toBe('true');
    });

    it('should set tokens in sessionStorage when rememberMe is false', () => {
      tokenService.setTokens(mockTokens.accessToken, undefined, false);

      expect(sessionStorage.getItem(SESSION_KEYS.ACCESS_TOKEN)).toBe(mockTokens.accessToken);
      expect(localStorage.getItem(STORAGE_KEYS.REMEMBER_ME)).toBeNull();
    });

    it('should get access token from localStorage first', () => {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, 'local-token');
      sessionStorage.setItem(SESSION_KEYS.ACCESS_TOKEN, 'session-token');

      expect(tokenService.getAccessToken()).toBe('local-token');
    });

    it('should get access token from sessionStorage if not in localStorage', () => {
      sessionStorage.setItem(SESSION_KEYS.ACCESS_TOKEN, 'session-token');

      expect(tokenService.getAccessToken()).toBe('session-token');
    });

    it('should return null if no access token exists', () => {
      expect(tokenService.getAccessToken()).toBeNull();
    });

    it('should get refresh token from localStorage', () => {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, mockTokens.refreshToken);

      expect(tokenService.getRefreshToken()).toBe(mockTokens.refreshToken);
    });

    it('should clear all tokens', () => {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, 'token');
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, 'refresh');
      sessionStorage.setItem(SESSION_KEYS.ACCESS_TOKEN, 'session-token');

      tokenService.clearTokens();

      expect(localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)).toBeNull();
      expect(localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)).toBeNull();
      expect(sessionStorage.getItem(SESSION_KEYS.ACCESS_TOKEN)).toBeNull();
    });
  });

  describe('User Data Management', () => {
    it('should set user in localStorage when rememberMe is true', () => {
      tokenService.setUser(mockUser, true);

      const stored = localStorage.getItem(STORAGE_KEYS.USER_DATA);
      expect(stored).toBeTruthy();
      expect(JSON.parse(stored!)).toEqual(mockUser);
    });

    it('should set user in sessionStorage when rememberMe is false', () => {
      tokenService.setUser(mockUser, false);

      const stored = sessionStorage.getItem(SESSION_KEYS.USER_DATA);
      expect(stored).toBeTruthy();
      expect(JSON.parse(stored!)).toEqual(mockUser);
    });

    it('should get user from localStorage first', () => {
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser));

      expect(tokenService.getUser()).toEqual(mockUser);
    });

    it('should get user from sessionStorage if not in localStorage', () => {
      sessionStorage.setItem(SESSION_KEYS.USER_DATA, JSON.stringify(mockUser));

      expect(tokenService.getUser()).toEqual(mockUser);
    });

    it('should return null if no user data exists', () => {
      expect(tokenService.getUser()).toBeNull();
    });

    it('should update user data', () => {
      tokenService.setUser(mockUser, true);
      tokenService.updateUser({ name: 'Updated Name' });

      const updated = tokenService.getUser();
      expect(updated?.name).toBe('Updated Name');
      expect(updated?.email).toBe(mockUser.email);
    });
  });

  describe('Authentication Check', () => {
    it('should return true if access token exists', () => {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, 'token');
      expect(tokenService.isAuthenticated()).toBe(true);
    });

    it('should return false if no access token exists', () => {
      expect(tokenService.isAuthenticated()).toBe(false);
    });

    it('should return true if rememberMe is set', () => {
      localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true');
      expect(tokenService.isRememberMe()).toBe(true);
    });

    it('should return false if rememberMe is not set', () => {
      expect(tokenService.isRememberMe()).toBe(false);
    });
  });

  describe('JWT Token Utilities', () => {
    it('should decode a valid JWT token', () => {
      const payload = { sub: '123', exp: Date.now() / 1000 + 3600 };
      const token = `header.${btoa(JSON.stringify(payload))}.signature`;
      
      const decoded = tokenService.decodeToken(token);
      expect(decoded).toEqual(payload);
    });

    it('should return null for invalid token', () => {
      const decoded = tokenService.decodeToken('invalid-token');
      expect(decoded).toBeNull();
    });

    it('should detect expired token', () => {
      const expiredPayload = { exp: Math.floor(Date.now() / 1000) - 3600 };
      const token = `header.${btoa(JSON.stringify(expiredPayload))}.signature`;
      
      expect(tokenService.isTokenExpired(token)).toBe(true);
    });

    it('should detect valid token', () => {
      const validPayload = { exp: Math.floor(Date.now() / 1000) + 3600 };
      const token = `header.${btoa(JSON.stringify(validPayload))}.signature`;
      
      expect(tokenService.isTokenExpired(token)).toBe(false);
    });

    it('should get token expiration date', () => {
      const exp = Math.floor(Date.now() / 1000) + 3600;
      const payload = { exp };
      const token = `header.${btoa(JSON.stringify(payload))}.signature`;
      
      const expiration = tokenService.getTokenExpiration(token);
      expect(expiration).toBeInstanceOf(Date);
      expect(Math.floor(expiration!.getTime() / 1000)).toBe(exp);
    });

    it('should calculate time until expiry', () => {
      const exp = Math.floor(Date.now() / 1000) + 3600;
      const payload = { exp };
      const token = `header.${btoa(JSON.stringify(payload))}.signature`;
      
      const timeRemaining = tokenService.getTimeUntilExpiry(token);
      expect(timeRemaining).toBeGreaterThan(0);
      expect(timeRemaining).toBeLessThanOrEqual(3600);
    });
  });

  describe('CSRF Token Management', () => {
    it('should set and get CSRF token', () => {
      tokenService.setCSRFToken('csrf-token-123');
      expect(tokenService.getCSRFToken()).toBe('csrf-token-123');
    });

    it('should clear CSRF token', () => {
      tokenService.setCSRFToken('csrf-token-123');
      tokenService.clearCSRFToken();
      expect(tokenService.getCSRFToken()).toBeNull();
    });
  });
});

