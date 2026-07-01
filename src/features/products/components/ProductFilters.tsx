import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

type ProductFiltersProps = {
  shoeFilter: boolean;
  clothingFilter: boolean;
  onShoeChange: (checked: boolean) => void;
  onClothingChange: (checked: boolean) => void;
};

export default function ProductFilters({
  shoeFilter,
  clothingFilter,
  onShoeChange,
  onClothingChange,
}: ProductFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Category */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold">Category</h3>

        <div className="space-y-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-md transition-colors hover:bg-muted/50">
            <Checkbox
              id="filter-shoes"
              checked={shoeFilter}
              onCheckedChange={(checked) => onShoeChange(Boolean(checked))}
            />

            <span className="text-sm">Shoes</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-md transition-colors hover:bg-muted/50">
            <Checkbox
              id="filter-clothing"
              checked={clothingFilter}
              onCheckedChange={(checked) => onClothingChange(Boolean(checked))}
            />

            <span className="text-sm">Clothing</span>
          </label>
        </div>
      </section>

      <Separator />

      {/* Future Filters */}
      {/*
      <section className="space-y-4">
        <h3 className="text-sm font-semibold">Brand</h3>
      </section>

      <Separator />

      <section className="space-y-4">
        <h3 className="text-sm font-semibold">Size</h3>
      </section>

      <Separator />

      <section className="space-y-4">
        <h3 className="text-sm font-semibold">Color</h3>
      </section>

      <Separator />

      <section className="space-y-4">
        <h3 className="text-sm font-semibold">Price</h3>
      </section>
      */}
    </div>
  );
}
