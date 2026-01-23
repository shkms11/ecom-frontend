import {
  type InputHTMLAttributes,
  forwardRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Eye, EyeOff, Lock, AlertCircle, CheckCircle2 } from "lucide-react";

interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  showStrengthIndicator?: boolean;
  showPasswordRequirements?: boolean;
  hint?: string;
  isValidating?: boolean;
  successMessage?: string;
}

/**
 * Password strength level configuration
 */
interface PasswordStrength {
  score: number;
  level: "weak" | "fair" | "good" | "strong" | "very-strong";
  label: string;
  color: string;
  textColor: string;
}

/**
 * Password requirements configuration
 */
interface PasswordRequirement {
  id: string;
  label: string;
  regex: RegExp;
  met: boolean;
}

/**
 * Calculate password strength based on various criteria
 */
const calculatePasswordStrength = (password: string): PasswordStrength => {
  let score = 0;

  // Length checks
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  // Character type checks
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  // Reduce score if common patterns detected
  if (/(.)\1{2,}/.test(password)) score -= 1; // Repeated characters
  if (/^[0-9]+$/.test(password)) score -= 1; // Only numbers
  if (/^[a-z]+$/.test(password)) score -= 1; // Only lowercase

  // Normalize score to 0-5 scale
  const normalizedScore = Math.max(0, Math.min(5, Math.ceil(score / 1.4)));

  const strengthLevels: Record<number, PasswordStrength> = {
    0: {
      score: 0,
      level: "weak",
      label: "Very Weak",
      color: "bg-red-600",
      textColor: "text-red-600",
    },
    1: {
      score: 1,
      level: "weak",
      label: "Weak",
      color: "bg-red-500",
      textColor: "text-red-500",
    },
    2: {
      score: 2,
      level: "fair",
      label: "Fair",
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
    },
    3: {
      score: 3,
      level: "good",
      label: "Good",
      color: "bg-blue-500",
      textColor: "text-blue-500",
    },
    4: {
      score: 4,
      level: "strong",
      label: "Strong",
      color: "bg-green-500",
      textColor: "text-green-500",
    },
    5: {
      score: 5,
      level: "very-strong",
      label: "Very Strong",
      color: "bg-green-600",
      textColor: "text-green-600",
    },
  };

  return strengthLevels[normalizedScore];
};

/**
 * Get password requirements based on input
 */
const getPasswordRequirements = (password: string): PasswordRequirement[] => {
  return [
    {
      id: "length",
      label: "At least 8 characters",
      regex: /.{8,}/,
      met: /.{8,}/.test(password),
    },
    {
      id: "uppercase",
      label: "At least one uppercase letter (A-Z)",
      regex: /[A-Z]/,
      met: /[A-Z]/.test(password),
    },
    {
      id: "lowercase",
      label: "At least one lowercase letter (a-z)",
      regex: /[a-z]/,
      met: /[a-z]/.test(password),
    },
    {
      id: "number",
      label: "At least one number (0-9)",
      regex: /[0-9]/,
      met: /[0-9]/.test(password),
    },
    {
      id: "special",
      label: "At least one special character (!@#$%^&*)",
      regex: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
      met: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    },
  ];
};

/**
 * PasswordInput Component
 * A comprehensive password input component with strength indicator,
 * requirements validation, and show/hide toggle
 *
 * @example
 * ```tsx
 * <PasswordInput
 *   label="Password"
 *   showStrengthIndicator
 *   showPasswordRequirements
 *   onChange={(e) => setPassword(e.target.value)}
 * />
 * ```
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      error,
      showStrengthIndicator = false,
      showPasswordRequirements = false,
      hint,
      isValidating = false,
      successMessage,
      className = "",
      disabled,
      value = "",
      onChange,
      id,
      name,
      required = false,
      placeholder = "Enter your password",
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Memoize password strength calculation
    const passwordStrength = useMemo(
      () => calculatePasswordStrength(String(value)),
      [value],
    );

    // Memoize password requirements
    const requirements = useMemo(
      () => getPasswordRequirements(String(value)),
      [value],
    );

    // Check if all requirements are met
    const allRequirementsMet = useMemo(
      () => requirements.every((req) => req.met),
      [requirements],
    );

    // Toggle password visibility
    const handleTogglePassword = useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    // Handle input focus
    const handleFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    // Handle input blur
    const handleBlur = useCallback(() => {
      setIsFocused(false);
    }, []);

    // Get input border color based on state
    const getBorderColor = () => {
      if (error)
        return "border-red-300 focus:ring-red-500 focus:border-red-500";
      if (successMessage)
        return "border-green-300 focus:ring-green-500 focus:border-green-500";
      if (isFocused)
        return "border-blue-400 focus:ring-blue-500 focus:border-blue-500";
      return "border-gray-300 focus:ring-blue-500 focus:border-blue-500";
    };

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={id || name}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Hint */}
        {hint && !isFocused && (
          <p className="text-xs text-gray-500 mb-2">{hint}</p>
        )}

        {/* Password Input Container */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock
              size={18}
              className={`transition-colors ${
                error
                  ? "text-red-400"
                  : successMessage
                    ? "text-green-400"
                    : "text-gray-400"
              }`}
            />
          </div>

          <input
            ref={ref}
            id={id || name}
            name={name}
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`
              appearance-none block w-full pl-10 pr-12 py-2.5 
              border rounded-lg placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-offset-1
              transition-all duration-200
              disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60
              ${getBorderColor()}
              ${className}
            `}
            {...props}
          />

          {/* Show/Hide Password Button */}
          <button
            type="button"
            onClick={handleTogglePassword}
            disabled={disabled}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div
            id={`${id}-error`}
            className="mt-2 flex items-start gap-2"
            role="alert"
          >
            <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {successMessage && !error && (
          <div className="mt-2 flex items-start gap-2" role="status">
            <CheckCircle2
              size={16}
              className="text-green-500 mt-0.5 shrink-0"
            />
            <p className="text-sm text-green-600">{successMessage}</p>
          </div>
        )}

        {/* Validating State */}
        {isValidating && (
          <div className="mt-2 flex items-start gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-300 border-t-blue-600 mt-0.5 shrink-0"></div>
            <p className="text-sm text-blue-600">Validating password...</p>
          </div>
        )}

        {/* Password Strength Indicator */}
        {showStrengthIndicator && value && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-600">
                Password Strength
              </span>
              <span
                className={`text-xs font-semibold ${passwordStrength.textColor}`}
              >
                {passwordStrength.label}
              </span>
            </div>

            {/* Strength Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                style={{
                  width: `${(passwordStrength.score / 5) * 100}%`,
                }}
              />
            </div>

            {/* Strength Score Indicators */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    index < passwordStrength.score
                      ? passwordStrength.color
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Password Requirements Checklist */}
        {showPasswordRequirements && value && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs font-semibold text-gray-700 mb-2">
              Password Requirements:
            </p>
            <ul className="space-y-2">
              {requirements.map((req) => (
                <li
                  key={req.id}
                  className={`flex items-center gap-2 text-xs transition-colors ${
                    req.met ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      req.met
                        ? "bg-green-100 border-green-300"
                        : "bg-gray-100 border-gray-300"
                    }`}
                  >
                    {req.met && (
                      <CheckCircle2 size={12} className="text-green-600" />
                    )}
                  </div>
                  <span>{req.label}</span>
                </li>
              ))}
            </ul>

            {/* Overall Status */}
            {allRequirementsMet && (
              <div className="mt-3 p-2 bg-green-50 rounded border border-green-200 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-green-600" />
                <p className="text-xs font-medium text-green-700">
                  Great! Your password meets all requirements.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
