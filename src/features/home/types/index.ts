import type { IconName, Option } from "@/shared/types/common.types";

export interface Category {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  priority?: number;
}

export interface Feature {
  icon: IconName;
  title: string;
  description: string;
}

export interface NewsletterFormState {
  email: string;
  success: boolean;
  error: string | null;
  loading: boolean;
  subscribed: boolean;
}

export interface HeroSlide {
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export interface Stat {
  label: string;
  value: string | number;
  suffix?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  content: string;
  role: string;
}

export interface CallToAction {
  title: string;
  description: string;
  primaryButton: Option<string>;
  secondaryButton?: Option<string>;
}

export interface HomePageMeta {
  title: string;
  description: string;
  keywords: string[];
  heroImage: string;
}
