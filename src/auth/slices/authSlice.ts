import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // Remove 'type' from createSlice
import type { AuthState, User } from "../types/auth.types";
import { tokenService } from "../services/tokenService";

// Initial state
const initialState: AuthState = {
  user: tokenService.getUser(),
  accessToken: tokenService.getAccessToken(),
  refreshToken: tokenService.getRefreshToken(),
  isAuthenticated: tokenService.isAuthenticated(),
  isLoading: false,
  error: null,
};

// Auth slice (simplified for RTK Query)
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken?: string;
      }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken || null;
      state.isAuthenticated = true;
      state.error = null;
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setCredentials, setUser, logout, setError, clearError } =
  authSlice.actions;
export default authSlice.reducer;
