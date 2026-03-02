import { useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavMenu = ({ isOpen, onClose }: NavMenuProps) => {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 max-w-[90vw] bg-white/95 backdrop-blur-xl z-50 shadow-2xl
          transform transition-all duration-300 ease-out border-r border-orange-100
          will-change-transform lg:hidden ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-orange-100 bg-orange-50/50">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-orange-100 focus:bg-orange-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            aria-label="Close menu"
          >
            <X size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="flex flex-col px-6 py-8 space-y-1 text-gray-700"
          role="navigation"
        >
          <Link
            to="/"
            onClick={onClose}
            className="group relative py-3 px-4 rounded-xl font-semibold text-lg hover:text-orange-600 hover:bg-orange-50 focus:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200"
          >
            <span className="relative z-10">Home</span>
            <div className="absolute inset-0 bg-orange-500/10 rounded-xl -m-2 scale-0 group-hover:scale-100 transition-transform origin-left duration-200 opacity-0 group-hover:opacity-100" />
          </Link>

          <Link
            to="/shop"
            onClick={onClose}
            className="group relative py-3 px-4 rounded-xl font-semibold text-lg hover:text-orange-600 hover:bg-orange-50 focus:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200"
          >
            <span className="relative z-10">Shop</span>
            <div className="absolute inset-0 bg-orange-500/10 rounded-xl -m-2 scale-0 group-hover:scale-100 transition-transform origin-left duration-200 opacity-0 group-hover:opacity-100" />
          </Link>

          <Link
            to="/categories"
            onClick={onClose}
            className="group relative py-3 px-4 rounded-xl font-semibold text-lg hover:text-orange-600 hover:bg-orange-50 focus:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200"
          >
            <span className="relative z-10">Categories</span>
            <div className="absolute inset-0 bg-orange-500/10 rounded-xl -m-2 scale-0 group-hover:scale-100 transition-transform origin-left duration-200 opacity-0 group-hover:opacity-100" />
          </Link>

          <Link
            to="/orders"
            onClick={onClose}
            className="group relative py-3 px-4 rounded-xl font-semibold text-lg hover:text-orange-600 hover:bg-orange-50 focus:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200"
          >
            <span className="relative z-10">My Orders</span>
            <div className="absolute inset-0 bg-orange-500/10 rounded-xl -m-2 scale-0 group-hover:scale-100 transition-transform origin-left duration-200 opacity-0 group-hover:opacity-100" />
          </Link>

          <Link
            to="/profile"
            onClick={onClose}
            className="group relative py-3 px-4 rounded-xl font-semibold text-lg hover:text-orange-600 hover:bg-orange-50 focus:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200"
          >
            <span className="relative z-10">Profile</span>
            <div className="absolute inset-0 bg-orange-500/10 rounded-xl -m-2 scale-0 group-hover:scale-100 transition-transform origin-left duration-200 opacity-0 group-hover:opacity-100" />
          </Link>
        </nav>
      </aside>
    </>
  );
};
