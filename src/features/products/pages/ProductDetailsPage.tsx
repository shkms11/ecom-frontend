import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { SHOP_PRODUCTS } from "@/features/products/data/mockProducts";
import { ProductDetails } from "../components/ProductDetails";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  // ✅ safe product lookup
  const product = useMemo(() => {
    if (!productId) return null;

    return SHOP_PRODUCTS.find((p) => String(p.id) === String(productId));
  }, [productId]);

  // fallback UI
  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="p-6 text-center">
          <h2 className="text-lg font-semibold">Product not found</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            The product you’re looking for doesn’t exist or was removed.
          </p>

          <Button className="mt-4" onClick={() => navigate("/shop")}>
            Back to Shop
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/shop")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Button>

        {/* Product content */}
        <ProductDetails
          product={product}
          onAddToCart={(p) => {
            console.log("Add to cart:", p);
          }}
        />
      </div>
    </div>
  );
}
