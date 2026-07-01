import { Link } from "react-router-dom";
import { User } from "lucide-react";

import CartButton from "./CartButton";

import { Button } from "@/components/ui/button";

type HeaderActionsProps = {
  cartCount?: number;
  onCartClick?: () => void;
  isLoggedIn?: boolean;
};

export default function HeaderActions({
  cartCount = 0,
  onCartClick,
  isLoggedIn = false,
}: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {/* Cart */}
      <CartButton count={cartCount} onClick={onCartClick} />

      {/* Auth / User */}
      {isLoggedIn ? (
        <Button asChild variant="ghost" size="icon">
          <Link to="/dashboard" aria-label="Account">
            <User className="h-5 w-5" aria-hidden="true" />
          </Link>
        </Button>
      ) : (
        <Button asChild variant="ghost" className="text-sm font-medium">
          <Link to="/auth">Sign in</Link>
        </Button>
      )}
    </div>
  );
}
