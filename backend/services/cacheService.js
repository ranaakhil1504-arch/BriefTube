import supabase from "../config/supabase.js";

export async function getCachedVideo(videoId) {
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("video_id", videoId)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export async function saveVideo(video) {
  const { error } = await supabase
    .from("videos")
    .upsert(video);

  if (error) {
    console.error("Cache Save Error:", error.message);
  }
}