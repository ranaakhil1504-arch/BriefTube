import { generateSummary as generateWithGemini } from "./gemini.js";
import { generateWithOpenRouter } from "./openrouter.js";
import { generateWithGroq } from "./groq.js";


export async function generateSummary(transcript) {
  // =====================================
  // 1. GEMINI
  // =====================================

  try {
    console.log("🤖 Trying Gemini...");

    return await generateWithGemini(transcript);

  } catch (error) {

    console.log("❌ Gemini failed");
    console.log(error.message);
  }

  // =====================================
  // 2. GROQ
  // =====================================

  try {
    console.log("⚡ Trying Groq...");

    return await generateWithGroq(transcript);

  } catch (error) {

    console.log("❌ Groq failed");
    console.log(error.message);
  }

  // =====================================
  // 3. OPENROUTER
  // =====================================

  console.log("🔄 Switching to OpenRouter...");

  return await generateWithOpenRouter(transcript);
}