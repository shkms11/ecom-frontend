import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import HeaderSearch from "./HeaderSearch";

import { categories } from "@/shared/constants/categories";

type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const navigation = [
  { label: "Shop", href: "/shop" },
  { label: "Deals", href: "/deals" },
];

const navItemClass =
  "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600";

export default function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex h-full flex-col overflow-y-auto pb-8">
          {/* Search */}
          <HeaderSearch />

          {/* Navigation */}
          <nav
            aria-label="Mobile navigation"
            className="mt-6 flex flex-col gap-1"
          >
            {navigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={close}
                className={({ isActive }) =>
                  [
                    navItemClass,
                    isActive
                      ? "text-orange-600"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Categories */}
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="categories" className="border-none">
              <AccordionTrigger className="rounded-md px-3 py-2 text-sm font-medium hover:no-underline">
                Categories
              </AccordionTrigger>

              <AccordionContent className="pt-2">
                <div className="space-y-6">
                  {categories.map((category) => (
                    <div key={category.id}>
                      <Link
                        to={category.href}
                        onClick={close}
                        className="block rounded-md px-3 py-1 text-sm font-semibold text-foreground transition-colors duration-200 hover:text-orange-600"
                      >
                        {category.name}
                      </Link>

                      <div className="mt-2 ml-4 flex flex-col gap-1">
                        {category.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory}
                            to={`${category.href}/${subcategory
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            onClick={close}
                            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                          >
                            {subcategory}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Divider */}
          <div className="my-6 border-t border-border" />

          {/* Secondary */}
          <nav aria-label="Account navigation" className="flex flex-col gap-1">
            <Link
              to="/account"
              onClick={close}
              className={`${navItemClass} text-muted-foreground hover:text-foreground`}
            >
              Account
            </Link>

            <Link
              to="/cart"
              onClick={close}
              className={`${navItemClass} text-muted-foreground hover:text-foreground`}
            >
              Cart
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
