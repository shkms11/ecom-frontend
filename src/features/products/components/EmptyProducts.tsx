import { PackageSearch } from "lucide-react";

import { Card } from "@/components/ui/card";

export default function EmptyProducts() {
  return (
    <Card className="flex flex-col items-center justify-center py-20 text-center">
      <PackageSearch
        className="mb-4 h-10 w-10 text-muted-foreground"
        aria-hidden="true"
      />

      <h2 className="text-lg font-semibold">No products found</h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Try changing your filters or search again.
      </p>
    </Card>
  );
}
