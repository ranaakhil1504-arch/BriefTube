import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import summarizeRoute from "./routes/summarize.js";
import supabase from "./config/supabase.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 BriefTube Backend is Running!",
  });
});
app.get("/api/test-supabase", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .limit(1);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      message: "Supabase Connected!",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});
app.use("/api/summarize", summarizeRoute);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});