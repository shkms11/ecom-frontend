import { memo } from "react";
import { Star } from "lucide-react";

export const Testimonials = memo(() => (
  <section
    className="py-28 px-6 bg-gradient-to-b from-white to-gray-50/50 backdrop-blur-sm"
    aria-labelledby="testimonials-heading"
  >
    <div className="max-w-6xl mx-auto text-center">
      <header className="mb-24">
        <h2
          id="testimonials-heading"
          className="text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-gray-900 to-slate-900 bg-clip-text text-transparent"
        >
          Loved by Runners
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Join 50,000+ runners worldwide who trust our performance footwear.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            quote:
              "These are hands down the best running shoes I've ever owned. Incredible comfort and support for long runs.",
            author: "Sarah K. — Marathon Runner",
          },
          {
            quote:
              "Lightweight yet durable. Perfect for daily training and speed work. My PRs keep improving!",
            author: "Mike T. — Track Athlete",
          },
          {
            quote:
              "Finally found shoes that don't cause blisters. The grip is unreal on wet trails too.",
            author: "Emma L. — Trail Runner",
          },
        ].map((testimonial, index) => (
          <blockquote
            key={index}
            className="p-10 lg:p-12 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl 
                       border border-gray-100/50 hover:shadow-3xl hover:-translate-y-4 
                       hover:bg-white/90 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/3 to-orange-400/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex justify-center mb-8 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="text-orange-400 fill-orange-400 drop-shadow-md"
                />
              ))}
            </div>
            <p className="text-gray-700 text-xl lg:text-2xl italic mb-8 leading-relaxed relative z-10">
              "{testimonial.quote}"
            </p>
            <cite className="relative z-10 font-bold text-xl text-gray-900 not-italic block">
              {testimonial.author}
            </cite>
          </blockquote>
        ))}
      </div>
    </div>
  </section>
));

Testimonials.displayName = "Testimonials";
