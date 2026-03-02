import type { Product, Category, Feature, IconName } from "../types";

export const CATEGORIES: Category[] = [
  { name: "Men" },
  { name: "Women" },
  { name: "New Arrivals" },
];

export const PRODUCTS: Product[] = [
  { id: 1, name: "AirRunner Pro", price: 150, rating: 4.8 },
  { id: 2, name: "SpeedX Trainer", price: 180, rating: 4.9 },
  { id: 3, name: "TrailBlazer Max", price: 200, rating: 4.7 },
  { id: 4, name: "Urban Jogger", price: 130, rating: 4.6 },
];

export const FEATURES: Feature[] = [
  {
    icon: "truck" as IconName,
    title: "Fast Delivery",
    description: "2–5 business day shipping worldwide.",
  },
  {
    icon: "shield-check" as IconName,
    title: "Secure Checkout",
    description: "256-bit encrypted payment protection.",
  },
  {
    icon: "zap" as IconName,
    title: "Performance Engineered",
    description: "Built with cutting-edge running technology.",
  },
];
