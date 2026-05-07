import type {
  ID,
  Option,
  StockStatus,
  ProductBadge,
  Rating,
  Meta,
  AsyncState,
} from "@/shared/types/common.types";

export type VariantOption = Option;

export type ProductCategory = "shoes" | "clothing" | "accessories" | string;
export type ProductStatus = "active" | "draft" | "archived";

export interface Product {
  id: ID;
  name: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  currency: "BDT";
  images: string[];
  image?: string;
  badges: ProductBadge[];
  rating: Rating;
  numReviews: number;
  variants: {
    color?: VariantOption[];
    size?: VariantOption[];

    [key: string]: VariantOption[] | undefined;
  };
  specs: Record<string, string>;
  category: ProductCategory;
  stockStatus: StockStatus;
  sku?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  meta: Meta;
}

export type ProductSummary = Pick<
  Product,
  "id" | "name" | "price" | "image" | "rating" | "category" | "stockStatus"
>;

export interface ProductListState extends AsyncState<Product[]> {
  filters: Record<string, string | number[]>;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "image"> {
  quantity: number;
  maxStock: number;
}
