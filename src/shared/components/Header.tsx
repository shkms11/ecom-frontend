import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart, User } from "lucide-react";
import { NavMenu } from "@/shared/components";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBar, setShowBar] = useState(true);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Don't hide if mobile menu is open
      if (menuOpen) {
        setShowBar(true);
        return;
      }

      // Add small threshold to avoid jitter
      if (Math.abs(currentScrollY - lastScrollY.current) < 10) {
        return;
      }

      if (currentScrollY < 10) {
        setShowBar(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowBar(false); // scrolling down
      } else {
        setShowBar(true); // scrolling up
      }

      lastScrollY.current = currentScrollY;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Header Wrapper (moves together) */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out ${
          showBar ? "translate-y-0" : "-translate-y-10"
        }`}
      >
        {/* Announcement Bar */}
        <div className="bg-blue-600 text-white text-sm text-center py-2 px-4">
          🎉 Free Shipping on orders over $50!
        </div>

        {/* Main Header */}
        <header className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <Menu size={22} />
              </button>

              <Link to="/" className="text-xl font-bold text-blue-600">
                ShopFlow
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
              <Link className="hover:text-blue-600" to="/">
                Home
              </Link>
              <Link className="hover:text-blue-600" to="/shop">
                Shop
              </Link>
              <Link className="hover:text-blue-600" to="/categories">
                Categories
              </Link>
              <Link className="hover:text-blue-600" to="/about">
                About
              </Link>
              <Link className="hover:text-blue-600" to="/contact">
                Contact
              </Link>
            </nav>

            {/* Right */}
            <div className="flex items-center gap-4">
              <Link
                to="/cart"
                className="relative p-2 hover:bg-gray-100 rounded"
              >
                <ShoppingCart size={22} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>

              <Link to="/login" className="p-2 hover:bg-gray-100 rounded">
                <User size={22} />
              </Link>
            </div>
          </div>
        </header>
      </div>

      {/* Push page content down */}
      <div className="h-[104px]" />

      <NavMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};
