import type {
  ID,
  Option,
  StockStatus,
  ProductBadge,
  AsyncState,
} from "@/shared/types/common.types";

export type VariantOption = Option;

export type ProductCategory = "shoes" | "clothing" | "accessories" | string;

export type ProductStatus = "active" | "draft" | "archived";

/* ---------------------------------- */
/* Supporting types */
/* ---------------------------------- */

export interface ProductVariants {
  color?: VariantOption[];
  size?: VariantOption[];

  [key: string]: VariantOption[] | undefined;
}

export type ProductSpecs = Record<string, string>;

export interface ProductShipping {
  weight?: number;

  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
}

/* ---------------------------------- */
/* Fixed product data */
/* ---------------------------------- */

export interface ProductEntity {
  id: ID;
  name: string;
  slug: string;

  description?: string;
  shortDescription?: string;

  category: ProductCategory;

  images: string[];

  variants?: ProductVariants;

  specs?: ProductSpecs;

  sku?: string;

  shipping?: ProductShipping;
}

/* ---------------------------------- */
/* Changeable product data */
/* ---------------------------------- */

export interface ProductState {
  price: number;
  originalPrice?: number;

  stockStatus: StockStatus;

  rating: number;
  numReviews: number;

  badges?: ProductBadge[];
}

/* ---------------------------------- */
/* Full product */
/* ---------------------------------- */

export interface Product extends ProductEntity, ProductState {}

/* ---------------------------------- */
/* Derived types */
/* ---------------------------------- */

export type ProductSummary = Pick<
  Product,
  "id" | "name" | "price" | "images" | "rating" | "category" | "stockStatus"
>;

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "images"> {
  quantity: number;
  maxStock: number;
}

export interface ProductListState extends AsyncState<Product[]> {
  filters: Record<string, string | number[]>;

  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
