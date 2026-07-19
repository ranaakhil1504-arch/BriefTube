import { YoutubeTranscript } from "youtube-transcript";
import logger from "../utils/logger.js";

export async function getYoutubeCaptions(videoId) {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    const text = transcript.map((item) => item.text).join(" ");

    logger.info("Free YouTube captions found", { videoId });

    return text;
  } catch (error) {
    logger.info("No free captions available", { videoId, error: error.message });

    return null;
  }
}
