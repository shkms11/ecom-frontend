import { Funnel } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "featured" | "newest" | "price-low" | "price-high";

type ProductToolbarProps = {
  totalProducts: number;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  onOpenFilters: () => void;
};

export default function ProductToolbar({
  totalProducts,
  sort,
  onSortChange,
  onOpenFilters,
}: ProductToolbarProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Shop Collection
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          {totalProducts} products available
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" className="lg:hidden" onClick={onOpenFilters}>
          <Funnel className="mr-2 h-4 w-4" />
          Filters
        </Button>

        <Select
          value={sort}
          onValueChange={(value) => onSortChange(value as SortOption)}
        >
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
