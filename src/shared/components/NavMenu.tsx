import { Link } from "react-router-dom";

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavMenu = ({ isOpen, onClose }: NavMenuProps) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Side Menu */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:hidden`}
      >
        <div className="p-5 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
        </div>

        <nav className="flex flex-col p-4 space-y-3">
          <Link to="/" onClick={onClose} className="nav-item">
            Home
          </Link>
          <Link to="/shop" onClick={onClose} className="nav-item">
            Shop
          </Link>
          <Link to="/categories" onClick={onClose} className="nav-item">
            Categories
          </Link>
          <Link to="/orders" onClick={onClose} className="nav-item">
            My Orders
          </Link>
          <Link to="/profile" onClick={onClose} className="nav-item">
            Profile
          </Link>
        </nav>
      </aside>
    </>
  );
};
