import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/features": path.resolve(__dirname, "./src/features"),
      "@/shared": path.resolve(__dirname, "./src/shared"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/layouts": path.resolve(__dirname, "./src/layouts"),
      "@/providers": path.resolve(__dirname, "./src/providers"),
      "@/app": path.resolve(__dirname, "./src/app"),
      "@/config": path.resolve(__dirname, "./src/config"),
      "@/routes": path.resolve(__dirname, "./src/routes"),
      "@tests": path.resolve(__dirname, "./tests"),
    },
  },
});
