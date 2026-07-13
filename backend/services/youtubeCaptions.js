import { YoutubeTranscript } from "youtube-transcript";

export async function getYoutubeCaptions(videoId) {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    const text = transcript
      .map((item) => item.text)
      .join(" ");

    console.log("✅ Free YouTube captions found");

    return text;

  } catch (error) {

    console.log("❌ No free captions available");

    return null;

  }
}