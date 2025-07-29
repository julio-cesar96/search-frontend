import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.mercadolibre.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        // Forçar passar todos os headers, inclusive Authorization
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            // Copia o header Authorization da requisição original
            if (req.headers.authorization) {
              proxyReq.setHeader("authorization", req.headers.authorization);
            }
          });
        },
      },
    },
  },
});
