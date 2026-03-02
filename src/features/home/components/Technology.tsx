import { memo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/shared/components";

export const Technology = memo(() => (
  <section className="py-28 px-6 bg-white" aria-labelledby="technology-heading">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
      <div className="order-2 lg:order-1 space-y-8">
        <h2
          id="technology-heading"
          className="text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-gray-900 via-slate-800 to-zinc-800 bg-clip-text text-transparent leading-tight"
        >
          Advanced Running
          <span className="block text-orange-500 mt-6 text-4xl lg:text-5xl font-black tracking-tight">
            Technology Inside
          </span>
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
          Responsive cushioning with 360° breathable mesh uppers and
          precision-engineered outsoles maximize speed, support, and comfort for
          every stride.
        </p>
        <div className="flex gap-4 pt-4">
          <Link to="/technology">
            <Button
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 
                               text-white px-10 py-5 text-xl font-black rounded-2xl shadow-2xl hover:shadow-3xl 
                               transition-all duration-300 h-fit"
            >
              Explore Technology
            </Button>
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-orange-600 
                       transition-colors duration-300 group"
          >
            Learn More
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="relative h-96 lg:h-[34rem] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-100/50 order-1 lg:order-2">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-400/5" />
        <img
          src="/images/technology.jpg"
          alt="Cross-section of advanced running shoe technology showing cushioning and materials"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
    </div>
  </section>
));

Technology.displayName = "Technology";
