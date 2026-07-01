import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { ProductSummary } from "@/features/products/types/product.types";
import { SHOP_PRODUCTS } from "@/features/products/data/mockProducts";

import { ProductCard } from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import ProductToolbar from "../components/ProductToolbar";
import ProductPagination from "../components/ProductPagination";
import EmptyProducts from "../components/EmptyProducts";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type SortOption = "featured" | "newest" | "price-low" | "price-high";

const ITEMS_PER_PAGE = 6;

export default function AllProductsPage() {
  const navigate = useNavigate();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    shoes: true,
    clothing: false,
    sort: "featured" as SortOption,
  });

  const updateFilters = (values: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...values }));
    setCurrentPage(1);
  };

  const products = useMemo(() => {
    let list = [...SHOP_PRODUCTS];

    if (filters.shoes !== filters.clothing) {
      list = list.filter(
        (product) =>
          product.category === (filters.shoes ? "shoes" : "clothing"),
      );
    }

    switch (filters.sort) {
      case "newest":
        list.reverse();
        break;

      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
    }

    return list;
  }, [filters]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const visibleProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const filterContent = (
    <ProductFilters
      shoeFilter={filters.shoes}
      clothingFilter={filters.clothing}
      onShoeChange={(checked) => updateFilters({ shoes: checked })}
      onClothingChange={(checked) => updateFilters({ clothing: checked })}
    />
  );

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <ProductToolbar
          totalProducts={products.length}
          sort={filters.sort}
          onSortChange={(sort) => updateFilters({ sort })}
          onOpenFilters={() => setFiltersOpen(true)}
        />

        <Separator className="mb-8" />

        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Desktop Filters */}
          <aside className="hidden lg:block">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>

              <CardContent>{filterContent}</CardContent>
            </Card>
          </aside>

          {/* Products */}
          <section>
            {visibleProducts.length ? (
              <>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={console.log}
                      onClick={() => navigate(`/shop/${product.id}`)}
                    />
                  ))}
                </div>

                <ProductPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <EmptyProducts />
            )}
          </section>
        </div>
      </div>

      {/* Mobile Filters */}
      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>

          <div className="mt-6">{filterContent}</div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
