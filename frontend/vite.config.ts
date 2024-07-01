import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  // server: {
  //   proxy: {
  //     "/api/": {
  //       target: "http://localhost:4999",
  //       secure: false,
  //     },
  //   },
  // },
});
