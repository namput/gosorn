import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env, // ✅ ให้ Vercel อ่าน environment variables
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});
