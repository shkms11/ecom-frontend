import { memo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { CATEGORIES } from "../data/products";
import type { Category } from "../types";

export const Categories = memo(() => (
  <section
    className="py-24 px-6 bg-white/50 backdrop-blur-sm"
    aria-labelledby="categories-heading"
  >
    <div className="max-w-6xl mx-auto text-center">
      <header className="mb-20">
        <h2
          id="categories-heading"
          className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-slate-900 bg-clip-text text-transparent leading-tight"
        >
          Shop by Category
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover the perfect shoe for your running style, terrain, and goals.
        </p>
      </header>

      <div className="grid sm:grid-cols-3 gap-8 mt-16">
        {CATEGORIES.map((category) => (
          <Link
            key={category.name}
            to={`/shop?category=${category.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="group relative p-12 rounded-3xl bg-gradient-to-br from-orange-500/5 via-orange-400/5 to-orange-500/10 
                       border-2 border-orange-200/50 hover:shadow-2xl hover:bg-orange-500/20 
                       hover:border-orange-400/70 hover:-translate-y-3 transition-all duration-500 
                       backdrop-blur-md flex items-center justify-center h-48 lg:h-56 text-center focus:outline-none 
                       focus:ring-4 focus:ring-orange-500/30"
            tabIndex={0}
          >
            <span
              className="text-3xl lg:text-4xl font-black text-gray-900 group-hover:text-orange-600 
                           transition-all duration-500 z-10 relative"
            >
              {category.name}
            </span>
            <div
              className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 
                           rounded-3xl -m-2 transition-opacity duration-500 blur-sm"
            />
            <ChevronRight
              className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 
                                     w-10 h-10 text-orange-500 transition-all duration-500 group-hover:translate-x-3 
                                     drop-shadow-lg"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </div>
  </section>
));

Categories.displayName = "Categories";
