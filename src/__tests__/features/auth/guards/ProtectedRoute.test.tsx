import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ProtectedRoute } from '../../../../features/auth/guards/ProtectedRoute';
import authReducer from '../../../../features/auth/slices/authSlice';
import { authApi } from '../../../../features/auth/api/authApi';
import { mockUser, mockTokens } from '../../../../../tests/fixtures/auth.fixtures';
import { tokenService } from '../../../../features/auth/services/tokenService';

// Mock tokenService
vi.mock('../../../../features/auth/services/tokenService', () => ({
  tokenService: {
    getAccessToken: vi.fn(),
    getRefreshToken: vi.fn(),
    isTokenExpired: vi.fn(),
    isAuthenticated: vi.fn(),
  },
}));

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
    preloadedState: {
      auth: {
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        ...preloadedState,
      },
    },
  });
};

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render children when user is authenticated', () => {
    vi.mocked(tokenService.getAccessToken).mockReturnValue(mockTokens.accessToken);
    vi.mocked(tokenService.isTokenExpired).mockReturnValue(false);

    const store = createTestStore({
      user: mockUser,
      accessToken: mockTokens.accessToken,
      isAuthenticated: true,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should redirect to login when user is not authenticated', () => {
    vi.mocked(tokenService.getAccessToken).mockReturnValue(null);

    const store = createTestStore({
      isAuthenticated: false,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/protected']}>
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        </MemoryRouter>
      </Provider>
    );

    // Should redirect to login
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should redirect to verify email when email not verified and required', () => {
    vi.mocked(tokenService.getAccessToken).mockReturnValue(mockTokens.accessToken);
    vi.mocked(tokenService.isTokenExpired).mockReturnValue(false);

    const store = createTestStore({
      user: { ...mockUser, isEmailVerified: false },
      accessToken: mockTokens.accessToken,
      isAuthenticated: true,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProtectedRoute requireEmailVerification={true}>
            <div>Protected Content</div>
          </ProtectedRoute>
        </MemoryRouter>
      </Provider>
    );

    // Should redirect to verify email page
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});

