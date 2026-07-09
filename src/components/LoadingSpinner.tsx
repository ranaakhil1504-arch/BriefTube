export default function LoadingSpinner() {
  return (
    <div className="mx-auto mt-10 flex flex-col items-center justify-center gap-4">

      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>

      <p className="text-lg font-medium text-gray-600">
        Generating AI Summary...
      </p>

    </div>
  );
}