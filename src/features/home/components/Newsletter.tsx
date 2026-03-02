import { memo, useState, useCallback, useEffect } from "react";
import { Button } from "@/shared/components";
import type { NewsletterForm } from "../types";

export const Newsletter = memo(() => {
  const [form, setForm] = useState<NewsletterForm>({
    email: "",
    success: false,
    error: "",
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!form.email || !emailRegex.test(form.email)) {
        setForm((prev) => ({
          ...prev,
          error: "Please enter a valid email address",
        }));
        return;
      }

      // Simulate API submission
      setForm((prev) => ({ ...prev, success: true, error: "" }));
    },
    [form.email],
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, email: e.target.value, error: "" }));
  }, []);

  useEffect(() => {
    if (form.success) {
      const timer = setTimeout(() => {
        setForm((prev) => ({ ...prev, success: false }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [form.success]);

  return (
    <section
      className="py-28 px-6 bg-gradient-to-r from-slate-900 via-zinc-900 to-gray-900 text-white relative overflow-hidden"
      role="region"
      aria-labelledby="newsletter-heading"
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] opacity-50" />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <header className="mb-12">
          <h2
            id="newsletter-heading"
            className="text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight"
          >
            Get 10% Off
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-lg mx-auto leading-relaxed">
            Subscribe for exclusive offers, early releases, and pro running tips
            delivered to your inbox.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row gap-6 max-w-2xl mx-auto"
          noValidate
        >
          <div className="flex-1">
            <label htmlFor="email-input" className="sr-only">
              Email address
            </label>
            <input
              id="email-input"
              type="email"
              required
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-8 py-6 rounded-3xl text-lg text-gray-900 bg-white/95 backdrop-blur-sm 
                         border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-orange-500/30 
                         focus:border-orange-500/50 transition-all duration-300 placeholder-gray-500 
                         shadow-2xl hover:shadow-3xl"
              aria-describedby={
                form.error
                  ? "email-error"
                  : form.success
                    ? "email-success"
                    : undefined
              }
            />
          </div>
          <Button
            type="submit"
            className="px-12 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 
                       text-white font-black rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] 
                       transition-all duration-300 whitespace-nowrap text-xl px-16 h-fit border-2 
                       border-orange-600/30 focus:outline-none focus:ring-4 focus:ring-orange-500/50"
          >
            Claim Discount
          </Button>
        </form>

        {form.error && (
          <p
            id="email-error"
            className="mt-6 text-orange-300 font-semibold text-lg flex items-center justify-center gap-3"
            role="alert"
          >
            <span className="w-6 h-6 bg-orange-400/20 rounded-full flex items-center justify-center flex-shrink-0">
              !
            </span>
            {form.error}
          </p>
        )}
        {form.success && (
          <p
            id="email-success"
            className="mt-6 text-emerald-300 font-semibold text-lg flex items-center justify-center gap-3"
          >
            <span className="w-6 h-6 bg-emerald-400/20 rounded-full flex items-center justify-center flex-shrink-0">
              ✓
            </span>
            Thanks for subscribing! Check your email.
          </p>
        )}
      </div>
    </section>
  );
});

Newsletter.displayName = "Newsletter";
