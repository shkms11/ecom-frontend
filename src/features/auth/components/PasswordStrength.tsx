import { useMemo } from "react";
import { calculatePasswordStrength } from "@/features/auth/utils";
import { PASSWORD_STRENGTH_CONFIG } from "@/features/auth/constants/auth.constants";

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  password,
}) => {
  const strength = useMemo(
    () => calculatePasswordStrength(password),
    [password],
  );

  const config = useMemo(() => {
    if (strength.score <= 1) return PASSWORD_STRENGTH_CONFIG.WEAK;
    if (strength.score === 2) return PASSWORD_STRENGTH_CONFIG.FAIR;
    if (strength.score === 3) return PASSWORD_STRENGTH_CONFIG.GOOD;
    if (strength.score === 4) return PASSWORD_STRENGTH_CONFIG.STRONG;
    return PASSWORD_STRENGTH_CONFIG.VERY_STRONG;
  }, [strength.score]);

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs font-medium ${config.textColor}`}>
          {config.label}
        </span>
        <span className="text-xs text-gray-500">{strength.score}/5</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${config.color}`}
          style={{ width: `${(strength.score / 5) * 100}%` }}
        ></div>
      </div>
      {strength.suggestions.length > 0 && (
        <ul className="mt-2 text-xs text-gray-600 space-y-1">
          {strength.suggestions.map((suggestion, index) => (
            <li key={index}>• {suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
