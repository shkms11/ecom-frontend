import { memo, useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
          success: false,
        }));
        return;
      }

      setForm({
        email: "",
        success: true,
        error: "",
      });
    },
    [form.email],
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      email: e.target.value,
      error: "",
    }));
  }, []);

  useEffect(() => {
    if (!form.success) return;

    const timer = setTimeout(() => {
      setForm((prev) => ({ ...prev, success: false }));
    }, 3000);

    return () => clearTimeout(timer);
  }, [form.success]);

  return (
    <section className="border-t border-border bg-orange-50/40 py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
            Get 10% Off
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            Subscribe for offers, early releases, and running tips.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto items-stretch"
        >
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="h-10 w-full px-4 text-sm rounded-lg border border-border bg-background
                       text-foreground placeholder:text-muted-foreground
                       focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-200"
          />

          <Button type="submit" className="h-10 px-5">
            Claim 10%
          </Button>
        </form>

        {/* Messages */}
        {form.error && (
          <p className="mt-4 text-sm text-destructive">{form.error}</p>
        )}

        {form.success && (
          <p className="mt-4 text-sm text-emerald-600">
            Thanks for subscribing!
          </p>
        )}
      </div>
    </section>
  );
});

Newsletter.displayName = "Newsletter";
