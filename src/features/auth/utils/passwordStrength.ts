import type {
  PasswordStrength,
  PasswordStrengthLevel,
} from "@/features/auth/types/auth.types";

const LABELS = [
  "Very Weak",
  "Weak",
  "Fair",
  "Good",
  "Strong",
  "Very Strong",
] as const;

export function calculatePasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return {
      score: 0,
      feedback: LABELS[0],
      suggestions: [],
    };
  }

  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  score = Math.min(score, 5) as PasswordStrengthLevel;

  return {
    score,
    feedback: LABELS[score],
    suggestions: [],
  };
}
