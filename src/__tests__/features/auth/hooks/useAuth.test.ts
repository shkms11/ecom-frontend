import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { useAuth } from '../../../../features/auth/hooks/useAuth';
import authReducer from '../../../../features/auth/slices/authSlice';
import { authApi } from '../../../../features/auth/api/authApi';
import { mockUser, mockTokens } from '../../../../../tests/fixtures/auth.fixtures';

const createWrapper = (preloadedState = {}) => {
  const store = configureStore({
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

  return ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  );
};

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should return initial state when not authenticated', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('should return user when authenticated', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper({
        user: mockUser,
        accessToken: mockTokens.accessToken,
        isAuthenticated: true,
      }),
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockUser);
  });

  it('should identify user roles correctly', () => {
    const { result: customerResult } = renderHook(() => useAuth(), {
      wrapper: createWrapper({
        user: { ...mockUser, role: 'customer' },
        isAuthenticated: true,
      }),
    });

    expect(customerResult.current.isCustomer).toBe(true);
    expect(customerResult.current.isSeller).toBe(false);
    expect(customerResult.current.isAdmin).toBe(false);

    const { result: sellerResult } = renderHook(() => useAuth(), {
      wrapper: createWrapper({
        user: { ...mockUser, role: 'seller' },
        isAuthenticated: true,
      }),
    });

    expect(sellerResult.current.isSeller).toBe(true);
    expect(sellerResult.current.isAdmin).toBe(false);
  });

  it('should provide loading states', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper({
        isLoading: true,
      }),
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('should provide error state', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper({
        error: 'Test error',
      }),
    });

    expect(result.current.error).toBe('Test error');
  });
});

