import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 8080,
    host: "0.0.0.0",
    proxy: {
      // Proxies any request starting with /api to your serverless functions
      '/api': {
        // This is the default port for `vercel dev`
        target: 'http://localhost:3000', 
        changeOrigin: true,
      }
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});