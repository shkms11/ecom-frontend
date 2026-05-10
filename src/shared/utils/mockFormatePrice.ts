//to formate prices like 99 and if required to apply any formula for prices
//it should be handled in backend the price should consistent it the only for the mock purpose
/**
 * Pricing strategy for UI display only
 * NEVER mutate actual product price
 */

interface FormatPriceOptions {
  /**
   * Enables psychological pricing (e.g. 100 → 99)
   */
  psychological?: boolean;

  /**
   * Ensures price never goes below this value
   */
  min?: number;

  /**
   * Rounding strategy
   */
  round?: "floor" | "ceil" | "round";
}

/**
 * Format raw price for display (NOT currency formatting)
 */
export function mockFormatPrice(
  amount: number,
  { psychological = true, min = 1, round = "floor" }: FormatPriceOptions = {},
): number {
  if (!Number.isFinite(amount)) return 0;

  let price = amount;

  // 1. Apply rounding strategy
  switch (round) {
    case "ceil":
      price = Math.ceil(price);
      break;
    case "round":
      price = Math.round(price);
      break;
    case "floor":
    default:
      price = Math.floor(price);
      break;
  }

  // 2. Psychological pricing
  if (psychological && price > 10) {
    price = price - 1;
  }

  // 3. Safety guard
  if (price < min) {
    price = min;
  }

  return price;
}
