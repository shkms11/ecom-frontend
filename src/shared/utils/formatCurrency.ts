import type { CurrencyCode } from "@/shared/types/common.types";
import { STORE_CONFIG } from "@/config/store.config";

interface FormatCurrencyOptions {
  currency?: CurrencyCode;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

/**
 * Format a number as a currency string
 * Fully uses store config for defaults
 */
export function formatCurrency(
  amount: number,
  {
    currency = STORE_CONFIG.currency,
    locale = STORE_CONFIG.locale,
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  }: FormatCurrencyOptions = {},
): string {
  if (!Number.isFinite(amount)) return "—";

  // Format number according to locale
  const numberString = new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);

  // Use currency symbol from STORE_CONFIG
  const symbol = STORE_CONFIG.currencySymbols?.[currency] ?? currency; // fallback to currency code

  return `${symbol} ${numberString}`;
}
