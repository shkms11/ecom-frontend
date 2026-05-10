import { memo, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Funnel, PackageSearch } from "lucide-react";

import { ProductCard } from "../components/ProductCard";
import type { ProductSummary } from "@/features/products/types/product.types";
import { SHOP_PRODUCTS } from "@/features/products/data/mockProducts";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type SortOption = "featured" | "newest" | "price-low" | "price-high";

const ITEMS_PER_PAGE = 6;

export default memo(function ShopAllProducts() {
  const navigate = useNavigate();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>("featured");

  const [shoeFilter, setShoeFilter] = useState(true);
  const [clothingFilter, setClothingFilter] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const resetPage = useCallback(() => setCurrentPage(1), []);

  const filteredProducts = useMemo(() => {
    let products = [...SHOP_PRODUCTS];

    if (shoeFilter && !clothingFilter) {
      products = products.filter((p) => p.category === "shoes");
    } else if (!shoeFilter && clothingFilter) {
      products = products.filter((p) => p.category === "clothing");
    }

    switch (sort) {
      case "newest":
        return [...products].reverse();

      case "price-low":
        return [...products].sort((a, b) => a.price - b.price);

      case "price-high":
        return [...products].sort((a, b) => b.price - a.price);

      default:
        return products;
    }
  }, [sort, shoeFilter, clothingFilter]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  const handleAddToCart = useCallback((product: ProductSummary) => {
    console.log("Add to cart:", product);
  }, []);

  const handleProductClick = useCallback(
    (id: string | number) => {
      navigate(`/shop/${id}`);
    },
    [navigate],
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-[1400px] px-4 py-8">
        {/* HEADER */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Shop Collection</h1>
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} products available
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setFiltersOpen(true)}
            >
              <Funnel className="mr-2 h-4 w-4" />
              Filters
            </Button>

            <Select
              value={sort}
              onValueChange={(v) => {
                setSort(v as SortOption);
                resetPage();
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort products" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Low → High</SelectItem>
                <SelectItem value="price-high">High → Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator className="mb-6" />

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={shoeFilter}
                    onCheckedChange={(v) => {
                      setShoeFilter(Boolean(v));
                      resetPage();
                    }}
                  />
                  <span>Shoes</span>
                  {shoeFilter && <Badge>Active</Badge>}
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={clothingFilter}
                    onCheckedChange={(v) => {
                      setClothingFilter(Boolean(v));
                      resetPage();
                    }}
                  />
                  <span>Clothing</span>
                  {clothingFilter && <Badge>Active</Badge>}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* PRODUCTS */}
          <section>
            {paginatedProducts.length === 0 ? (
              <Card className="py-20 text-center">
                <PackageSearch className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
                <p>No products found.</p>
              </Card>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onClick={() => handleProductClick(product.id)}
                    />
                  ))}
                </div>

                {/* PAGINATION */}
                <div className="mt-10 flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i}
                      size="icon"
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      onClick={() => goToPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </section>
        </div>
      </div>

      {/* MOBILE FILTERS */}
      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={shoeFilter}
                onCheckedChange={(v) => {
                  setShoeFilter(Boolean(v));
                  resetPage();
                }}
              />
              Shoes
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                checked={clothingFilter}
                onCheckedChange={(v) => {
                  setClothingFilter(Boolean(v));
                  resetPage();
                }}
              />
              Clothing
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
});
