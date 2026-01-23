import { useMemo } from "react";
import { useAppSelector } from "@/app/hooks";
import type { UserRole, UserPermissions } from "@/features/auth/types/auth.types";

// Permission mapping based on roles
const ROLE_PERMISSIONS: Record<UserRole, UserPermissions> = {
  customer: {
    canViewProducts: true,
    canManageProducts: false,
    canViewOrders: true,
    canManageOrders: false,
    canViewUsers: false,
    canManageUsers: false,
    canViewAnalytics: false,
    canManageSettings: false,
  },
  seller: {
    canViewProducts: true,
    canManageProducts: true,
    canViewOrders: true,
    canManageOrders: true,
    canViewUsers: false,
    canManageUsers: false,
    canViewAnalytics: true,
    canManageSettings: false,
  },
  admin: {
    canViewProducts: true,
    canManageProducts: true,
    canViewOrders: true,
    canManageOrders: true,
    canViewUsers: true,
    canManageUsers: true,
    canViewAnalytics: true,
    canManageSettings: true,
  },
};

export const usePermissions = () => {
  const { user } = useAppSelector((state) => state.auth);

  const permissions = useMemo(() => {
    if (!user) {
      return null;
    }

    return ROLE_PERMISSIONS[user.role];
  }, [user]);

  const hasPermission = useMemo(() => {
    return (permission: keyof UserPermissions): boolean => {
      if (!permissions) return false;
      return permissions[permission];
    };
  }, [permissions]);

  const hasAnyPermission = useMemo(() => {
    return (permissionList: (keyof UserPermissions)[]): boolean => {
      if (!permissions) return false;
      return permissionList.some((perm) => permissions[perm]);
    };
  }, [permissions]);

  const hasAllPermissions = useMemo(() => {
    return (permissionList: (keyof UserPermissions)[]): boolean => {
      if (!permissions) return false;
      return permissionList.every((perm) => permissions[perm]);
    };
  }, [permissions]);

  return {
    permissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isCustomer: user?.role === "customer",
    isSeller: user?.role === "seller",
    isAdmin: user?.role === "admin",
  };
};

