export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
}

export interface Category {
  name: string;
}

export type IconName = "truck" | "shield-check" | "zap";

export interface Feature {
  icon: IconName;
  title: string;
  description: string;
}

export interface NewsletterForm {
  email: string;
  success: boolean;
  error: string;
}

// Icon map type (no actual components - just the type)
export type IconComponent = React.ComponentType<{ className?: string }>;

// Usage helper function (pure TS, no JSX)
export const getIconComponent = (
  iconName: IconName,
): IconComponent | undefined => {
  const iconMap: Record<IconName, IconComponent> = {
    truck: {} as IconComponent, // Replace with actual TruckIcon
    "shield-check": {} as IconComponent, // Replace with actual ShieldCheckIcon
    zap: {} as IconComponent, // Replace with actual ZapIcon
  };
  return iconMap[iconName];
};

// Sample data
export const sampleFeatures: Feature[] = [
  {
    icon: "truck",
    title: "Free Shipping",
    description: "Orders over $50 qualify for free standard shipping.",
  },
  {
    icon: "shield-check",
    title: "Secure Checkout",
    description:
      "Your payment information is protected with enterprise-grade security.",
  },
  {
    icon: "zap",
    title: "Fast Delivery",
    description:
      "Get your order within 2-3 business days anywhere in the country.",
  },
];
