import { NavLink } from "react-router-dom";

import CategoriesDropdown from "./CategoriesDropdown";

type NavItem = {
  label: string;
  href: string;
};

type HeaderNavProps = {
  items?: NavItem[];
};

const defaultItems: NavItem[] = [
  { label: "Shop", href: "/shop" },
  { label: "Deals", href: "/deals" },
];

export default function HeaderNav({ items = defaultItems }: HeaderNavProps) {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    [
      "whitespace-nowrap rounded-md px-1 py-1 text-sm font-medium transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600",
      isActive
        ? "text-orange-600"
        : "text-muted-foreground hover:text-foreground",
    ].join(" ");

  return (
    <nav aria-label="Primary navigation" className="flex items-center gap-8">
      {items.slice(0, 1).map((item) => (
        <NavLink key={item.href} to={item.href} className={linkClasses}>
          {item.label}
        </NavLink>
      ))}

      <CategoriesDropdown />

      {items.slice(1).map((item) => (
        <NavLink key={item.href} to={item.href} className={linkClasses}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
