import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// Error response structure from API
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Array<{ field: string; message: string }>;
  statusCode?: number;
}

// Standardized error result
export interface ErrorResult {
  message: string;
  statusCode?: number;
  fieldErrors?: Record<string, string>;
}

// Type guard for FetchBaseQueryError
export const isFetchBaseQueryError = (
  error: unknown,
): error is FetchBaseQueryError => {
  return typeof error === "object" && error != null && "status" in error;
};

// Type guard for SerializedError
export const isSerializedError = (error: unknown): error is SerializedError => {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    !("status" in error)
  );
};

// Main error handler for RTK Query errors
export const handleRtkError = (
  error: FetchBaseQueryError | SerializedError | undefined,
): ErrorResult => {
  if (!error) {
    return { message: "An unknown error occurred" };
  }

  // Handle FetchBaseQueryError (from API)
  if (isFetchBaseQueryError(error)) {
    // Error with response data
    if (error.status === "FETCH_ERROR") {
      return {
        message: "Network error. Please check your internet connection.",
        statusCode: 0,
      };
    }

    if (error.status === "PARSING_ERROR") {
      return {
        message: "Error parsing server response.",
        statusCode: 0,
      };
    }

    if (error.status === "TIMEOUT_ERROR") {
      return {
        message: "Request timeout. Please try again.",
        statusCode: 0,
      };
    }

    // HTTP status errors
    if (typeof error.status === "number") {
      const data = error.data as ApiErrorResponse;

      // Extract field errors if present
      const fieldErrors: Record<string, string> = {};
      if (data?.errors && Array.isArray(data.errors)) {
        data.errors.forEach((err) => {
          fieldErrors[err.field] = err.message;
        });
      }

      return {
        message: data?.message || getDefaultErrorMessage(error.status),
        statusCode: error.status,
        fieldErrors:
          Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined,
      };
    }
  }

  // Handle SerializedError (from Redux)
  if (isSerializedError(error)) {
    return {
      message: error.message || "An error occurred",
    };
  }

  // Fallback
  return { message: "An unexpected error occurred" };
};

// Get default error message based on status code
const getDefaultErrorMessage = (status: number): string => {
  switch (status) {
    case 400:
      return "Bad request. Please check your input.";
    case 401:
      return "Unauthorized. Please login again.";
    case 403:
      return "Access forbidden. You do not have permission.";
    case 404:
      return "Resource not found.";
    case 409:
      return "Conflict. Resource already exists.";
    case 422:
      return "Validation error. Please check your input.";
    case 429:
      return "Too many requests. Please try again later.";
    case 500:
      return "Server error. Please try again later.";
    case 502:
      return "Bad gateway. Server is temporarily unavailable.";
    case 503:
      return "Service unavailable. Please try again later.";
    default:
      return "An error occurred. Please try again.";
  }
};

// Extract error message (simple helper)
export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined,
): string => {
  return handleRtkError(error).message;
};

// Extract field errors (for forms)
export const getFieldErrors = (
  error: FetchBaseQueryError | SerializedError | undefined,
): Record<string, string> | null => {
  const result = handleRtkError(error);
  return result.fieldErrors || null;
};

// Check error types
export const isServerError = (
  error: FetchBaseQueryError | SerializedError | undefined,
): boolean => {
  const result = handleRtkError(error);
  return (
    result.statusCode !== undefined &&
    result.statusCode >= 500 &&
    result.statusCode < 600
  );
};

export const isClientError = (
  error: FetchBaseQueryError | SerializedError | undefined,
): boolean => {
  const result = handleRtkError(error);
  return (
    result.statusCode !== undefined &&
    result.statusCode >= 400 &&
    result.statusCode < 500
  );
};

export const isUnauthorizedError = (
  error: FetchBaseQueryError | SerializedError | undefined,
): boolean => {
  const result = handleRtkError(error);
  return result.statusCode === 401;
};

export const isForbiddenError = (
  error: FetchBaseQueryError | SerializedError | undefined,
): boolean => {
  const result = handleRtkError(error);
  return result.statusCode === 403;
};

export const isNotFoundError = (
  error: FetchBaseQueryError | SerializedError | undefined,
): boolean => {
  const result = handleRtkError(error);
  return result.statusCode === 404;
};

export const isValidationError = (
  error: FetchBaseQueryError | SerializedError | undefined,
): boolean => {
  const result = handleRtkError(error);
  return result.statusCode === 422 || result.fieldErrors !== undefined;
};

export const isNetworkError = (
  error: FetchBaseQueryError | SerializedError | undefined,
): boolean => {
  if (!error) return false;
  if (isFetchBaseQueryError(error)) {
    return error.status === "FETCH_ERROR" || error.status === "TIMEOUT_ERROR";
  }
  return false;
};

// Log error in development
export const logError = (error: unknown, context?: string): void => {
  if (import.meta.env.DEV) {
    console.error(`[Error${context ? ` - ${context}` : ""}]:`, error);
  }
};

// Format error for display
export const formatErrorForDisplay = (
  error: FetchBaseQueryError | SerializedError | undefined,
): string => {
  const result = handleRtkError(error);

  if (result.fieldErrors) {
    const fieldMessages = Object.entries(result.fieldErrors)
      .map(([field, message]) => `${field}: ${message}`)
      .join(", ");
    return `${result.message}. ${fieldMessages}`;
  }

  return result.message;
};
