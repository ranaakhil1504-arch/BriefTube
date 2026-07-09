import { useState } from "react";
import { extractVideoId } from "./utils/youtube";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SummaryCard from "./components/SummaryCard";
import LoadingSpinner from "./components/LoadingSpinner";

import { generateSummary } from "./services/api";

function App() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
const [videoId, setVideoId] = useState("");
  async function handleGenerate(url: string) {
  try {
    setLoading(true);
    setSummary("");

    const id = extractVideoId(url);

    if (!id) {
      throw new Error("Invalid YouTube URL");
    }

    setVideoId(id);

    const result = await generateSummary(url);

    setSummary(result);

  } catch (error) {
    alert(error instanceof Error ? error.message : "Something went wrong");
  } finally {
    setLoading(false);
  }
}
  return (
    <>
      <Navbar />

      <Hero onGenerate={handleGenerate} />

      {loading && <LoadingSpinner />}

      {summary && (
  <SummaryCard
    videoId={videoId}
    summary={summary}
  />
)}
    </>
  );
}

export default App;