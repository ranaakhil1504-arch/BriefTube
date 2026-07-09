import { YoutubeTranscript } from "youtube-transcript";

export async function getTranscript(videoId) {
  const transcript = await YoutubeTranscript.fetchTranscript(videoId);

  return transcript
    .map(item => item.text)
    .join(" ");
}