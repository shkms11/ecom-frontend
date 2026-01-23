import { createContext } from "react";
import type { ToastType } from "@/shared/hooks/useToast";
import type { useToast } from "@/shared/hooks/useToast";

export interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
  toasts: ReturnType<typeof useToast>["toasts"];
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);
