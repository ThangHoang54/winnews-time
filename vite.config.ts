import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 8080,
    host: "0.0.0.0",
    proxy: {
      '/api': {
        target: 'http://localhost:3000', 
        changeOrigin: true,
      }
    }
  },
  build: {
    rollupOptions: {
      external: ['next/navigation', 'next/navigation.js'],
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
        "@": path.resolve(__dirname, "./src"),
        "app": path.resolve(__dirname, "./src/app"),
        "pages": path.resolve(__dirname, "./src/app/pages"),
        "components": path.resolve(__dirname, "./src/components"),
        "hooks": path.resolve(__dirname, "./src/hooks"),
        "services": path.resolve(__dirname, "./src/services")
    },
  },
});