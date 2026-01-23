import type { ReactNode } from "react";
import { ToastContext } from "./ToastContext";
import { useToast } from "@/shared/hooks/useToast";

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const { toasts, showToast, removeToast } = useToast();

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
