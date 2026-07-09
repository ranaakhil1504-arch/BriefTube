import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SummaryCard from "./components/SummaryCard";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [videoId, setVideoId] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  function generateSummary(id: string) {
    setLoading(true);

    setTimeout(() => {
      setVideoId(id);

      setSummary(
        "This is a demo AI summary. In the next version, Google Gemini AI will generate a real summary of the YouTube video."
      );

      setLoading(false);
    }, 2000);
  }

  return (
    <>
      <Navbar />

      <Hero onGenerate={generateSummary} />

      {loading && <LoadingSpinner />}

      {!loading && videoId && (
        <SummaryCard
          videoId={videoId}
          summary={summary}
        />
      )}
    </>
  );
}

export default App;