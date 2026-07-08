import { useState } from "react";
import { extractVideoId } from "../utils/youtube";

export default function UrlInput() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    console.log("Button clicked");
    if (!url.trim()) {
      setError("Please enter a YouTube URL.");
      return;
    }

    const videoId = extractVideoId(url);

    if (!videoId) {
      setError("Please enter a valid YouTube URL.");
      return;
    }

    setError("");

    console.log("Video ID:", videoId);

    alert("✅ URL is valid!");
  }

  return (
    <div className="mt-10 mx-auto flex w-full max-w-2xl flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError("");
          }}
          placeholder="Paste YouTube URL here..."
          className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <button
          onClick={handleSubmit}
          className="whitespace-nowrap rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
        >
          🚀 Generate Summary
        </button>
      </div>

      {error && (
        <p className="text-left text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}