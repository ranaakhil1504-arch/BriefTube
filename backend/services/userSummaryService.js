import supabase from "../config/supabase.js";

export async function saveUserSummary(data) {
  const { error } = await supabase
    .from("user_summaries")
    .insert(data);

  if (error) {
    console.error("User Summary Save Error:", error.message);
    throw error;
  }

  console.log("✅ User summary saved");
}