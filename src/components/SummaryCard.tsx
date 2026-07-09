import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";

import {
  Copy,
  Check,
  Download,
  FileText,
  FileCode2,
  PlayCircle,
} from "lucide-react";

import type { VideoInfo } from "../services/api";

type SummaryCardProps = {
  video: VideoInfo;
  summary: string;
};

export default function SummaryCard({
  video,
  summary,
}: SummaryCardProps) {

  const [copied, setCopied] = useState(false);

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

  function downloadFile(

    content: string,

    filename: string,

    type: string

  ) {

    const blob = new Blob([content], {

      type,

    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

  }

  function handleDownloadTxt() {

    downloadFile(

      summary,

      `${video.title}.txt`,

      "text/plain;charset=utf-8"

    );

  }

  function handleDownloadMarkdown() {

    downloadFile(

      summary,

      `${video.title}.md`,

      "text/markdown;charset=utf-8"

    );

  }

  function handleDownloadPdf() {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.setFont("helvetica", "bold");

    doc.text(video.title, 15, 20);

    doc.setFontSize(12);

    doc.setFont("helvetica", "normal");

    doc.text(`Channel: ${video.channel}`, 15, 30);

    const lines = doc.splitTextToSize(summary, 180);

    doc.text(lines, 15, 45);

    doc.save(`${video.title}.pdf`);

  }

  return (
           <div className="mx-auto mt-12 w-full max-w-6xl">

      <div className="overflow-hidden rounded-[32px] border border-white/60 bg-white/90 shadow-2xl backdrop-blur-xl">

        {/* Thumbnail */}

        <div className="relative">

          <img
            src={video.thumbnail}
            alt={video.title}
            className="h-80 w-full object-cover"
          />

          {/* Gradient Overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Video Badge */}

          <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow-lg backdrop-blur">

            <PlayCircle className="h-5 w-5 text-red-600" />

            <span className="text-sm font-semibold text-gray-800">
              YouTube Video
            </span>

          </div>

          {/* Video Information */}

          <div className="absolute bottom-6 left-6 right-6">

            <h2 className="text-4xl font-extrabold leading-tight text-white drop-shadow-lg">

              {video.title}

            </h2>

            <p className="mt-3 text-lg font-medium text-gray-200">

              👤 {video.channel}

            </p>

          </div>

        </div>

        {/* Body */}

        <div className="p-8">

          {/* Toolbar */}

          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

            <div>

              <h3 className="text-2xl font-bold text-gray-900">

                📄 AI Generated Summary

              </h3>

              <p className="mt-1 text-gray-500">

                Beautifully organized by Gemini AI

              </p>

            </div>

            <div className="flex flex-wrap gap-3">
                            <button
                onClick={handleCopy}
                className={`flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition-all duration-300 ${
                  copied
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-blue-600 text-white hover:scale-105 hover:bg-blue-700"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-5 w-5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5" />
                    Copy
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadTxt}
                className="flex items-center gap-2 rounded-xl bg-gray-700 px-5 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-gray-800"
              >
                <FileText className="h-5 w-5" />
                TXT
              </button>

              <button
                onClick={handleDownloadMarkdown}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-indigo-700"
              >
                <FileCode2 className="h-5 w-5" />
                Markdown
              </button>

              <button
                onClick={handleDownloadPdf}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700"
              >
                <Download className="h-5 w-5" />
                PDF
              </button>

            </div>

          </div>

          {/* Summary */}

          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-slate-50 p-8 shadow-inner">

            <ReactMarkdown
             components={{
  h1: ({ children }) => (
    <div className="mb-8 rounded-2xl border-l-8 border-blue-600 bg-gradient-to-r from-blue-100 to-blue-50 px-6 py-5 shadow-sm">
      <h1 className="text-3xl font-black text-blue-900">
        {children}
      </h1>
    </div>
  ),

  h2: ({ children }) => (
    <div className="mt-10 mb-5 flex items-center gap-3">
      <div className="h-8 w-2 rounded-full bg-gradient-to-b from-blue-600 to-violet-600" />

      <h2 className="text-2xl font-extrabold text-gray-900">
        {children}
      </h2>
    </div>
  ),

  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 text-xl font-bold text-blue-700">
      {children}
    </h3>
  ),

  p: ({ children }) => (
    <p className="mb-5 leading-8 text-[17px] text-gray-700">
      {children}
    </p>
  ),

  ul: ({ children }) => (
    <ul className="mb-8 space-y-4">
      {children}
    </ul>
  ),

  li: ({ children }) => (
    <li className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
      <span className="mt-1 text-blue-600">
        ✓
      </span>

      <span className="leading-7 text-gray-700">
        {children}
      </span>
    </li>
  ),

  strong: ({ children }) => (
    <strong className="font-bold text-gray-900">
      {children}
    </strong>
  ),
    blockquote: ({ children }) => (
    <blockquote className="my-8 rounded-2xl border-l-4 border-yellow-500 bg-yellow-50 px-6 py-5 italic text-gray-700 shadow-sm">
      {children}
    </blockquote>
  ),

  hr: () => (
    <hr className="my-10 border-0 border-t-2 border-gray-200" />
  ),

code({ children, className }) {

  const isBlock = className?.includes("language-");

  if (!isBlock) {
    return (
      <code className="rounded-md bg-gray-200 px-2 py-1 font-mono text-sm text-pink-600">
        {children}
      </code>
    );
  }

  return (
    <pre className="my-6 overflow-x-auto rounded-2xl bg-gray-900 p-5 text-gray-100 shadow-lg">
      <code className={className}>
        {children}
      </code>
    </pre>
  );

},

  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
      <table className="min-w-full border-collapse">
        {children}
      </table>
    </div>
  ),

  thead: ({ children }) => (
    <thead className="bg-blue-600 text-white">
      {children}
    </thead>
  ),

  tbody: ({ children }) => (
    <tbody className="bg-white">
      {children}
    </tbody>
  ),

  tr: ({ children }) => (
    <tr className="border-b border-gray-200">
      {children}
    </tr>
  ),

  th: ({ children }) => (
    <th className="px-5 py-3 text-left font-semibold">
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td className="px-5 py-3 text-gray-700">
      {children}
    </td>
  ),
}}
            >
              {summary}
            </ReactMarkdown>

          </div>
                  </div>

      </div>

    </div>
  );
}