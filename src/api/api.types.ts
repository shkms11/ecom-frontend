import type { SortOrder } from "@/shared/types/common.types";

/* ---------------------------------- */
/* API response types */
/* ---------------------------------- */

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

/* ---------------------------------- */
/* Query/filter types */
/* ---------------------------------- */

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
