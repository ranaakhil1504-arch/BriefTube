import { generateSummary as generateWithGemini } from "./gemini.js";
import { generateWithOpenRouter } from "./openrouter.js";
import { generateWithGroq } from "./groq.js";
import logger from "../../utils/logger.js";

export async function generateSummary(transcript) {
  // =====================================
  // 1. GEMINI
  // =====================================
  try {
    logger.info("Trying Gemini...");
    return await generateWithGemini(transcript);
  } catch (error) {
    logger.warn("Gemini failed", { error: error.message });
  }

  // =====================================
  // 2. GROQ
  // =====================================
  try {
    logger.info("Trying Groq...");
    return await generateWithGroq(transcript);
  } catch (error) {
    logger.warn("Groq failed", { error: error.message });
  }

  // =====================================
  // 3. OPENROUTER
  // =====================================
  logger.info("Switching to OpenRouter...");

  return await generateWithOpenRouter(transcript);
}
