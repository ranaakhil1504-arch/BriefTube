import supabase from "../config/supabase.js";
import logger from "../utils/logger.js";

export async function saveUserSummary(data) {
  const { error } = await supabase.from("user_summaries").insert(data);

  if (error) {
    logger.error("User summary save error", { error: error.message });
    throw error;
  }

  logger.info("User summary saved");
}
