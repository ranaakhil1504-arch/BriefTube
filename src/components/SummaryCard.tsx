type SummaryCardProps = {
  videoId: string;
  summary: string;
};

export default function SummaryCard({
  videoId,
  summary,
}: SummaryCardProps) {
  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="mx-auto mt-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">

      <img
        src={thumbnail}
        alt="Video Thumbnail"
        className="h-72 w-full object-cover"
      />

      <div className="p-8">

        <h2 className="mb-6 text-3xl font-bold text-gray-900">
          📄 AI Video Summary
        </h2>

        <div className="mb-6 rounded-lg bg-gray-100 p-4">
          <p className="text-sm font-semibold text-gray-500">
            Video ID
          </p>

          <p className="mt-2 break-all font-mono text-gray-700">
            {videoId}
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 p-6">
          <h3 className="mb-3 text-xl font-semibold text-blue-900">
            Summary
          </h3>

          <p className="leading-8 text-gray-700">
            {summary}
          </p>
        </div>

      </div>
    </div>
  );
}