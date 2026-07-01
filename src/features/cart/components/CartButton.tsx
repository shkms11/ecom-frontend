import { ShoppingCart } from "lucide-react";

import { useAppDispatch } from "@/app/hooks";
import { openCart } from "../slices/cartUiSlice";
import { useGetCartQuery } from "../api/cartApi";

import { Button } from "@/components/ui/button";

export default function CartButton() {
  const dispatch = useAppDispatch();

  const { data: cart } = useGetCartQuery();

  const itemCount =
    cart?.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) ??
    0;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => dispatch(openCart())}
      className="relative hover:bg-orange-50 transition-colors"
    >
      <ShoppingCart className="w-5 h-5" />

      {/* Badge */}
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-[10px] rounded-full flex items-center justify-center">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Button>
  );
}
