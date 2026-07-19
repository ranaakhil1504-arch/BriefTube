import { getYoutubeCaptions } from "./youtubeCaptions.js";
import { extractVideoId } from "../utils/extractVideoId.js";
import logger from "../utils/logger.js";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getTranscript(videoUrl) {
  // =====================================
  // 1. TRY FREE YOUTUBE CAPTIONS
  // =====================================
  const videoId = extractVideoId(videoUrl);

  if (videoId) {
    const captions = await getYoutubeCaptions(videoId);

    if (captions) {
      return captions;
    }

    logger.info("Falling back to Supadata...");
  }

  // =====================================
  // 2. SUPADATA FALLBACK
  // =====================================
  const MAX_RETRIES = 5;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const response = await fetch(
      `https://api.supadata.ai/v1/transcript?url=${encodeURIComponent(
        videoUrl
      )}&text=true&mode=auto`,
      {
        headers: {
          "x-api-key": process.env.SUPADATA_API_KEY,
        },
      }
    );

    if (response.status === 202) {
      logger.info(
        `Transcript not ready (attempt ${attempt}/${MAX_RETRIES}). Retrying in 2s...`
      );

      await sleep(2000);

      continue;
    }

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const data = await response.json();

    logger.info("Transcript fetched from Supadata");

    return data.content;
  }

  throw new Error(
    "Transcript is still being generated. Please try again in a few moments."
  );
}
