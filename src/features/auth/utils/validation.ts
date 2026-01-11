import {
  EMAIL_REGEX,
  PASSWORD_REQUIREMENTS,
  ERROR_MESSAGES,
} from "../constants/auth.constants";
import type { ValidationError } from "../types/auth.types";

// Email Validation
export const validateEmail = (
  email: string,
): { isValid: boolean; error?: string } => {
  if (!email) {
    return { isValid: false, error: ERROR_MESSAGES.EMAIL_REQUIRED };
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_EMAIL };
  }

  return { isValid: true };
};

// Password Validation
export const validatePassword = (
  password: string,
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!password) {
    return { isValid: false, errors: [ERROR_MESSAGES.PASSWORD_REQUIRED] };
  }

  if (password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
    errors.push(ERROR_MESSAGES.PASSWORD_TOO_SHORT);
  }

  if (password.length > PASSWORD_REQUIREMENTS.MAX_LENGTH) {
    errors.push(ERROR_MESSAGES.PASSWORD_TOO_LONG);
  }

  if (PASSWORD_REQUIREMENTS.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    errors.push(ERROR_MESSAGES.PASSWORD_UPPERCASE);
  }

  if (PASSWORD_REQUIREMENTS.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    errors.push(ERROR_MESSAGES.PASSWORD_LOWERCASE);
  }

  if (PASSWORD_REQUIREMENTS.REQUIRE_NUMBER && !/[0-9]/.test(password)) {
    errors.push(ERROR_MESSAGES.PASSWORD_NUMBER);
  }

  if (
    PASSWORD_REQUIREMENTS.REQUIRE_SPECIAL_CHAR &&
    !new RegExp(
      `[${PASSWORD_REQUIREMENTS.SPECIAL_CHARS.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}]`,
    ).test(password)
  ) {
    errors.push(ERROR_MESSAGES.PASSWORD_SPECIAL);
  }

  return { isValid: errors.length === 0, errors };
};

// Password Confirmation
export const validatePasswordConfirmation = (
  password: string,
  confirmPassword: string,
): { isValid: boolean; error?: string } => {
  if (password !== confirmPassword) {
    return { isValid: false, error: ERROR_MESSAGES.PASSWORD_MISMATCH };
  }

  return { isValid: true };
};

// Name Validation
export const validateName = (
  name: string,
): { isValid: boolean; error?: string } => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: ERROR_MESSAGES.NAME_REQUIRED };
  }

  if (name.trim().length < 2) {
    return { isValid: false, error: "Name must be at least 2 characters" };
  }

  if (name.trim().length > 50) {
    return { isValid: false, error: "Name must not exceed 50 characters" };
  }

  return { isValid: true };
};

// Phone Validation
export const validatePhone = (
  phone: string,
): { isValid: boolean; error?: string } => {
  if (!phone) {
    return { isValid: true }; // Phone is optional
  }

  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: "Please enter a valid phone number" };
  }

  return { isValid: true };
};

// Form Validators
export const validateLoginForm = (
  email: string,
  password: string,
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error!;
  }

  if (!password) {
    errors.password = ERROR_MESSAGES.PASSWORD_REQUIRED;
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateRegisterForm = (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  const nameValidation = validateName(data.name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error!;
  }

  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error!;
  }

  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.errors[0];
  }

  const confirmValidation = validatePasswordConfirmation(
    data.password,
    data.confirmPassword,
  );
  if (!confirmValidation.isValid) {
    errors.confirmPassword = confirmValidation.error!;
  }

  if (data.phone) {
    const phoneValidation = validatePhone(data.phone);
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.error!;
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateForgotPasswordForm = (
  email: string,
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error!;
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateResetPasswordForm = (
  password: string,
  confirmPassword: string,
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.errors[0];
  }

  const confirmValidation = validatePasswordConfirmation(
    password,
    confirmPassword,
  );
  if (!confirmValidation.isValid) {
    errors.confirmPassword = confirmValidation.error!;
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateChangePasswordForm = (
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!currentPassword) {
    errors.currentPassword = "Current password is required";
  }

  const passwordValidation = validatePassword(newPassword);
  if (!passwordValidation.isValid) {
    errors.newPassword = passwordValidation.errors[0];
  }

  if (currentPassword === newPassword) {
    errors.newPassword = "New password must be different from current password";
  }

  const confirmValidation = validatePasswordConfirmation(
    newPassword,
    confirmPassword,
  );
  if (!confirmValidation.isValid) {
    errors.confirmPassword = confirmValidation.error!;
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

// Utility Functions
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "");
};

export const formatValidationErrors = (
  errors: ValidationError[],
): Record<string, string> => {
  const formattedErrors: Record<string, string> = {};

  errors.forEach((error) => {
    formattedErrors[error.field] = error.message;
  });

  return formattedErrors;
};

export const isAlphanumeric = (str: string): boolean => {
  return /^[a-zA-Z0-9]+$/.test(str);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateFile = (
  file: File,
  options: {
    maxSize?: number;
    allowedTypes?: string[];
  } = {},
): { isValid: boolean; error?: string } => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"],
  } = options;

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `File size must not exceed ${Math.floor(maxSize / 1024 / 1024)}MB`,
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Invalid file type. Allowed types: " + allowedTypes.join(", "),
    };
  }

  return { isValid: true };
};
