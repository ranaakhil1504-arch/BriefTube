import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import historyRoute from "./routes/history.js";
import summarizeRoute from "./routes/summarize.js";
import supabase from "./config/supabase.js";
import { validateEnv } from "./utils/validateEnv.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import logger from "./utils/logger.js";

dotenv.config();

// Fail fast at boot if required config is missing, instead of
// crashing mid-request the first time someone hits the API.
validateEnv();

const app = express();
const PORT = process.env.PORT || 5000;

// ======================================
// CORS — only allow known frontend origins.
// Set ALLOWED_ORIGINS in .env as a comma-separated list,
// e.g. ALLOWED_ORIGINS=https://brieftube.app,http://localhost:5173
// ======================================
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow server-to-server / curl requests (no Origin header),
      // and any origin explicitly listed in ALLOWED_ORIGINS.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

// ======================================
// Rate limiting — applies to every route.
// The summarize route additionally has its own tighter limit
// (see routes/summarize.js) since it triggers paid AI calls.
// ======================================
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 BriefTube Backend is Running!",
  });
});

app.get("/api/test-supabase", async (req, res, next) => {
  try {
    const { data, error } = await supabase.from("videos").select("*").limit(1);

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    res.json({ success: true, message: "Supabase Connected!", data });
  } catch (err) {
    next(err);
  }
});

app.use("/api/summarize", summarizeRoute);
app.use("/api/history", historyRoute);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
