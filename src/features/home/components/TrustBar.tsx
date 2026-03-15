import { memo } from "react";
import clsx from "clsx";

import { TRUST_ITEMS } from "../data/trustItems";

export const TrustBar = memo(() => {
  return (
    <section
      className={clsx(
        "py-12 lg:py-14",
        "bg-gradient-to-b from-gray-50 to-gray-100", // simplified subtle gradient
        "border-t border-b border-gray-200",
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={clsx(
            "grid",
            "grid-cols-2 sm:grid-cols-4",
            "gap-8 lg:gap-12",
            "text-center",
          )}
        >
          {TRUST_ITEMS.map(({ icon: Icon, title, subtitle }) => (
            <div
              key={`${title}-${subtitle}`}
              className={clsx(
                "group flex flex-col items-center",
                "p-6 lg:p-8 rounded-2xl",
                "bg-white shadow-md", // soft card shadow
                "transition-transform duration-300",
                "hover:-translate-y-1 hover:shadow-lg", // smooth hover
              )}
            >
              <div
                className={clsx(
                  "w-20 h-20 lg:w-24 lg:h-24 mb-6",
                  "flex items-center justify-center rounded-xl",
                  "bg-orange-50 text-orange-600",
                  "transition-transform duration-300 group-hover:scale-110",
                )}
              >
                <Icon
                  className="w-12 h-12 lg:w-14 lg:h-14"
                  aria-hidden="true"
                />
              </div>

              <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
                {title}
              </h3>

              <p className="text-sm lg:text-base text-gray-500 uppercase tracking-wide">
                {subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

TrustBar.displayName = "TrustBar";
