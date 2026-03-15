import { memo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { CATEGORIES } from "../data/products";

export const Categories = memo(() => (
  <section
    className="py-24 px-6 bg-gradient-to-b from-gray-50 via-orange-50 to-gray-100"
    aria-labelledby="categories-heading"
  >
    <div className="max-w-6xl mx-auto text-center">
      {/* Header */}
      <header className="mb-16">
        <h2
          id="categories-heading"
          className="text-5xl lg:text-6xl font-extrabold mb-4 
                     bg-gradient-to-r from-gray-900 to-slate-900 bg-clip-text text-transparent leading-tight"
        >
          Shop by Category
        </h2>
        <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover the perfect shoe for your running style, terrain, and goals.
        </p>
      </header>

      {/* Category Grid */}
      <div className="grid sm:grid-cols-3 gap-8 mt-12">
        {CATEGORIES.map((category) => (
          <Link
            key={category.name}
            to={`/shop?category=${category.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="group relative flex items-center justify-center h-48 lg:h-56 
                       rounded-2xl bg-white shadow-md border border-gray-200 
                       transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg
                       focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            {/* Category Name */}
            <span
              className="text-2xl lg:text-3xl font-bold text-gray-900 
                             group-hover:text-orange-600 transition-colors duration-300 z-10 relative"
            >
              {category.name}
            </span>

            {/* Hover Overlay */}
            <div
              className="absolute inset-0 bg-orange-100 rounded-2xl 
                            opacity-0 group-hover:opacity-50 transition-opacity duration-300"
            />

            {/* Chevron Icon */}
            <ChevronRight
              className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 text-orange-500 
                         opacity-0 group-hover:opacity-100 transition-all duration-300 
                         group-hover:translate-x-2 drop-shadow-md"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </div>
  </section>
));

Categories.displayName = "Categories";
