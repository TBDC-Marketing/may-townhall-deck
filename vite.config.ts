import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const basePath = process.env.GITHUB_PAGES_BASE || process.env.BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 3000,
    allowedHosts: true
  },
  preview: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 3000,
    allowedHosts: true
  }
});
