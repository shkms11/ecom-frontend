import React from "react";
import type { ProductSummary } from "@/features/products/types/product.types";
import { formatCurrency } from "@/shared/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: ProductSummary;
  onAddToCart?: (product: ProductSummary) => void;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onClick,
}) => {
  const { name, price, rating, images, category, stockStatus } = product;

  const formattedStockStatus = stockStatus?.replace(/_/g, " ") ?? "unknown";

  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden transition-all hover:shadow-md"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <img
          src={images[0] ?? "/fallback-product.jpg"}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Header */}
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-base font-semibold">{name}</h3>

          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-yellow-500">
            {"★".repeat(Math.floor(rating))}
            {"☆".repeat(5 - Math.floor(rating))}
          </span>
        </div>

        {/* Stock */}

        <p className="text-xs text-muted-foreground">{formattedStockStatus}</p>
      </CardHeader>

      {/* Optional content area */}
      <CardContent />

      {/* Footer */}
      <CardFooter className="flex items-center justify-between">
        <span className="text-lg font-bold">{formatCurrency(price)}</span>

        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(product);
          }}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};
