import { Star } from "lucide-react";

import type { ProductSummary } from "@/features/products/types/product.types";
import { formatCurrency } from "@/shared/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

interface ProductCardProps {
  product: ProductSummary;
  onAddToCart?: (product: ProductSummary) => void;
  onClick?: () => void;
}

const FALLBACK_IMAGE = "/fallback-product.jpg";

export function ProductCard({
  product,
  onAddToCart,
  onClick,
}: ProductCardProps) {
  const {
    name,
    price,
    rating = 0,
    images = [],
    category,
    stockStatus,
  } = product;

  const image = images[0] ?? FALLBACK_IMAGE;
  const stockLabel = stockStatus?.replace(/_/g, " ") ?? "Unknown";
  const inStock = stockStatus === "IN_STOCK";

  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden border border-border transition-colors duration-200 hover:border-orange-200"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <CardHeader className="space-y-3 p-4 pb-3">
        <div className="flex items-start justify-between gap-2">
          {category && (
            <Badge variant="secondary" className="capitalize">
              {category}
            </Badge>
          )}

          <Badge
            variant={inStock ? "outline" : "destructive"}
            className="text-[10px]"
          >
            {stockLabel}
          </Badge>
        </div>

        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground">
          {name}
        </h3>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="h-4 w-4 fill-orange-500 text-orange-500" size={16} />
          <span>{rating.toFixed(1)}</span>
        </div>
      </CardHeader>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between p-4 pt-4 border-t border-border">
        <span className="text-base font-semibold text-foreground">
          {formatCurrency(price)}
        </span>

        <Button
          size="sm"
          className="h-9 px-4"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(product);
          }}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
