import { useState } from "react";

import { AnnouncementBar } from "./AnnouncementBar";
import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";
import HeaderActions from "./HeaderActions";
import MobileMenu from "./MobileMenu";

import { useHeaderScroll } from "@/hooks/useHeaderScroll";

export function Header() {
  const { showBar } = useHeaderScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-200 ${
          showBar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <AnnouncementBar />

        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
            {/* Mobile Left */}
            <div className="flex flex-1 items-center lg:hidden">
              <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
            </div>

            {/* Desktop Left */}
            <div className="hidden lg:flex items-center gap-8 shrink-0">
              <HeaderLogo label="ShopFlow" />
              <HeaderNav />
            </div>

            {/* Center */}
            <div className="flex flex-1 justify-center px-4">
              {/* Mobile Logo */}
              <div className="lg:hidden">
                <HeaderLogo label="ShopFlow" />
              </div>

              {/* Desktop Search */}
              <div className="hidden w-full max-w-xl lg:block">
                <HeaderSearch />
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-1 justify-end items-center">
              <HeaderActions />
            </div>
          </div>
        </header>
      </div>

      <div className="h-[104px]" />
    </>
  );
}
