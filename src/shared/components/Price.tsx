import { memo } from "react";
import clsx from "clsx";

import { formatCurrency } from "@/shared/utils/formatCurrency";
import type { CurrencyCode } from "@/shared/types/common.types";

interface PriceProps {
  amount: number;

  /** Optional compare price (original price before discount) */
  compareAt?: number;

  /** Currency code */
  currency?: CurrencyCode;

  /** Locale for formatting */
  locale?: string;

  /** Optional className for styling */
  className?: string;

  /** Show discount percentage */
  showDiscount?: boolean;
}

export const Price = memo(
  ({
    amount,
    compareAt,
    currency = "BDT",
    locale = "en-BD",
    className,
    showDiscount = false,
  }: PriceProps) => {
    const hasDiscount = compareAt !== undefined && compareAt > amount;

    const discountPercent = hasDiscount
      ? Math.round(((compareAt! - amount) / compareAt!) * 100)
      : null;

    return (
      <div className={clsx("flex items-center gap-2 font-semibold", className)}>
        {/* Current Price */}
        <span className="text-lg text-zinc-900">
          {formatCurrency(amount, { currency, locale })}
        </span>

        {/* Original Price */}
        {hasDiscount && (
          <span className="text-sm text-zinc-500 line-through">
            {formatCurrency(compareAt!, { currency, locale })}
          </span>
        )}

        {/* Discount Badge */}
        {hasDiscount && showDiscount && discountPercent && (
          <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
            -{discountPercent}%
          </span>
        )}
      </div>
    );
  },
);

Price.displayName = "Price";
