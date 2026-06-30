import { baseApi } from "@/api/baseApi";

import {
  setCredentials,
  logout as logoutAction,
} from "@/features/auth/slices/authSlice";

import { tokenService } from "@/features/auth/services/tokenService";

import { AUTH_ENDPOINTS } from "@/features/auth/constants/auth.constants";

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
} from "@/features/auth/types/auth.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------------- LOGIN ----------------

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

          tokenService.setTokens(
            accessToken,
            refreshToken,
            credentials.rememberMe ?? false,
          );

          tokenService.setUser(user, credentials.rememberMe ?? false);

          dispatch(
            setCredentials({
              user,
              accessToken,
              refreshToken,
            }),
          );
        } catch (err) {
          console.error(err);
        }
      },
    }),

    // ---------------- REGISTER ----------------

    register: builder.mutation<AuthResponse, RegisterData>({
      query: (body) => ({
        url: AUTH_ENDPOINTS.REGISTER,
        method: "POST",
        body,
      }),

      invalidatesTags: ["User", "Auth"],

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const { user, accessToken, refreshToken } = data.data;

          tokenService.setTokens(accessToken, refreshToken);

          tokenService.setUser(user);

          dispatch(
            setCredentials({
              user,
              accessToken,
              refreshToken,
            }),
          );
        } catch (err) {
          console.error(err);
        }
      },
    }),

    // ---------------- LOGOUT ----------------

    logout: builder.mutation<void, void>({
      query: () => ({
        url: AUTH_ENDPOINTS.LOGOUT,
        method: "POST",
      }),

      invalidatesTags: ["User", "Auth"],

      async onQueryStarted(_, { dispatch }) {
        tokenService.clearTokens();
        dispatch(logoutAction());
      },
    }),

    // ---------------- CURRENT USER ----------------

    getCurrentUser: builder.query<User, void>({
      query: () => AUTH_ENDPOINTS.ME,

      providesTags: ["User"],

      transformResponse: (response: { success: boolean; data: User }) =>
        response.data,
    }),

    // ---------------- UPDATE PROFILE ----------------

    updateProfile: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: AUTH_ENDPOINTS.UPDATE_PROFILE,
        method: "PATCH",
        body,
      }),

      invalidatesTags: ["User"],

      transformResponse: (response: { success: boolean; data: User }) =>
        response.data,
    }),

    // ---------------- FORGOT PASSWORD ----------------

    forgotPassword: builder.mutation<
      { message: string },
      ForgotPasswordRequest
    >({
      query: (body) => ({
        url: AUTH_ENDPOINTS.FORGOT_PASSWORD,
        method: "POST",
        body,
      }),
    }),

    // ---------------- RESET PASSWORD ----------------

    resetPassword: builder.mutation<{ message: string }, ResetPasswordData>({
      query: (body) => ({
        url: AUTH_ENDPOINTS.RESET_PASSWORD,
        method: "POST",
        body,
      }),
    }),

    // ---------------- CHANGE PASSWORD ----------------

    changePassword: builder.mutation<{ message: string }, ChangePasswordData>({
      query: (body) => ({
        url: AUTH_ENDPOINTS.CHANGE_PASSWORD,
        method: "POST",
        body,
      }),
    }),

    // ---------------- VERIFY EMAIL ----------------

    verifyEmail: builder.mutation<{ message: string }, EmailVerificationData>({
      query: (body) => ({
        url: AUTH_ENDPOINTS.VERIFY_EMAIL,
        method: "POST",
        body,
      }),
    }),

    // ---------------- RESEND EMAIL ----------------

    resendVerificationEmail: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: AUTH_ENDPOINTS.RESEND_VERIFICATION,
        method: "POST",
      }),
    }),

    // ---------------- REFRESH TOKEN ----------------

    refreshToken: builder.mutation<
      RefreshTokenResponse,
      { refreshToken: string }
    >({
      query: (body) => ({
        url: AUTH_ENDPOINTS.REFRESH_TOKEN,
        method: "POST",
        body,
      }),
    }),
  }),

  overrideExisting: false,
});

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
