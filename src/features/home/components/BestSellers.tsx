import { memo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { ProductCard } from "@/features/products";
import { BEST_SELLER_ITEMS } from "@/features/products/data/mockBestSellers";

export const BestSellers = memo(() => {
  return (
    <section className="border-t border-border bg-background py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="flex items-end justify-between mb-10 lg:mb-12">
          <div>
            <h2
              id="bestsellers-heading"
              className="text-2xl lg:text-3xl font-semibold tracking-tight text-foreground"
            >
              Best Sellers
            </h2>

            <p className="text-sm text-muted-foreground mt-2">
              Most loved picks from our runners
            </p>
          </div>

          <Link
            to="/shop"
            className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1 transition-colors"
          >
            View all
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </header>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {BEST_SELLER_ITEMS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
});

BestSellers.displayName = "BestSellers";
