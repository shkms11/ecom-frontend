import type { Toast as ToastType } from "@/shared/hooks/useToast";
interface ToastItemProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const bgColors = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    info: "bg-blue-50 border-blue-200",
    warning: "bg-yellow-50 border-yellow-200",
  };

  const textColors = {
    success: "text-green-800",
    error: "text-red-800",
    info: "text-blue-800",
    warning: "text-yellow-800",
  };

  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ",
    warning: "⚠",
  };

  return (
    <div
      className={`max-w-sm w-full border rounded-md shadow-lg p-4 ${bgColors[toast.type]} ${textColors[toast.type]} transition-all duration-300`}
      role="alert"
    >
      <div className="flex items-start">
        <div className="shrink-0">
          <span className="text-lg">{icons[toast.type]}</span>
        </div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
        <div className="ml-4 shrink-0 flex">
          <button
            onClick={() => onClose(toast.id)}
            className={`inline-flex ${textColors[toast.type]} hover:opacity-75 focus:outline-none`}
          >
            <span className="sr-only">Close</span>
            <span className="text-lg">×</span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface ToastProps {
  toasts: ToastType[];
  removeToast: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </div>
  );
};
