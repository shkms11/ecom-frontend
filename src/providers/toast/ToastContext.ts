import { createContext } from "react";
import type { ToastType } from "@/hooks/useToast";
import type { useToast } from "@/hooks/useToast";

export interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
  toasts: ReturnType<typeof useToast>["toasts"];
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);
