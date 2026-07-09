import express from "express";
import { generateSummary } from "../services/gemini.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({
        success: false,
        message: "Transcript is required",
      });
    }

    const summary = await generateSummary(transcript);

    res.json({
      success: true,
      summary,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate summary",
    });
  }
});

export default router;