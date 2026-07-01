import type { Cart, CartItemVariant } from "./cart.types";

/**
 * Add product to cart
 */
export interface AddToCartPayload {
  productId: string;
  quantity: number;
  variant?: CartItemVariant;
}

/**
 * Update quantity of an existing cart item
 */
export interface UpdateCartItemPayload {
  itemId: string;
  quantity: number;
}

/**
 * Remove item from cart
 */
export interface RemoveCartItemPayload {
  itemId: string;
}

/**
 * Apply discount/coupon code
 */
export interface ApplyCouponPayload {
  code: string;
}

/**
 * Standard cart API response
 */
export interface CartResponse {
  data: Cart;
  message?: string;
}
