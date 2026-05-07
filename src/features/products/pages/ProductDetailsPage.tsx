// src/features/products/components/ProductDetailPage.tsx
import React, { useState } from "react";
import type {
  Product,
  VariantOption,
} from "@/features/products/types/product.types";
import { ProductCard } from "@/shared/components";
import { SHOP_PRODUCTS } from "@/features/products/data/mockProducts";

interface ProductDetailPageProps {
  product: Product;
  onAddToCart?: (
    product: Product,
    options: { color?: string; size?: string; quantity: number },
  ) => void;
  onClose?: () => void; // For overlay back button
}

export default function ProductDetailPage({
  product,
  onAddToCart = () => {},
  onClose,
}: ProductDetailPageProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const relatedProducts = React.useMemo(
    () =>
      SHOP_PRODUCTS.filter(
        (p) => p.category === product.category && p.id !== product.id,
      ).slice(0, 4),
    [product.category, product.id],
  );

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const handleAddToCart = () => {
    onAddToCart(product, {
      color: selectedColor || undefined,
      size: selectedSize || undefined,
      quantity,
    });
    console.log("Added to cart:", {
      product: product.id,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 mb-6 shadow-lg">
            <img
              src={product.images[currentImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 transition-all duration-200 ${
                  i === currentImage
                    ? "border-orange-500 ring-2 ring-orange-200 shadow-md scale-105"
                    : "border-gray-200 hover:border-gray-400 hover:scale-105"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6 lg:pt-2">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
            Home / {product.category} / {product.name}
          </nav>

          {/* Title + Badges */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
            <div className="flex flex-wrap gap-2 mt-3">
              {product.badges?.map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800 border border-orange-200"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex text-orange-400 text-lg">★★★★★</div>
              <span className="text-xl font-semibold text-gray-900">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-sm text-gray-600">
                ({product.numReviews?.toLocaleString() || 0} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-2xl border border-orange-100">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {discountPercent > 0 && (
              <span className="inline-block mt-1 px-3 py-1 bg-orange-500 text-white text-sm font-bold rounded-full">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Variants */}
          <div className="space-y-4">
            {product.variants?.color && (
              <VariantSelector
                label="Color"
                options={product.variants.color}
                selected={selectedColor}
                onChange={setSelectedColor}
              />
            )}
            {product.variants?.size && (
              <VariantSelector
                label="Size"
                options={product.variants.size}
                selected={selectedSize}
                onChange={setSelectedSize}
              />
            )}
          </div>

          {/* CTA */}
          <div className="flex gap-4 bg-white p-4 rounded-2xl border shadow-sm">
            <QuantitySelector
              min={1}
              max={product.stockStatus ? 99 : 0}
              value={quantity}
              onChange={setQuantity}
              disabled={!product.stockStatus}
            />
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || !selectedSize}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
            <button className="p-4 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.105 2.289a.75.75 0 00-.826.95L3.5 10.09v6.41a2 2 0 002 2H14a2 2 0 002-2V10.095l1.222-7.846a.75.75 0 00-.826-.95H3.105zM9 4.5a.5.5 0 01.5.5v3a.5.5 0 01-1 0V5a.5.5 0 01.5-.5zm4 0a.5.5 0 01.5.5v3a.5.5 0 01-1 0V5a.5.5 0 01.5-.5z" />
              </svg>
            </button>
          </div>

          {!product.inStock && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-amber-800 text-sm">
                ⚠️ Currently out of stock. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Description & Specs */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <section>
          <h2 className="text-2xl font-bold mb-6">Product Details</h2>
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
            <p>{product.description}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Specifications</h2>
          <dl className="grid grid-cols-1 gap-4">
            {Object.entries(product.specs || {}).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
              >
                <dt className="font-medium text-gray-600">{key}</dt>
                <dd className="text-gray-900 font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {/* Reviews Placeholder */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          Customer Reviews ({product.reviewCount?.toLocaleString() || 0})
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3].map((i) => (
            <article
              key={i}
              className="border rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  U{i}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="flex text-orange-400 text-sm">★★★★★</div>
                    <span className="text-sm text-gray-600">2 days ago</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    "Perfect fit and amazing quality! The fabric feels premium
                    and washes well. Will buy more colors."
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-8">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((related) => (
              <ProductCard
                key={related.id}
                product={related}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// Variant Selector
function VariantSelector({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: VariantOption[];
  selected: string | null;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
        {label}
      </label>
      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all duration-200 min-w-[44px] ${
              opt.value === selected
                ? "bg-orange-500 text-white border-orange-500 shadow-md scale-105"
                : "border-gray-300 text-gray-700 hover:border-orange-400 hover:bg-orange-50 hover:scale-105"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Quantity Selector
function QuantitySelector({
  min,
  max,
  value,
  onChange,
  disabled,
}: {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}) {
  return (
    <div
      className={`flex items-center border-2 rounded-xl overflow-hidden shadow-sm transition-all ${disabled ? "opacity-50 bg-gray-50 border-gray-200" : "border-gray-200 hover:border-gray-300 hover:shadow-md"}`}
    >
      <button
        className="px-4 py-3 text-lg font-bold text-gray-600 hover:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        disabled={value <= min || disabled}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <span className="px-6 py-3 text-lg font-semibold bg-white border-x border-gray-100">
        {value}
      </span>
      <button
        className="px-4 py-3 text-lg font-bold text-gray-600 hover:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        disabled={value >= max || disabled}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  );
}
