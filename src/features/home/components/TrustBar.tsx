import { memo } from "react";

import { TRUST_ITEMS } from "../data/trustItems";

export const TrustBar = memo(() => {
  return (
    <section className="border-y border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
          {TRUST_ITEMS.map(({ icon: Icon, title, subtitle }) => (
            <div
              key={`${title}-${subtitle}`}
              className="flex flex-col items-center text-center gap-3"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center text-orange-600">
                <Icon className="w-6 h-6" aria-hidden="true" />
              </div>

              {/* Content */}
              <h3 className="text-base font-semibold text-foreground">
                {title}
              </h3>

              <p className="text-sm text-muted-foreground uppercase tracking-wide">
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
