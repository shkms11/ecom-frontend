import { memo } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/images/banners/shoeHero.jpg";

export const Hero = memo(() => {
  return (
    <section className="bg-background px-6 lg:px-16 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-tight">
            Run Faster. <span className="text-orange-600">Go Further.</span>
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
            Elite running shoes engineered for performance, comfort, and style.
            Built for runners who demand more from every step.
          </p>

          {/* Headline CTAs */}
          <div className="flex items-center gap-4">
            <Link to="/shop">
              <Button className="shadow-sm hover:shadow-md transition-shadow">
                Shop Collection
              </Button>
            </Link>

            <Link to="/collections">
              <Button
                variant="outline"
                className="border-orange-200 text-foreground hover:border-orange-300 hover:text-orange-600 transition-colors"
              >
                Explore
              </Button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative rounded-lg border border-border overflow-hidden">
          <img
            src={heroBanner}
            alt="Premium running shoes collection"
            className="w-full h-[420px] object-cover"
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
