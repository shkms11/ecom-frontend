export type ID = string | number;

export type IconName = "truck" | "shield-check" | "zap" | string;

export type IconComponent = React.ComponentType<{ className?: string }>;

export interface Meta {
  id?: ID;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  version?: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  timestamp?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  timestamp?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: FieldError[];
  statusCode: number;
  timestamp?: string;
}

export interface FieldError {
  field: string;
  message: string;
  value?: string | number | boolean;
}

export interface ProductSummary {
  id: ID;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  inStock: boolean;
}

export interface CartItemResponse {
  id: ID;
  productId: ID;
  quantity: number;
  price: number;
  total: number;
}

export type LoadingState = "idle" | "pending" | "succeeded" | "failed";

export interface AsyncState<T = unknown> {
  loading: LoadingState;
  error: string | null;
  data: T | null;
}

export type SortOrder = "asc" | "desc";
export type FilterOperator =
  | "eq"
  | "ne"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "in"
  | "nin"
  | "like"
  | "between";

export interface Filter {
  field: string;
  operator: FilterOperator;
  value: string | number | boolean | string[] | number[];
}

export interface Sort {
  field: string;
  order: SortOrder;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  filters?: Filter[];
  sort?: Sort[];
  category?: string;
  price_min?: number;
  price_max?: number;
}

export interface Option<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export type ToastType = "success" | "error" | "warning" | "info";

export type ProductBadge = "Best Seller" | "Sale" | "New" | "Premium" | string;
export type Rating = 0 | 1 | 2 | 3 | 4 | 5;

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

export interface CartSummary {
  items: number;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  shipping: number;
}

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export type CurrencyCode = "BDT" | "USD" | "EUR";
