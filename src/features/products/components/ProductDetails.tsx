import { useState } from "react";

import type { Product } from "@/features/products/types/product.types";
import { formatCurrency } from "@/shared/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductDetailsProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const SIZES = ["S", "M", "L", "XL"];
const FALLBACK_IMAGE = "/fallback-product.jpg";

export function ProductDetails({ product, onAddToCart }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] ?? FALLBACK_IMAGE,
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      {/* Images */}
      <section className="space-y-4">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-square bg-muted">
              <img
                src={selectedImage}
                alt={product.name}
                className="h-full w-full bg-white object-contain"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-4 gap-3">
          {(product.images ?? []).slice(0, 4).map((image, index) => (
            <button
              key={image}
              onClick={() => setSelectedImage(image)}
              className="overflow-hidden rounded-lg border hover:border-primary"
            >
              <div className="aspect-square bg-muted">
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="h-full w-full bg-white object-contain"
                />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Details */}
      <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
        {product.category && (
          <Badge variant="secondary">{product.category}</Badge>
        )}

        <div>
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

          {product.description && (
            <p className="mt-3 text-muted-foreground">{product.description}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-yellow-500">
            {"★".repeat(Math.floor(product.rating ?? 0))}
            {"☆".repeat(5 - Math.floor(product.rating ?? 0))}
          </span>

          <span className="text-sm text-muted-foreground">
            ({product.numReviews ?? 0} reviews)
          </span>
        </div>

        <div>
          <p className="text-3xl font-semibold">
            {formatCurrency(product.price)}
          </p>

          <p className="text-sm text-muted-foreground">Tax included.</p>
        </div>

        <Separator />

        <div className="space-y-3">
          <p className="text-sm font-medium">Select size</p>

          <div className="flex flex-wrap gap-2">
            {SIZES.map((size) => (
              <Button key={size} variant="outline" size="sm">
                {size}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full"
            onClick={() => onAddToCart?.(product)}
          >
            Add to cart
          </Button>

          <Button size="lg" variant="secondary" className="w-full">
            Buy now
          </Button>
        </div>

        <Card>
          <CardContent className="space-y-2 p-4 text-sm text-muted-foreground">
            <p>✓ Free shipping over $100</p>
            <p>✓ 30-day easy returns</p>
            <p>✓ Secure checkout</p>
          </CardContent>
        </Card>

        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="specs">Specs</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent
            value="details"
            className="mt-4 text-sm text-muted-foreground"
          >
            {product.description || "No description available."}
          </TabsContent>

          <TabsContent
            value="specs"
            className="mt-4 space-y-1 text-sm text-muted-foreground"
          >
            <p>Category: {product.category}</p>
            <p>ID: {product.id}</p>
          </TabsContent>

          <TabsContent
            value="reviews"
            className="mt-4 text-sm text-muted-foreground"
          >
            Customer reviews coming soon.
          </TabsContent>
        </Tabs>
      </aside>
    </div>
  );
}
