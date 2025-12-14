import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { API_URL } from "../../config/api.config";
import { AUTH_ENDPOINTS } from "../constants/auth.constants";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  ForgotPasswordRequest,
  ResetPasswordData,
  ChangePasswordData,
  User,
  RefreshTokenResponse,
  EmailVerificationData,
  RefreshApiResponse,
} from "../types/auth.types";
import { tokenService } from "../services/tokenService";
import { setCredentials, logout as logoutAction } from "../slices/authSlice";
import type { RootState } from "../../app/store";

// Base query with auth token
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).auth.accessToken ||
      tokenService.getAccessToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const csrfToken = tokenService.getCSRFToken();
    if (csrfToken) {
      headers.set("X-CSRF-Token", csrfToken);
    }

    return headers;
  },
});

// Base query with automatic token refresh
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If unauthorized, try to refresh token
  if (result.error && result.error.status === 401) {
    const refreshToken = tokenService.getRefreshToken();

    if (refreshToken) {
      // Try to refresh token
      const refreshResult = await baseQuery(
        {
          url: AUTH_ENDPOINTS.REFRESH_TOKEN,
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const refreshResponse = refreshResult.data as RefreshApiResponse;
        const { accessToken, refreshToken: newRefreshToken } =
          refreshResponse.data;

        // Update tokens in storage
        tokenService.setTokens(accessToken, newRefreshToken);

        // Update Redux state
        const user = tokenService.getUser();
        if (user) {
          api.dispatch(
            setCredentials({
              user,
              accessToken,
              refreshToken: newRefreshToken,
            }),
          );
        }

        // Retry the original query
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed, logout user
        api.dispatch(logoutAction());
        tokenService.clearTokens();
        window.location.href = "/login";
      }
    } else {
      // No refresh token, logout user
      api.dispatch(logoutAction());
      tokenService.clearTokens();
      window.location.href = "/login";
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Auth"],
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: AUTH_ENDPOINTS.LOGIN,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User", "Auth"],
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { user, accessToken, refreshToken } = data.data;

          // Save to storage
          tokenService.setTokens(
            accessToken,
            refreshToken,
            credentials.rememberMe || false,
          );
          tokenService.setUser(user, credentials.rememberMe || false);

          // Update Redux state
          dispatch(setCredentials({ user, accessToken, refreshToken }));
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),

    // Register
    register: builder.mutation<AuthResponse, RegisterData>({
      query: (data) => ({
        url: AUTH_ENDPOINTS.REGISTER,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User", "Auth"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { user, accessToken, refreshToken } = data.data;

          // Save to storage
          tokenService.setTokens(accessToken, refreshToken);
          tokenService.setUser(user);

          // Update Redux state
          dispatch(setCredentials({ user, accessToken, refreshToken }));
        } catch (error) {
          console.error("Registration failed:", error);
        }
      },
    }),

    // Logout
    logout: builder.mutation<void, void>({
      query: () => ({
        url: AUTH_ENDPOINTS.LOGOUT,
        method: "POST",
      }),
      invalidatesTags: ["User", "Auth"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Logout request failed:", error);
        } finally {
          // Clear storage and Redux state regardless of API response
          tokenService.clearTokens();
          dispatch(logoutAction());
        }
      },
    }),

    // Get Current User
    getCurrentUser: builder.query<User, void>({
      query: () => AUTH_ENDPOINTS.ME,
      providesTags: ["User"],
      transformResponse: (response: { success: boolean; data: User }) =>
        response.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          tokenService.updateUser(data);

          // Update Redux state with fresh user data
          const state = tokenService.getAccessToken();
          if (state) {
            dispatch(
              setCredentials({
                user: data,
                accessToken: state,
                refreshToken: tokenService.getRefreshToken() || undefined,
              }),
            );
          }
        } catch (error) {
          console.error("Failed to get user:", error);
        }
      },
    }),

    // Update Profile
    updateProfile: builder.mutation<User, Partial<User>>({
      query: (data) => ({
        url: AUTH_ENDPOINTS.UPDATE_PROFILE,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
      transformResponse: (response: { success: boolean; data: User }) =>
        response.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          tokenService.updateUser(data);

          // Update Redux state
          const accessToken = tokenService.getAccessToken();
          if (accessToken) {
            dispatch(
              setCredentials({
                user: data,
                accessToken,
                refreshToken: tokenService.getRefreshToken() || undefined,
              }),
            );
          }
        } catch (error) {
          console.error("Failed to update profile:", error);
        }
      },
    }),

    // Forgot Password
    forgotPassword: builder.mutation<
      { message: string },
      ForgotPasswordRequest
    >({
      query: (data) => ({
        url: AUTH_ENDPOINTS.FORGOT_PASSWORD,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: { success: boolean; message: string }) => ({
        message: response.message,
      }),
    }),

    // Reset Password
    resetPassword: builder.mutation<{ message: string }, ResetPasswordData>({
      query: (data) => ({
        url: AUTH_ENDPOINTS.RESET_PASSWORD,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: { success: boolean; message: string }) => ({
        message: response.message,
      }),
    }),

    // Change Password
    changePassword: builder.mutation<{ message: string }, ChangePasswordData>({
      query: (data) => ({
        url: AUTH_ENDPOINTS.CHANGE_PASSWORD,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
      transformResponse: (response: { success: boolean; message: string }) => ({
        message: response.message,
      }),
    }),

    // Verify Email
    verifyEmail: builder.mutation<{ message: string }, EmailVerificationData>({
      query: (data) => ({
        url: AUTH_ENDPOINTS.VERIFY_EMAIL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
      transformResponse: (response: { success: boolean; message: string }) => ({
        message: response.message,
      }),
    }),

    // Resend Verification Email
    resendVerificationEmail: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: AUTH_ENDPOINTS.RESEND_VERIFICATION,
        method: "POST",
      }),
      transformResponse: (response: { success: boolean; message: string }) => ({
        message: response.message,
      }),
    }),

    // Refresh Token
    refreshToken: builder.mutation<
      RefreshTokenResponse,
      { refreshToken: string }
    >({
      query: (data) => ({
        url: AUTH_ENDPOINTS.REFRESH_TOKEN,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: {
        success: boolean;
        data: RefreshTokenResponse;
      }) => response.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          tokenService.setTokens(data.accessToken, data.refreshToken);

          // Update Redux state
          const user = tokenService.getUser();
          if (user) {
            dispatch(
              setCredentials({
                user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
              }),
            );
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
        }
      },
    }),
  }),
});

// Export hooks
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useVerifyEmailMutation,
  useResendVerificationEmailMutation,
  useRefreshTokenMutation,
} = authApi;
