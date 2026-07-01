import { useState } from "react";
import { Truck, X } from "lucide-react";

import { STORE_CONFIG } from "@/config/store.config";
import { formatCurrency } from "@/shared/utils/formatCurrency";

export function AnnouncementBar() {
  const config = STORE_CONFIG.announcementBar;

  const [isVisible, setIsVisible] = useState(config?.enabled ?? false);

  if (!config?.enabled || !isVisible) {
    return null;
  }

  const announcementMessage = config.message.replace(
    "{amount}",
    formatCurrency(config.freeShippingThreshold),
  );

  return (
    <section
      role="region"
      aria-label="Store announcement"
      className="border-b border-orange-200 bg-orange-50"
    >
      <div className="relative mx-auto flex h-10 max-w-7xl items-center justify-center px-4">
        <div className="flex items-center gap-2 text-sm text-orange-700">
          <Truck className="h-4 w-4 shrink-0" aria-hidden="true" />

          <span>{announcementMessage}</span>

          {config.ctaText && config.ctaLink && (
            <a
              href={config.ctaLink}
              className="font-medium text-orange-600 transition-colors hover:text-orange-700 hover:underline"
            >
              {config.ctaText}
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label="Close announcement"
          className="absolute right-4 inline-flex h-7 w-7 items-center justify-center rounded-lg text-orange-500 transition-colors hover:bg-orange-100 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
