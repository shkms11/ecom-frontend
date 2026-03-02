import { memo } from "react";
import { FEATURES } from "../data/products";
import {
  TruckIcon,
  ShieldCheckIcon,
  BoltIcon, // ✅ Correct name (not ZapIcon)
} from "@heroicons/react/24/outline";

const iconMap = {
  truck: TruckIcon,
  "shield-check": ShieldCheckIcon,
  zap: BoltIcon, // ✅ Maps 'zap' string to BoltIcon component
} as const;

export const Features = memo(() => (
  <section
    className="py-28 px-6 bg-gradient-to-b from-gray-50/50 to-white"
    aria-labelledby="features-heading"
  >
    <div className="max-w-6xl mx-auto">
      <header className="text-center mb-24">
        <h2
          id="features-heading"
          className="text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-gray-900 to-slate-900 bg-clip-text text-transparent"
        >
          Why Runners Choose Us
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Engineered for elite performance with features that runners demand
          most.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-10">
        {FEATURES.map((feature) => {
          const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
          return (
            <article
              key={feature.title}
              className="group text-center p-8 lg:p-12 hover:bg-white/60 transition-all duration-300 rounded-3xl backdrop-blur-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-4"
            >
              <div
                className="w-28 h-28 mx-auto mb-10 bg-gradient-to-br from-orange-500 to-orange-600 
                           rounded-3xl flex items-center justify-center shadow-2xl 
                           group-hover:scale-110 group-hover:shadow-3xl group-hover:rotate-3 
                           transition-all duration-500 hover:drop-shadow-2xl"
              >
                <IconComponent className="w-14 h-14 text-white drop-shadow-2xl" />
              </div>
              <h3 className="text-3xl lg:text-3xl font-black mb-6 text-gray-900 group-hover:text-orange-600 transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                {feature.description}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  </section>
));

Features.displayName = "Features";
