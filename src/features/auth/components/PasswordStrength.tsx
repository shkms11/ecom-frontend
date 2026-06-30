import { calculatePasswordStrength } from "@/features/auth/utils";

interface PasswordStrengthProps {
  password: string;
}

const BAR_COLORS = [
  "bg-destructive",
  "bg-destructive",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-primary",
  "bg-green-500",
] as const;

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = calculatePasswordStrength(password);

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-muted-foreground">
          {strength.feedback}
        </span>

        <span className="text-muted-foreground">{strength.score}/5</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full transition-all duration-300 ${
            BAR_COLORS[strength.score]
          }`}
          style={{
            width: `${strength.score * 20}%`,
          }}
        />
      </div>

      {strength.suggestions.length > 0 && (
        <ul className="space-y-1 text-xs text-muted-foreground">
          {strength.suggestions.map((suggestion) => (
            <li key={suggestion}>• {suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
