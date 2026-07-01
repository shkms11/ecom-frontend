import type { CurrencyCode } from "@/shared/types/common.types";
import type { Product } from "@/features/products/types/product.types";

/**
 * ISO 8601 date string
 * Example: "2026-05-12T10:30:00Z"
 */
export type ISODateString = string;

/**
 * Selected product options for a cart item
 */
export interface CartItemVariant {
  size?: string;
  color?: string;
  sku?: string;
}

/**
 * Single item in the cart
 */
export interface CartItem {
  /** Unique cart line item ID */
  id: string;

  /** Product reference */
  productId: Product["id"];
  product: Product;

  /** Selected options */
  variant?: CartItemVariant;

  /** Quantity selected */
  quantity: number;

  /**
   * Price per unit at time added.
   * Keeps cart stable even if product price changes later.
   */
  unitPrice: number;

  addedAt: ISODateString;
  updatedAt?: ISODateString;
}

/**
 * Derived cart totals
 */
export interface CartSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;

  itemCount: number;
  totalQuantity: number;

  currency: CurrencyCode;
}

/**
 * Cart domain model
 */
export interface Cart {
  id?: string;
  items: CartItem[];
  summary: CartSummary;

  couponCode?: string | null;

  updatedAt?: ISODateString;
}
