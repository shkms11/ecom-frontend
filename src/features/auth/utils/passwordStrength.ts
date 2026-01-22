import type {
  PasswordStrength,
  PasswordStrengthLevel,
} from "../types/auth.types";
import { PASSWORD_STRENGTH_CONFIG } from "../constants/auth.constants";

export const calculatePasswordStrength = (
  password: string,
): PasswordStrength => {
  let score: PasswordStrengthLevel = 0;
  const suggestions: string[] = [];

  if (!password) {
    return {
      score: 0,
      feedback: PASSWORD_STRENGTH_CONFIG.VERY_WEAK.label,
      color: PASSWORD_STRENGTH_CONFIG.VERY_WEAK.color,
      suggestions: ["Enter a password"],
    };
  }

  // Length scoring
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length < 8) {
    suggestions.push("Use at least 8 characters");
  }

  // Character variety scoring
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score++;
  } else {
    suggestions.push("Mix uppercase and lowercase letters");
  }

  if (/[0-9]/.test(password)) {
    score++;
  } else {
    suggestions.push("Add numbers");
  }

  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    score++;
  } else {
    suggestions.push("Add special characters (!@#$%^&*)");
  }

  // Common patterns penalty
  if (/^(123|abc|qwerty|password)/i.test(password)) {
    score = Math.max(0, score - 1) as PasswordStrengthLevel;
    suggestions.push("Avoid common patterns");
  }

  // Repeating characters penalty
  if (/(.)\1{2,}/.test(password)) {
    score = Math.max(0, score - 1) as PasswordStrengthLevel;
    suggestions.push("Avoid repeated characters");
  }

  // Cap the score at 5
  score = Math.min(5, score) as PasswordStrengthLevel;

  const strengthConfig = Object.values(PASSWORD_STRENGTH_CONFIG).find(
    (config) => config.score === score,
  )!;

  return {
    score,
    feedback: strengthConfig.label,
    color: strengthConfig.color,
    suggestions: suggestions.length > 0 ? suggestions : ["Great password!"],
  };
};

export const getPasswordStrengthColor = (
  score: PasswordStrengthLevel,
): string => {
  const config = Object.values(PASSWORD_STRENGTH_CONFIG).find(
    (c) => c.score === score,
  );
  return config?.color || PASSWORD_STRENGTH_CONFIG.VERY_WEAK.color;
};

export const getPasswordStrengthLabel = (
  score: PasswordStrengthLevel,
): string => {
  const config = Object.values(PASSWORD_STRENGTH_CONFIG).find(
    (c) => c.score === score,
  );
  return config?.label || PASSWORD_STRENGTH_CONFIG.VERY_WEAK.label;
};
