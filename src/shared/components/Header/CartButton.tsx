import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";

type CartButtonProps = {
  count?: number;
  onClick?: () => void;
};

export default function CartButton({ count = 0, onClick }: CartButtonProps) {
  const label =
    count > 0
      ? `Shopping cart with ${count} item${count === 1 ? "" : "s"}`
      : "Shopping cart";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={label}
      className="relative transition-colors hover:text-orange-600"
    >
      <ShoppingCart className="h-5 w-5" aria-hidden="true" />

      {count > 0 && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-orange-600 text-[10px] font-medium tabular-nums text-white"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Button>
  );
}
