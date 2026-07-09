import { useState } from "react";
import { PlayCircle, Sparkles } from "lucide-react";
import { extractVideoId } from "../utils/youtube";
const SAMPLE_VIDEO =
  "https://www.youtube.com/watch?v=jNQXAC9IVRw";
type UrlInputProps = {
  onGenerate: (url: string) => void;
  loading: boolean;
};
export default function UrlInput({
  onGenerate,
  loading,
}: UrlInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
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
  onGenerate(url);
}

function handleSampleVideo() {
  setError("");
 setUrl(SAMPLE_VIDEO);

setTimeout(() => {
  onGenerate(SAMPLE_VIDEO);
}, 100);
}

  return (
    <div className="mx-auto mt-12 w-full max-w-5xl">

      <div className="rounded-[30px] border border-white/60 bg-white/80 p-4 shadow-2xl backdrop-blur-xl">

        <div className="flex flex-col gap-4 md:flex-row">

          {/* Input */}

          <div className="flex flex-1 items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
              <PlayCircle className="h-7 w-7 text-red-600" />
            </div>

            <input
  type="text"
  value={url}
  disabled={loading}
  onChange={(e) => {
    setUrl(e.target.value);
    setError("");
  }}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !loading) {
      handleSubmit();
    }
  }}
  placeholder="Paste any YouTube video URL..."
  className="w-full bg-transparent text-lg text-gray-800 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
/>

          </div>

          {/* Button */}

          <button
  onClick={handleSubmit}
  disabled={loading}
  className={`group flex items-center justify-center gap-3 rounded-2xl px-8 py-5 font-semibold text-white shadow-lg transition-all duration-300 ${
    loading
      ? "cursor-not-allowed bg-gray-400"
      : "bg-gradient-to-r from-blue-600 to-violet-600 hover:scale-[1.02] hover:shadow-2xl active:scale-95"
  }`}
>
  {loading ? (
    <>
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>

      <span>Generating...</span>
    </>
  ) : (
    <>
      <Sparkles className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />

      <span>Generate Summary</span>
    </>
  )}
</button>

        </div>

<div className="mt-5 flex justify-center">
  <button
    onClick={handleSampleVideo}
    disabled={loading}
    className="rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
  >
    🎬 Try Sample Video
  </button>
</div>

{error ? (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-600">
              ⚠️ {error}
            </p>
          </div>
        ) : (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="rounded-full bg-blue-50 px-4 py-2 font-medium text-blue-700">
              ✨ AI Powered
            </span>

            <span className="rounded-full bg-green-50 px-4 py-2 font-medium text-green-700">
              ⚡ Instant Summary
            </span>

            <span className="rounded-full bg-violet-50 px-4 py-2 font-medium text-violet-700">
              📄 PDF Export
            </span>

            <span className="rounded-full bg-orange-50 px-4 py-2 font-medium text-orange-700">
              📝 Markdown
            </span>
          </div>
        )}

      </div>

    </div>
  );
}