import { getVideoInfo } from "../services/youtube.js";
import express from "express";
import { generateSummary } from "../services/gemini.js";
import { getTranscript } from "../services/transcript.js";
import { extractVideoId } from "../utils/extractVideoId.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "YouTube URL is required",
      });
    }

    const videoId = extractVideoId(url);

    if (!videoId) {
      return res.status(400).json({
        success: false,
        message: "Invalid YouTube URL",
      });
    }

    const [transcript, video] = await Promise.all([
  getTranscript(videoId),
  getVideoInfo(videoId),
]);

const summary = await generateSummary(transcript);

   res.json({
  success: true,
  summary,
  video,
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
});

export default router;