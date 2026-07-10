import { Sparkles, PlayCircle } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="mx-auto mt-16 max-w-4xl rounded-3xl border border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-violet-50 p-12 text-center">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
        <PlayCircle className="h-10 w-10 text-red-500" />
      </div>

      <h2 className="mt-8 text-3xl font-bold text-gray-900">
        Your AI Summary Will Appear Here
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
        Paste any YouTube link above and let Gemini AI generate a beautiful,
        structured summary with key insights, takeaways and downloadable notes.
      </p>

      <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 shadow">
        <Sparkles className="h-5 w-5 text-blue-600" />

        <span className="font-semibold text-blue-700">
          Ready in just a few seconds
        </span>
      </div>

    </div>
  );
}