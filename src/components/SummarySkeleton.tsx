export default function SummarySkeleton() {
  return (
    <div className="mx-auto mt-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">

      {/* Thumbnail */}

      <div className="h-72 w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

      <div className="p-8">

        {/* Header */}

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div className="flex-1">

            <div className="h-9 w-4/5 animate-pulse rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

            <div className="mt-4 h-5 w-1/3 animate-pulse rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

          </div>

          {/* Buttons */}

          <div className="flex flex-wrap gap-3">

            <div className="h-11 w-24 animate-pulse rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

            <div className="h-11 w-20 animate-pulse rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

            <div className="h-11 w-32 animate-pulse rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

            <div className="h-11 w-24 animate-pulse rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />

          </div>

        </div>

        {/* Summary Box */}

        <div className="mt-10 rounded-3xl bg-blue-50 p-8">

          <div className="mb-6 h-8 w-1/2 animate-pulse rounded-xl bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100" />

          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className={`mb-4 h-4 animate-pulse rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 ${
                index % 3 === 0
                  ? "w-full"
                  : index % 3 === 1
                  ? "w-5/6"
                  : "w-4/6"
              }`}
            />
          ))}

          <div className="mt-8 h-7 w-1/3 animate-pulse rounded-xl bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100" />

          {[...Array(5)].map((_, index) => (
            <div
              key={index + 20}
              className={`mt-4 h-4 animate-pulse rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 ${
                index % 2 === 0 ? "w-full" : "w-3/4"
              }`}
            />
          ))}

        </div>

      </div>

    </div>
  );
}