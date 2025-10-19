import express from "express";
import cors from "cors";
let handleDemo: any;
try {
  // Try ESM-style import resolution first
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  handleDemo = require("./routes/demo").handleDemo;
} catch (e) {
  // Last resort: dynamic import (file URL) - works in some environments
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    handleDemo = require("./routes/demo").handleDemo;
  } catch (e2) {
    // If still failing, provide a minimal placeholder
    handleDemo = (_req: any, res: any) => res.status(501).json({ message: "demo route not available" });
  }
}

export async function createServer() {
  // Load dotenv lazily so the Vite config (which may import this file) doesn't fail if dotenv isn't resolvable
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("dotenv/config");
  } catch (e) {
    // ignore; dotenv is optional in dev setups
  }

  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  return app;
}
