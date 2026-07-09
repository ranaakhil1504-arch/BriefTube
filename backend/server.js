import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import summarizeRoute from "./routes/summarize.js";

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

app.use("/api/summarize", summarizeRoute);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});