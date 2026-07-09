import { useEffect, useRef, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SummaryCard from "./components/SummaryCard";
import LoadingSpinner from "./components/LoadingSpinner";

import { generateSummary } from "./services/api";
import type { VideoInfo } from "./services/api";

function App() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState<VideoInfo | null>(null);
const [error, setError] = useState("");
  // Reference to Summary Card
  const summaryRef = useRef<HTMLDivElement | null>(null);
const loadingRef = useRef<HTMLDivElement | null>(null);
  async function handleGenerate(url: string) {
    try {
      setLoading(true);
      setSummary("");
      setVideo(null);
      setError("");
      setTimeout(() => {
  loadingRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}, 100);
      const result = await generateSummary(url);

      setSummary(result.summary);
      setVideo(result.video);
    } catch (error) {
  setError(
    error instanceof Error
      ? error.message
      : "Something went wrong."
  );
}finally {
      setLoading(false);
    }
  }

  // Auto Scroll when summary is ready
  useEffect(() => {
    if (summary && video && summaryRef.current) {
      setTimeout(() => {
        summaryRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }, [summary, video]);

  return (
    <>
      <Navbar />

      <Hero onGenerate={handleGenerate}
  loading={loading}
/>

     {loading && (
  <div ref={loadingRef}>
    <LoadingSpinner />
  </div>
)}
{error && (
  <div className="mx-auto mt-8 w-full max-w-3xl rounded-3xl border border-red-200 bg-red-50 p-6 shadow-lg">
    <h2 className="text-xl font-bold text-red-700">
      ❌ Unable to Generate Summary
    </h2>

    <p className="mt-3 text-gray-700">
      {error}
    </p>

    <p className="mt-4 text-sm text-gray-500">
      Please try another YouTube video or check your internet connection.
    </p>
  </div>
)}
      {summary && video && (
        <div ref={summaryRef}>
          <SummaryCard
            summary={summary}
            video={video}
          />
        </div>
      )}
    </>
  );
}

export default App;