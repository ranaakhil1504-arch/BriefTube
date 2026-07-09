export default function LoadingSpinner() {
  return (
    <div className="mx-auto mt-10 w-full max-w-3xl rounded-2xl border border-blue-100 bg-white p-8 shadow-lg">

      <div className="flex items-center gap-4">

        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            🧠 BriefTube AI is Working...
          </h2>

          <p className="mt-1 text-gray-500">
            This usually takes 5–15 seconds.
          </p>
        </div>

      </div>

      <div className="mt-8 space-y-4">

        <div className="flex items-center gap-3">
          <span className="text-xl">✅</span>
          <p className="text-gray-700">Validating YouTube URL</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xl">📄</span>
          <p className="text-gray-700">Fetching video transcript</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xl">🤖</span>
          <p className="font-semibold text-blue-600">
            Gemini AI is generating your summary...
          </p>
        </div>

      </div>
    </div>
  );
}