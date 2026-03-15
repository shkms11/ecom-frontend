import { useState } from "react";
import { STORE_CONFIG } from "@/config/store.config";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const config = STORE_CONFIG.announcementBar;

  const [isVisible, setIsVisible] = useState<boolean>(config?.enabled ?? false);

  if (!config?.enabled || !isVisible) return null;

  const {
    message,
    freeShippingThreshold,
    bgColor,
    textColor,
    textSize,
    padding,
    ctaText,
    ctaLink,
  } = config;

  const announcementMessage = message.replace(
    "{amount}",
    formatCurrency(freeShippingThreshold),
  );

  const handleClose = () => {
    setIsVisible(false); // hide only for current render
  };

  return (
    <div
      className={`${bgColor} ${textColor} ${textSize} ${padding} w-full`}
      role="region"
      aria-label="Store announcement"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 relative">
        <span className="font-medium">{announcementMessage}</span>

        {ctaText && ctaLink && (
          <a
            href={ctaLink}
            className="underline font-semibold hover:opacity-80"
          >
            {ctaText}
          </a>
        )}

        <button
          onClick={handleClose}
          className="absolute right-0 p-1 hover:opacity-70"
          aria-label="Close announcement"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
