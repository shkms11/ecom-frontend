import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "../api/authApi";
import { clearError } from "../slices/authSlice";
import type {
  LoginCredentials,
  RegisterData,
  ChangePasswordData,
  User, // Add User type import
} from "../types/auth.types";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated, error } = useAppSelector(
    (state) => state.auth,
  );

  // RTK Query hooks
  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegistering }] =
    useRegisterMutation();
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [updateProfileMutation, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const [changePasswordMutation, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  // Only fetch user if authenticated
  const {
    data: currentUser,
    isLoading: isFetchingUser,
    refetch: refetchUser,
  } = useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  // Profile wrapper
  const updateProfile = useCallback(
    async (data: Partial<User>) => {
      return await updateProfileMutation(data).unwrap();
    },
    [updateProfileMutation],
  );

  // Clear error
  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // User data
    user: currentUser || user,
    isAuthenticated,

    // Loading states
    isLoading: isFetchingUser,
    isLoggingIn,
    isRegistering,
    isLoggingOut,
    isUpdatingProfile,
    isChangingPassword,

    // Error
    error,
    clearError: clearAuthError,

    // Actions
    login: useCallback(
      async (credentials: LoginCredentials) => {
        return await loginMutation(credentials).unwrap();
      },
      [loginMutation],
    ),
    register: useCallback(
      async (data: RegisterData) => {
        return await registerMutation(data).unwrap();
      },
      [registerMutation],
    ),
    logout: useCallback(async () => {
      try {
        await logoutMutation().unwrap();
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        // Navigate anyway since tokens are cleared
        navigate("/login");
      }
    }, [logoutMutation, navigate]),
    updateProfile,
    changePassword: useCallback(
      async (data: ChangePasswordData) => {
        return await changePasswordMutation(data).unwrap();
      },
      [changePasswordMutation],
    ),
    refetchUser,

    // Role helpers - Fix: Use non-null assertion since we check existence
    isCustomer: !!(user && user.role === "customer"),
    isSeller: !!(user && user.role === "seller"),
    isAdmin: !!(user && user.role === "admin"),
  };
};
