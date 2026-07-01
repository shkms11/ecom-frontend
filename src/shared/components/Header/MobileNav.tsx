import { NavLink } from "react-router-dom";

type NavItem = {
  label: string;
  href: string;
};

type MobileNavProps = {
  items: NavItem[];
  onNavigate?: () => void;
};

export default function MobileNav({ items, onNavigate }: MobileNavProps) {
  return (
    <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
      {items.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          onClick={onNavigate}
          className={({ isActive }) =>
            [
              "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600",
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
  );
}
