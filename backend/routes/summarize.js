import express from "express";
import rateLimit from "express-rate-limit";

import { getVideoInfo } from "../services/youtube.js";
import { generateSummary } from "../services/ai/aiRouter.js";
import { getTranscript } from "../services/transcript.js";
import { extractVideoId } from "../utils/extractVideoId.js";
import { saveUserSummary } from "../services/userSummaryService.js";
import { getCachedVideo, saveVideo } from "../services/cacheService.js";
import { attachUserIfPresent } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { dedupe } from "../utils/inFlightRequests.js";
import logger from "../utils/logger.js";

const router = express.Router();

// Summarizing calls paid AI providers, so it gets a tighter limit
// on top of the global rate limiter in server.js.
const summarizeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many summarize requests. Please try again later.",
  },
});

router.post(
  "/",
  summarizeLimiter,
  attachUserIfPresent, // sets req.user if a valid session token is present, else null
  asyncHandler(async (req, res) => {
    const { url } = req.body;

    // The user id now comes from the verified session token
    // (attachUserIfPresent), never from the request body. Previously
    // a client could pass ANY userId and write history under it.
    const userId = req.user?.id || null;

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
      logger.info("Cache hit", { videoId });

      if (userId) {
        try {
          await saveUserSummary({
            user_id: userId,
            video_id: videoId,
            title: cached.title,
            channel: cached.channel,
            thumbnail: cached.thumbnail,
            summary: cached.summary,
          });
        } catch (error) {
          logger.warn("User history save failed on cache hit", {
            error: error.message,
          });
        }
      }

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

    logger.info("Cache miss", { videoId });

    // ======================================
    // 2 + 3. FETCH TRANSCRIPT/VIDEO + GENERATE SUMMARY
    // Deduped by videoId so concurrent requests for the same
    // brand-new video share one in-flight transcript + AI call
    // instead of each triggering their own.
    // ======================================
    const { video, summary } = await dedupe(`summarize:${videoId}`, async () => {
      const [transcript, video] = await Promise.all([
        getTranscript(url),
        getVideoInfo(videoId),
      ]);

      logger.info("Transcript fetched", { videoId });

      const summary = await generateSummary(transcript);

      logger.info("Summary generated", { videoId });

      await saveVideo({
        video_id: videoId,
        title: video.title,
        channel: video.channel,
        thumbnail: video.thumbnail,
        transcript,
        summary,
      });

      logger.info("Saved to Supabase cache", { videoId });

      return { video, summary };
    });

    // ======================================
    // 4. SAVE TO USER HISTORY (only for signed-in users)
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

        logger.info("Saved to user history", { videoId, userId });
      } catch (error) {
        logger.warn("User history save failed", { error: error.message });
      }
    }

    // ======================================
    // 5. RETURN RESPONSE
    // ======================================
    return res.json({
      success: true,
      summary,
      video,
      cached: false,
    });
  })
);

export default router;
