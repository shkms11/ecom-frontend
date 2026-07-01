import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">
            ShopFlow
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A modern, fast e-commerce experience built for performance and
            clarity.
          </p>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Company
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/careers"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Support
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/help"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                to="/returns"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Returns
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} ShopFlow. All rights reserved.
          </p>

          <p className="text-muted-foreground">
            Built for performance and clarity
          </p>
        </div>
      </div>
    </footer>
  );
};
