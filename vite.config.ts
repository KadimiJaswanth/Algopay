import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { pathToFileURL } from "url";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  define: {
    global: "globalThis",
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    host: "::",
    port: 8080,
    fs: {
      // Allow client, shared and project root so top-level index.html can be served
      allow: [path.resolve(__dirname, "./client"), path.resolve(__dirname, "./shared"), path.resolve(__dirname, ".")],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): any {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
      async configureServer(server) {
        // Dynamically import server to avoid loading dotenv at Vite config parse time
    const serverPath = path.resolve(__dirname, "./server/index.ts");
    const mod = await import(pathToFileURL(serverPath).href);
        const app = await mod.createServer();

        // Add Express app as middleware to Vite dev server
        server.middlewares.use(app);
      },
  };
}
