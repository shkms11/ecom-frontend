import { memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/components";
import heroBanner from "@/assets/images/banners/shoe-hero.jpg";

export const Hero = memo(() => (
  <section
    className="relative min-h-[85vh] flex items-center 
                      bg-gradient-to-br from-zinc-800 via-slate-800 to-gray-900 
                      px-6 lg:px-16 overflow-hidden select-none"
  >
    <div className="absolute inset-0 bg-grid-white/[0.03] [background-position:left_top] opacity-50" />

    <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
      <div className="lg:pr-12">
        <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Run Faster.{" "}
          <span className="from-orange-500 to-orange-400 bg-gradient-to-r bg-clip-text text-transparent">
            Go Further.
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
          Elite running shoes engineered for performance, comfort, and style.
          Built by runners, for runners.
        </p>
        <Link to="/shop">
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 
                             px-10 py-4 text-lg font-semibold rounded-xl transition-all duration-300 
                             hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Shop Collection
          </Button>
        </Link>
      </div>

      <div className="relative h-96 lg:h-[28rem] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
        <img
          src={heroBanner}
          alt="Elite running shoes collection - premium performance footwear"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          sizes="(max-width: 1024px) 100vw, 50vw"
          decoding="async"
          draggable={false}
        />
      </div>
    </div>
  </section>
));

Hero.displayName = "Hero";
