import express from "express";

import { getVideoInfo } from "../services/youtube.js";
import { generateSummary } from "../services/ai/aiRouter.js";
import { getTranscript } from "../services/transcript.js";
import { extractVideoId } from "../utils/extractVideoId.js";
import { saveUserSummary } from "../services/userSummaryService.js";
import {
  getCachedVideo,
  saveVideo,
} from "../services/cacheService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { url, userId } = req.body;

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
// ======================================
// 5. SAVE TO USER HISTORY
// ======================================

if (userId) {
  try {
    await saveUserSummary({
      user_id: userId,
      video_id: videoId,
      title: video.title,
      channel: video.channel,
      thumbnail: video.thumbnail,
      summary,
    });

    console.log("✅ Saved to User History");
  } catch (error) {
    console.error("User history save failed:", error.message);
  }
}


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
// 6. RETURN RESPONSE
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