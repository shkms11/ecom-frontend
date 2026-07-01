import type React from "react";

/* ---------------------------------- */
/* Primitive shared types */
/* ---------------------------------- */

export type ID = string | number;

export type LoadingState = "idle" | "pending" | "succeeded" | "failed";

export type SortOrder = "asc" | "desc";

export type ToastType = "success" | "error" | "warning" | "info";

/* ---------------------------------- */
/* UI shared types */
/* ---------------------------------- */

export type IconName = "truck" | "shield-check" | "zap" | string;

export type IconComponent = React.ComponentType<{
  className?: string;
}>;

export interface Option<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

/* ---------------------------------- */
/* Metadata */
/* ---------------------------------- */

export interface Meta {
  id?: ID;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  version?: number;
}

/* ---------------------------------- */
/* Async state */
/* ---------------------------------- */

export interface AsyncState<T = unknown> {
  loading: LoadingState;
  error: string | null;
  data: T | null;
}

/* ---------------------------------- */
/* Product-related shared enums */
/* ---------------------------------- */

export type ProductBadge = "Best Seller" | "Sale" | "New" | "Premium" | string;

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export type Rating = number;

/* ---------------------------------- */
/* Form state */
/* ---------------------------------- */

export interface FormFieldState {
  value: string;
  error: string | null;
  touched: boolean;
  dirty: boolean;
}

export interface FormState<
  T extends Record<string, unknown> = Record<string, string>,
> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;

  isSubmitting: boolean;
  isValid: boolean;
}

/* ---------------------------------- */
/* Currency */
/* ---------------------------------- */

export type CurrencyCode =
  | "USD" // US Dollar
  | "EUR" // Euro
  | "BDT"; // Bangladeshi Taka
