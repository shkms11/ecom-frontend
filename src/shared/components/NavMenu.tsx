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
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 max-w-[85%] bg-white z-50
        shadow-2xl transform transition-transform duration-300 ease-out
        will-change-transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>

          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Close Menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col px-6 py-6 space-y-5 text-gray-700">
          <Link
            to="/"
            onClick={onClose}
            className="text-base font-medium hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/shop"
            onClick={onClose}
            className="text-base font-medium hover:text-blue-600 transition"
          >
            Shop
          </Link>

          <Link
            to="/categories"
            onClick={onClose}
            className="text-base font-medium hover:text-blue-600 transition"
          >
            Categories
          </Link>

          <Link
            to="/orders"
            onClick={onClose}
            className="text-base font-medium hover:text-blue-600 transition"
          >
            My Orders
          </Link>

          <Link
            to="/profile"
            onClick={onClose}
            className="text-base font-medium hover:text-blue-600 transition"
          >
            Profile
          </Link>
        </nav>
      </aside>
    </>
  );
};
