import { memo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "@/shared/components";
import { BEST_SELLER_ITEMS } from "@/features/products/data/mockBestSellers";

export const BestSellers = memo(() => {
  return (
    <section
      className="py-24 px-6 bg-gradient-to-b from-gray-50/70 to-zinc-50/50"
      aria-labelledby="bestsellers-heading"
    >
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-16">
          <h2
            id="bestsellers-heading"
            className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-slate-900 bg-clip-text text-transparent"
          >
            Best Sellers
          </h2>
          <Link
            to="/shop"
            className="text-orange-600 font-semibold text-lg hover:text-orange-700 flex items-center gap-2 group"
          >
            View All{" "}
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BEST_SELLER_ITEMS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              // ✅ Fully typed - works with your enhanced Product type
            />
          ))}
        </div>
      </div>
    </section>
  );
});

BestSellers.displayName = "BestSellers";
