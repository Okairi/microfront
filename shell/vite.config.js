import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    react(),

    federation({
      name: "shell",
      dts: false,
      remotes: {
        catalog: {
          type: "module",
          name: "catalog",
          entry: "http://localhost:5173/remoteEntry.js",
        },
        cart: {
          type: "module",
          name: "cart",
          entry: "http://localhost:5174/remoteEntry.js",
        },
      },

      shared: {
        react: {
          singleton: true,
        },

        "react-dom": {
          singleton: true,
        },
      },
    }),
  ],

  server: {
    port: 3000,
  },
});
