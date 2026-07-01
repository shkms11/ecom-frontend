import { memo } from "react";
import { Star } from "lucide-react";

export const Testimonials = memo(() => {
  const testimonials = [
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
  ];

  return (
    <section className="border-t border-border bg-background py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="text-center mb-12 lg:mb-14">
          <h2
            id="testimonials-heading"
            className="text-2xl lg:text-3xl font-semibold tracking-tight text-foreground mb-3"
          >
            Loved by Runners
          </h2>

          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Join 50,000+ runners worldwide who trust our performance footwear.
          </p>
        </header>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, index) => (
            <blockquote
              key={index}
              className="border border-border rounded-lg p-6 lg:p-8 bg-background"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4 text-orange-600">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-orange-600"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-foreground leading-relaxed mb-4">
                "{t.quote}"
              </p>

              {/* Author */}
              <cite className="text-sm text-muted-foreground not-italic">
                {t.author}
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
});

Testimonials.displayName = "Testimonials";
