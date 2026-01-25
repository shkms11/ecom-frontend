import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">ShopFlow</h3>
          <p className="text-sm">
            A modern, secure and fast e-commerce experience built for scale.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/help">Help Center</Link>
            </li>
            <li>
              <Link to="/returns">Returns</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} ShopFlow. All rights reserved.
      </div>
    </footer>
  );
};
