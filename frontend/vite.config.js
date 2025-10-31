import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/auth": {
        target: "http://proyecto-web.local",
        changeOrigin: true,
      },
      "/admin": {
        target: "http://proyecto-web.local",
        changeOrigin: true,
      },
      "/evento": {
        target: "http://proyecto-web.local",
        changeOrigin: true,
      },
    },
  },
});
