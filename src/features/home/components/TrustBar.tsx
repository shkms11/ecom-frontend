import { memo } from "react";
import { Truck, ArrowLeftRight, Shield, Users } from "lucide-react";

interface TrustItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    icon: Truck,
    title: "Free Shipping",
    subtitle: "Over $100",
  },
  {
    icon: ArrowLeftRight,
    title: "30-Day",
    subtitle: "Returns",
  },
  {
    icon: Shield,
    title: "2-Year",
    subtitle: "Warranty",
  },
  {
    icon: Users,
    title: "50K+",
    subtitle: "Happy Runners",
  },
];

export const TrustBar = memo(() => (
  <section className="py-12 lg:py-14 bg-gradient-to-b from-zinc-900/10 to-zinc-900/20 backdrop-blur-xl border-y border-zinc-800/30 shadow-2xl shadow-black/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12 text-center">
        {TRUST_ITEMS.map(
          (
            { icon: Icon, title, subtitle }, // ✅ Fixed: removed unused index
          ) => (
            <div
              key={title}
              className="group relative flex flex-col items-center p-6 lg:p-8 rounded-3xl bg-white/60 backdrop-blur-md 
                     border border-white/40 hover:bg-white/80 hover:shadow-2xl hover:shadow-orange-500/10 
                     hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 origin-center 
                     hover:border-orange-200/50 focus:outline-none focus:ring-4 focus:ring-orange-500/30"
            >
              <div
                className="w-20 h-20 lg:w-24 lg:h-24 mb-6 bg-gradient-to-br from-orange-500/10 to-orange-600/10 
                           rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl 
                           group-hover:shadow-orange-500/20 group-hover:scale-110 transition-all duration-500 ring-1 
                           ring-orange-500/20 backdrop-blur-sm"
              >
                <Icon className="w-12 h-12 lg:w-14 lg:h-14 text-orange-600 drop-shadow-lg group-hover:scale-110 transition-all duration-300" />
              </div>

              <h3 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-gray-900 via-slate-800 to-zinc-900 bg-clip-text text-transparent mb-3 px-4 tracking-tight leading-tight">
                {title}
              </h3>

              <p className="text-sm lg:text-base font-bold text-gray-700 uppercase tracking-widest">
                {subtitle}
              </p>

              <div
                className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-3xl 
                           blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 
                           scale-75 group-hover:scale-100"
              />
            </div>
          ),
        )}
      </div>
    </div>
  </section>
));

TrustBar.displayName = "TrustBar";
