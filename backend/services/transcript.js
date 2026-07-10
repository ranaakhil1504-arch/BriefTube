export async function getTranscript(videoUrl) {
  const response = await fetch(
    `https://api.supadata.ai/v1/transcript?url=${encodeURIComponent(
      videoUrl
    )}&text=true&mode=auto`,
    {
      headers: {
        "x-api-key": process.env.SUPADATA_API_KEY,
      },
    }
  );

  if (response.status === 202) {
    const job = await response.json();
    throw new Error(
      `Transcript is being generated. Job ID: ${job.jobId}.`
    );
  }

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  const data = await response.json();

  return data.content;
}