import { Link } from "react-router-dom";

type HeaderLogoProps = {
  label?: string;
};

export default function HeaderLogo({ label = "Store" }: HeaderLogoProps) {
  return (
    <Link
      to="/"
      aria-label="Go to homepage"
      className="group inline-flex items-center gap-2 whitespace-nowrap rounded-md px-1 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600"
    >
      {/* Brand mark */}
      <span
        aria-hidden="true"
        className="h-2.5 w-2.5 rounded-full bg-orange-600 transition-transform duration-200 group-hover:scale-110"
      />

      {/* Brand name */}
      <span className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-orange-600">
        {label}
      </span>
    </Link>
  );
}
