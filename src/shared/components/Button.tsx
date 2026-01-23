import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "danger";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      isLoading = false,
      disabled,
      className = "",
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
      primary:
        "border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
      outline:
        "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500",
      danger:
        "border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center">
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></span>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
