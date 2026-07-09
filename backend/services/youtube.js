export async function getVideoInfo(videoId) {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch video information.");
  }

  const data = await response.json();

  return {
    title: data.title,
    channel: data.author_name,
    thumbnail: data.thumbnail_url,
  };
}