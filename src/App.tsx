import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "@/app/store";
import { AppRoutes } from "@/routes/AppRoutes";
import { useToastContext } from "@/providers/toast/useToastContext";
import { ToastProvider } from "./providers/toast/ToastProvider";
import { Toast } from "@/shared/components";
import "./App.css";

function AppContent() {
  const { toasts, removeToast } = useToastContext();

  return (
    <>
      <AppRoutes />
      <Toast toasts={toasts} removeToast={removeToast} />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
