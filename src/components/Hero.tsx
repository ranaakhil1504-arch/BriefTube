export default function Hero() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-6">
      <div className="max-w-3xl text-center">

        <h1 className="text-5xl font-extrabold leading-tight text-gray-900 md:text-6xl">
          Turn YouTube Videos
          <br />
          Into Actionable Knowledge
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Paste any YouTube video and get an AI-powered summary
          in seconds.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            placeholder="Paste YouTube URL here..."
            className="flex-1 rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-500"
          />

          <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700">
            🚀 Generate Summary
          </button>
        </div>

        <div className="mt-10 flex w-full max-w-2xl flex-col gap-4 mx-auto md:flex-row">
  <input
    type="text"
    placeholder="Paste YouTube URL here..."
    className="w-full rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-500"
  />

  <button className="whitespace-nowrap rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700">
    🚀 Generate Summary
  </button>
</div>
      </div>
    </section>
  );
}