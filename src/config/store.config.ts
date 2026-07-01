import type { CurrencyCode } from "@/shared/types/common.types";

const FREE_SHIPPING_THRESHOLD = 3000;

export const STORE_CONFIG = {
  // --- Announcement Bar ---
  announcementBar: {
    enabled: true,
    message: "🎉 Free Shipping on orders over {amount}!",
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,

    ctaText: "Shop Now",
    ctaLink: "/shop",
  },
  // --- Currency & Locale ---
  currency: "BDT" as CurrencyCode,
  locale: "en-BD",

  currencySymbols: {
    BDT: "Tk",
    USD: "$",
    EUR: "€",
  } as Record<CurrencyCode, string>,

  // --- Store rules ---
  freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
  returnDays: 7,
  warrantyDays: 90,
  happyCustomers: "10k+",

  // --- Store metadata ---
  storeName: "ShopFlow",
  storeUrl: "",
  themeColor: "#FF6600",

  maxCartItems: 50,
  taxRate: 0.07,
  enableReviews: true,
} as const;

/** TypeScript type for STORE_CONFIG */
export type StoreConfig = typeof STORE_CONFIG;
