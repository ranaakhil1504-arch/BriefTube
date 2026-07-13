import express from "express";

import { getVideoInfo } from "../services/youtube.js";
import { generateSummary } from "../services/ai/aiRouter.js";
import { getTranscript } from "../services/transcript.js";
import { extractVideoId } from "../utils/extractVideoId.js";

import {
  getCachedVideo,
  saveVideo,
} from "../services/cacheService.js";

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

    // ======================================
    // 1. CHECK CACHE
    // ======================================

    const cached = await getCachedVideo(videoId);

    if (cached) {
      console.log("⚡ Cache Hit");

      return res.json({
        success: true,
        summary: cached.summary,
        video: {
          title: cached.title,
          channel: cached.channel,
          thumbnail: cached.thumbnail,
        },
        cached: true,
      });
    }

    console.log("❌ Cache Miss");

    // ======================================
    // 2. FETCH TRANSCRIPT + VIDEO INFO
    // ======================================

    const [transcript, video] = await Promise.all([
      getTranscript(url),
      getVideoInfo(videoId),
    ]);

    console.log("✅ Transcript fetched");

    // ======================================
    // 3. GENERATE SUMMARY
    // ======================================

    const summary = await generateSummary(transcript);

    console.log("✅ Summary generated");

    // ======================================
    // 4. SAVE TO SUPABASE
    // ======================================

    await saveVideo({
      video_id: videoId,
      title: video.title,
      channel: video.channel,
      thumbnail: video.thumbnail,
      transcript,
      summary,
    });

    console.log("✅ Saved to Supabase");

    // ======================================
    // 5. RETURN RESPONSE
    // ======================================

    return res.json({
      success: true,
      summary,
      video,
      cached: false,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
});

export default router;