import { memo } from "react";

export const TrustBar = memo(() => (
  <section className="py-10 bg-zinc-900/20 backdrop-blur-sm border-y border-zinc-700/30">
    <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
      <div className="flex flex-col items-center p-4">
        <span className="text-3xl font-black text-orange-500 mb-2 tracking-tight">
          Free Shipping
        </span>
        <span className="text-gray-300 font-medium text-sm uppercase tracking-wide">
          Over $100
        </span>
      </div>
      <div className="flex flex-col items-center p-4">
        <span className="text-3xl font-black text-orange-500 mb-2 tracking-tight">
          30-Day
        </span>
        <span className="text-gray-300 font-medium text-sm uppercase tracking-wide">
          Returns
        </span>
      </div>
      <div className="flex flex-col items-center p-4">
        <span className="text-3xl font-black text-orange-500 mb-2 tracking-tight">
          2-Year
        </span>
        <span className="text-gray-300 font-medium text-sm uppercase tracking-wide">
          Warranty
        </span>
      </div>
      <div className="flex flex-col items-center p-4">
        <span className="text-3xl font-black text-orange-500 mb-2 tracking-tight">
          50K+
        </span>
        <span className="text-gray-300 font-medium text-sm uppercase tracking-wide">
          Happy Runners
        </span>
      </div>
    </div>
  </section>
));

TrustBar.displayName = "TrustBar";
