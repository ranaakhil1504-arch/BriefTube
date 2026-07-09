export type VideoInfo = {
  title: string;
  channel: string;
  thumbnail: string;
};

export async function generateSummary(url: string) {
  const response = await fetch("http://localhost:5000/api/summarize", {
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