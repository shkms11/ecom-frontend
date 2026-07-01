import { memo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { CATEGORIES } from "../data";

export const Categories = memo(() => {
  return (
    <section className="border-t border-border bg-background py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="mb-10 lg:mb-14 text-center">
          <h2
            id="categories-heading"
            className="text-3xl lg:text-4xl font-semibold tracking-tight text-foreground mb-3"
          >
            Shop by Category
          </h2>

          <p className="text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto">
            Discover the perfect shoe for your running style, terrain, and
            goals.
          </p>
        </header>

        {/* Grid */}
        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              to={`/shop?category=${category.slug}`}
              className="group relative flex items-center justify-between px-6 py-6
                         rounded-lg border border-border bg-background
                         hover:border-orange-200
                         transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-orange-200"
              title={`Shop ${category.name}`}
            >
              {/* Name */}
              <span className="text-base lg:text-lg font-semibold text-foreground group-hover:text-orange-600 transition-colors">
                {category.name}
              </span>

              {/* Arrow */}
              <ChevronRight
                className="w-5 h-5 text-muted-foreground group-hover:text-orange-600 group-hover:translate-x-1 transition-all duration-200"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
});

Categories.displayName = "Categories";
