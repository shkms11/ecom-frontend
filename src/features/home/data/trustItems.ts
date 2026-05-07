import {
  Truck,
  ArrowLeftRight,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";
import { STORE_CONFIG } from "@/config/store.config";
import { formatCurrency } from "@/shared/utils/formatCurrency";

export interface TrustItem {
  icon: LucideIcon;
  title: string | number;
  subtitle: string;
}

export const TRUST_ITEMS: TrustItem[] = [
  {
    icon: Truck,
    title: "Free Shipping",
    subtitle: `Over ${formatCurrency(STORE_CONFIG.freeShippingThreshold)}`,
  },
  {
    icon: ArrowLeftRight,
    title: `${STORE_CONFIG.returnDays}-Day`,
    subtitle: "Returns",
  },
  {
    icon: Shield,
    title: `${STORE_CONFIG.warrantyDays}-Day`,
    subtitle: "Warranty",
  },
  {
    icon: Users,
    title: STORE_CONFIG.happyCustomers,
    subtitle: "Happy Runners",
  },
];
