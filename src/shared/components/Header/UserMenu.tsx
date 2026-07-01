import { Link } from "react-router-dom";
import { User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type UserMenuProps = {
  isLoggedIn?: boolean;
  userName?: string;
  onSignOut?: () => void;
};

export default function UserMenu({
  isLoggedIn = false,
  userName = "User",
  onSignOut,
}: UserMenuProps) {
  if (!isLoggedIn) {
    return (
      <Button
        asChild
        type="button"
        variant="ghost"
        className="transition-colors"
      >
        <Link to="/login">Sign in</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`${userName} menu`}
          className="transition-colors focus-visible:ring-2 focus-visible:ring-orange-600"
        >
          <User className="h-5 w-5" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>{userName}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/account">My Account</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/orders">Orders</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/wishlist">Wishlist</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onSignOut}
          className="text-destructive focus:text-destructive"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
