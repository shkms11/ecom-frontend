import { useEffect } from "react";
import { X, ShoppingCart } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { closeCart } from "../slices/cartUiSlice";
import { useGetCartQuery } from "../api/cartApi";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.cartUi.isOpen);

  const { data: cart, isLoading } = useGetCartQuery();

  const handleClose = () => dispatch(closeCart());

  // ESC close (good UX + industry standard)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        {/* Header */}
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 pr-4">
            {/* Loading */}
            {isLoading && (
              <div className="py-10 text-center text-sm text-muted-foreground">
                Loading cart...
              </div>
            )}

            {/* Empty state */}
            {!isLoading && (!cart?.items || cart.items.length === 0) && (
              <div className="py-10 text-center space-y-2">
                <ShoppingCart className="mx-auto w-10 h-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Your cart is empty
                </p>
              </div>
            )}

            {/* Cart items */}
            <div className="space-y-4 py-4">
              {cart?.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 border rounded-lg p-3"
                >
                  {/* Product image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-md border"
                  />

                  {/* Product info */}
                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-semibold">${item.price}</p>
                  </div>

                  {/* Remove button (UI only placeholder) */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      // TODO: dispatch remove item or mutation
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Footer */}
          {cart?.items?.length > 0 && (
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span>Total</span>
                <span className="font-semibold">${cart.total ?? 0}</span>
              </div>

              <Button className="w-full">Checkout</Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleClose}
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
