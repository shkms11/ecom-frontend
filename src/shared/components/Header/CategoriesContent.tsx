import { Link } from "react-router-dom";

export const CategoriesContent = () => {
  const categories = [
    {
      name: "Men",
      subcategories: ["Running Shoes", "Trail Shoes", "Apparel", "Socks"],
      href: "/categories/men",
    },
    {
      name: "Women",
      subcategories: ["Running Shoes", "Trail Shoes", "Apparel", "Socks"],
      href: "/categories/women",
    },
    {
      name: "Accessories",
      subcategories: ["Socks", "Insoles", "Watches", "Hydration"],
      href: "/categories/accessories",
    },
    {
      name: "Sale",
      subcategories: ["Men Sale", "Women Sale", "Accessories Sale"],
      href: "/categories/sale",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full grid grid-cols-4 gap-6">
      {categories.map((cat) => (
        <div key={cat.name} className="flex flex-col">
          {/* Main category */}
          <Link
            to={cat.href}
            className="font-bold text-gray-800 hover:text-orange-600 mb-2 text-lg transition-colors"
          >
            {cat.name}
          </Link>

          {/* Subcategories */}
          <div className="flex flex-col space-y-1">
            {cat.subcategories.map((sub) => (
              <Link
                key={sub}
                to={`${cat.href}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-gray-600 text-sm hover:text-orange-500 transition-colors"
              >
                {sub}
              </Link>
            ))}
          </div>

          {/* Optional promo/banner placeholder */}
          <div className="mt-4 hidden lg:block">
            <div className="h-16 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs italic">
              Promo / Banner
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
