import { useState } from "react";
import ReactMarkdown from "react-markdown";

type SummaryCardProps = {
  videoId: string;
  summary: string;
};

export default function SummaryCard({
  videoId,
  summary,
}: SummaryCardProps) {
  const [copied, setCopied] = useState(false);

  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(summary);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      alert("Failed to copy summary.");
    }
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">

      <img
        src={thumbnail}
        alt="Video Thumbnail"
        className="h-72 w-full object-cover"
      />

      <div className="p-8">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-gray-900">
            📄 AI Summary
          </h2>

          <button
            onClick={handleCopy}
            className={`rounded-lg px-4 py-2 font-medium transition ${
              copied
                ? "bg-green-600 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>

        </div>

        <div className="mb-6 rounded-xl bg-gray-100 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Video ID
          </p>

          <p className="mt-2 break-all font-mono text-gray-700">
            {videoId}
          </p>
        </div>

        <div className="prose prose-lg max-w-none rounded-xl bg-blue-50 p-6">
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>

      </div>
    </div>
  );
}