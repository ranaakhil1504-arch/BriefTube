import UrlInput from "./UrlInput";

type HeroProps = {
  onGenerate: (videoId: string) => void;
};

export default function Hero({ onGenerate }: HeroProps) {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold leading-tight text-gray-900 md:text-6xl">
          Turn YouTube Videos
          <br />
          Into Actionable Knowledge
        </h1>

        <p className="mt-6 text-xl text-gray-600">
          Get AI-powered summaries of any YouTube video in seconds.
          Perfect for students, professionals, and lifelong learners.
        </p>

        <UrlInput onGenerate={onGenerate} />

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-600">
          <span className="rounded-full bg-blue-50 px-4 py-2">
            ✅ Free
          </span>

          <span className="rounded-full bg-blue-50 px-4 py-2">
            🔒 No Login Required
          </span>

          <span className="rounded-full bg-blue-50 px-4 py-2">
            🌍 30+ Languages
          </span>

          <span className="rounded-full bg-blue-50 px-4 py-2">
            🤖 AI Powered
          </span>
        </div>
      </div>
    </section>
  );
}