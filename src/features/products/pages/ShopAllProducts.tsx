import { memo, useState, useCallback, useMemo, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; // Assuming React Router
import { ChevronLeft, ChevronRight, Funnel, ArrowLeft } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import type { Product } from "@/features/products/types/product.types";
import { SHOP_PRODUCTS } from "@/features/products/data/mockProducts";
import ProductDetailPage from "./ProductDetailsPage";

type SortOption = "featured" | "newest" | "price-low" | "price-high";

export default memo(function ShopAllProducts() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>("featured");
  const [shoeFilter, setShoeFilter] = useState(true);
  const [clothingFilter, setClothingFilter] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [showDetailOverlay, setShowDetailOverlay] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  // Auto-open detail if coming from URL (e.g., /shop/:productId)
  useEffect(() => {
    if (params.productId) {
      const product = SHOP_PRODUCTS.find((p) => p.id === params.productId);
      if (product) {
        setSelectedProductId(params.productId);
        setShowDetailOverlay(true);
      } else {
        navigate("/shop"); // Invalid ID, redirect
      }
    }
  }, [params.productId, navigate]);

  const selectedProduct = useMemo(
    () =>
      selectedProductId
        ? SHOP_PRODUCTS.find((p) => p.id === selectedProductId)
        : null,
    [selectedProductId],
  );

  const filteredProducts = useMemo(() => {
    let products = [...SHOP_PRODUCTS];

    // Filter by category
    if (shoeFilter && !clothingFilter) {
      products = products.filter((p) => p.category === "shoes");
    } else if (!shoeFilter && clothingFilter) {
      products = products.filter((p) => p.category === "clothing");
    }

    // Sort
    switch (sort) {
      case "newest":
        return products.slice().reverse();
      case "price-low":
        return products.slice().sort((a, b) => a.price - b.price);
      case "price-high":
        return products.slice().sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  }, [sort, shoeFilter, clothingFilter]);

  const handleAddToCart = useCallback((product: Product) => {
    console.log("Add to cart:", product);
  }, []);

  const handleProductClick = useCallback(
    (productId: string) => {
      setSelectedProductId(productId);
      setShowDetailOverlay(true);
      // Optional: Update URL
      // navigate(`/shop/${productId}`);
    },
    [navigate],
  );

  const closeDetail = useCallback(() => {
    setShowDetailOverlay(false);
    setSelectedProductId(null);
    // Optional: Clear URL
    // navigate("/shop");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 relative">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between mb-10 gap-4">
          <h1 className="text-3xl font-bold">Shop Collection</h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="lg:hidden flex items-center gap-2 border px-3 py-2 rounded-lg"
            >
              <Funnel className="w-4 h-4" /> Filters
            </button>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="border px-3 py-2 rounded-lg"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Low → High</option>
              <option value="price-high">High → Low</option>
            </select>
          </div>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="bg-white p-6 rounded-2xl border">
              <h3 className="font-semibold mb-4">Filters</h3>

              <label className="flex gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={shoeFilter}
                  onChange={(e) => setShoeFilter(e.target.checked)}
                />
                Shoes
              </label>

              <label className="flex gap-2">
                <input
                  type="checkbox"
                  checked={clothingFilter}
                  onChange={(e) => setClothingFilter(e.target.checked)}
                />
                Clothing
              </label>
            </div>
          </aside>

          {/* Products Grid */}
          <div>
            {filteredProducts.length === 0 ? (
              <p className="text-center text-gray-500">No products found</p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="cursor-pointer group"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <ProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-12 flex justify-center gap-2">
                  <button className="p-2 border rounded-lg">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="p-2 border rounded-lg bg-orange-500 text-white">
                    1
                  </button>
                  <button className="p-2 border rounded-lg">2</button>
                  <button className="p-2 border rounded-lg">3</button>
                  <button className="p-2 border rounded-lg">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Product Detail Overlay */}
      {showDetailOverlay && selectedProduct && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={closeDetail}
          />

          {/* Mobile Fullscreen Detail */}
          <div className="fixed inset-0 z-50 lg:hidden bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <button
                onClick={closeDetail}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">Product Details</h2>
            </div>
            <ProductDetailPage product={selectedProduct} />
          </div>
        </>
      )}

      {/* Desktop Detail Sidebar */}
      {showDetailOverlay && selectedProduct && (
        <div className="hidden lg:block fixed right-0 top-0 h-full w-[500px] z-40 bg-white shadow-2xl overflow-y-auto border-l transform transition-transform">
          <div className="p-6 sticky top-0 bg-white border-b">
            <button
              onClick={closeDetail}
              className="mb-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">
            <ProductDetailPage product={selectedProduct} />
          </div>
        </div>
      )}
    </div>
  );
});
