export type VideoInfo = {
  title: string;
  channel: string;
  thumbnail: string;
};

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export async function generateSummary(url: string) {
  const response = await fetch(`${API_URL}/api/summarize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to generate summary");
  }

  return {
    summary: data.summary,
    video: data.video,
  };
}