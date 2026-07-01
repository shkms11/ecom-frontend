import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type HeaderSearchProps = {
  onSearch?: (query: string) => void;
  placeholder?: string;
};

export default function HeaderSearch({
  onSearch,
  placeholder = "Search products...",
}: HeaderSearchProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = query.trim();
    if (!value) return;

    onSearch?.(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="relative w-full max-w-2xl"
    >
      <label htmlFor="header-search" className="sr-only">
        Search products
      </label>

      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />

      <Input
        id="header-search"
        type="search"
        autoComplete="off"
        value={query}
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="h-10 pl-10 pr-14 transition-colors focus-visible:ring-1 focus-visible:ring-orange-600"
      />

      <Button
        type="submit"
        size="icon"
        variant="secondary"
        className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
        aria-label="Search"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
      </Button>
    </form>
  );
}
