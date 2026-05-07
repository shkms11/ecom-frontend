import React from "react";
import type { Product } from "@/features/products/types/product.types";
import { formatCurrency } from "@/shared/utils";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  const { id, name, price, rating, image, description, category, numReviews } =
    product;

  return (
    <div
      key={id}
      className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md overflow-hidden transition-shadow duration-200 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <img
          src={image ?? "/fallback-product.jpg"}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Name + category */}
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {name}
          </h3>
          {category && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              {category}
            </span>
          )}
        </div>

        {/* Rating + reviews */}
        <div className="flex items-center mb-2 text-sm">
          <span className="text-yellow-500">
            {"★".repeat(Math.floor(rating))}
            {"☆".repeat(5 - Math.floor(rating))}
          </span>
          {numReviews != null && (
            <span className="text-xs text-gray-500 ml-1">({numReviews})</span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Price + add to cart */}
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-bold text-gray-900">
            {formatCurrency(price)}
          </span>

          <button
            onClick={() => onAddToCart?.(product)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded text-sm flex items-center gap-1.5 transition-colors"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
