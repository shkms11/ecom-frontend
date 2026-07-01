import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { categories } from "@/shared/constants/categories";

export default function CategoriesDropdown() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-auto bg-transparent px-0 text-sm font-medium text-muted-foreground hover:bg-transparent hover:text-foreground focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-orange-600">
            Categories
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <div className="grid w-[560px] grid-cols-2 gap-6 p-6">
              {categories.map((category) => (
                <div key={category.id} className="space-y-3">
                  <Link
                    to={category.href}
                    className="block text-sm font-semibold text-foreground transition-colors hover:text-orange-600"
                  >
                    {category.name}
                  </Link>

                  <ul className="space-y-2">
                    {category.subcategories.map((subcategory) => (
                      <li key={subcategory}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={`${category.href}/${subcategory
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {subcategory}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
