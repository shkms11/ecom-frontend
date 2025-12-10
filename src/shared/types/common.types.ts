// API Response Types
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

// State Types
export type LoadingState = "idle" | "pending" | "succeeded" | "failed";

export interface AsyncState {
  loading: LoadingState;
  error: string | null;
}

// Query Types
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
}

// UI Component Types
export interface Option<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  dismissible?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "ghost"
  | "link";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "time"
  | "datetime-local";

// Form Types
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

// Navigation Types
export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

// Table Types
export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface TableAction<T = Record<string, unknown>> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  variant?: ButtonVariant;
  disabled?: (row: T) => boolean;
}

// File Upload Types
export interface FileUploadState {
  file: File | null;
  preview: string | null;
  uploading: boolean;
  progress: number;
  error: string | null;
}

// Date & Location Types
export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  coordinates?: Coordinates;
}

// Metadata Types
export interface Meta {
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  version?: number;
}

// Search Types
export interface SearchResult<T = Record<string, unknown>> {
  item: T;
  score: number;
  highlights?: Record<string, string[]>;
}

// Notification Types
export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  metadata?: Record<string, string | number | boolean>;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

// Chart & Statistics Types
export interface Statistics {
  label: string;
  value: number | string;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
  label?: string;
}

// Generic Types
export interface KeyValuePair<K = string, V = unknown> {
  key: K;
  value: V;
}

// Enum-like Types
export type Environment = "development" | "staging" | "production";
export type Status =
  | "active"
  | "inactive"
  | "pending"
  | "suspended"
  | "deleted";
export type Priority = "low" | "medium" | "high" | "urgent";
export type ColorScheme = "light" | "dark" | "auto";
export type LanguageCode =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | "ja"
  | "ko"
  | "zh";
export type CurrencyCode =
  | "USD"
  | "EUR"
  | "GBP"
  | "JPY"
  | "CNY"
  | "INR"
  | "BRL";

// Configuration Types
export interface ThemeConfig {
  colorScheme: ColorScheme;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  fontSize: "sm" | "md" | "lg";
}

export interface AppConfig {
  appName: string;
  version: string;
  environment: Environment;
  apiUrl: string;
  theme: ThemeConfig;
  features: Record<string, boolean>;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

export type PromiseType<T> = T extends Promise<infer U> ? U : T;

export type ExtractParameters<T> = T extends (...args: infer P) => unknown
  ? P
  : never;

export type ExtractReturnType<T> = T extends (...args: unknown[]) => infer R
  ? R
  : unknown;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type ID = string | number;

export type Timestamp = string | number | Date;
