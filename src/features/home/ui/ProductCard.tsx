import { memo, useCallback } from "react";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(({ product }: ProductCardProps) => {
  const renderStars = useCallback(
    (rating: number) =>
      [...Array(5)].map((_, i) => (
        <Star
          key={`star-${i}`}
          size={16}
          className={
            i < Math.floor(rating)
              ? "text-orange-400 fill-orange-400"
              : "text-gray-300"
          }
          aria-hidden="true"
        />
      )),
    [],
  );

  return (
    <article
      className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 
                 hover:shadow-2xl hover:border-orange-200 hover:-translate-y-2 
                 transition-all duration-300 flex flex-col h-full"
      role="group"
      aria-labelledby={`product-${product.id}-title`}
    >
      {/* Image + Content - same as before */}
      <div className="flex flex-col flex-1">
        <h3
          id={`product-${product.id}-title`}
          className="font-semibold text-lg mb-3 text-gray-900 line-clamp-2"
        >
          {product.name}
        </h3>
        <div
          className="flex items-center gap-1 mb-4"
          aria-label={`Rating: ${product.rating} out of 5 stars`}
        >
          {renderStars(product.rating)}
          <span className="text-sm text-gray-500 ml-2 font-medium">
            {product.rating}
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-slate-800 to-zinc-800 bg-clip-text text-transparent">
            ${product.price}
          </span>
          <button
            aria-label={`Add ${product.name} to cart`}
            className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          >
            <ShoppingCart size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
});

ProductCard.displayName = "ProductCard";
