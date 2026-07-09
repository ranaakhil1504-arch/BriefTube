import { Sparkles, PlayCircle, FileText, Zap } from "lucide-react";
import UrlInput from "./UrlInput";

type HeroProps = {
  onGenerate: (url: string) => void;
  loading: boolean;
};

export default function Hero({
  onGenerate,
  loading,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}

      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-blue-50 via-white to-violet-50" />

      <div className="absolute -left-24 top-24 -z-10 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />

      <div className="absolute -right-24 top-0 -z-10 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl" />

      <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">

        {/* AI Badge */}

        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-5 py-2 shadow-sm backdrop-blur">
          <Sparkles className="h-4 w-4 text-blue-600" />

          <span className="text-sm font-semibold text-blue-700">
            Powered by Gemini AI
          </span>
        </div>

        {/* Heading */}

        <h1 className="max-w-5xl text-5xl font-black leading-tight tracking-tight text-gray-900 md:text-7xl">
          Summarize
          <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
            {" "}
            YouTube Videos{" "}
          </span>
          in Seconds
        </h1>

        {/* Description */}

        <p className="mt-8 max-w-3xl text-lg leading-9 text-gray-600 md:text-xl">
          Paste any YouTube link and let AI instantly generate structured
          summaries, key insights, important takeaways, and downloadable notes
          in PDF, Markdown, or TXT format.
        </p>

        {/* URL INPUT */}

        <UrlInput onGenerate={onGenerate}
                  loading={loading}/>

        {/* Features */}

        <div className="mt-16 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-white/70 bg-white/70 p-8 shadow-lg backdrop-blur transition hover:-translate-y-2 hover:shadow-xl">
            <PlayCircle className="mx-auto mb-4 h-10 w-10 text-red-500" />

            <h3 className="text-xl font-bold text-gray-900">
              Any YouTube Video
            </h3>

            <p className="mt-3 text-gray-600">
              Works with educational videos, podcasts, tutorials, interviews,
              and much more.
            </p>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/70 p-8 shadow-lg backdrop-blur transition hover:-translate-y-2 hover:shadow-xl">
            <Zap className="mx-auto mb-4 h-10 w-10 text-yellow-500" />

            <h3 className="text-xl font-bold text-gray-900">
              AI Powered
            </h3>

            <p className="mt-3 text-gray-600">
              Gemini AI creates clear, structured summaries in just a few
              seconds.
            </p>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/70 p-8 shadow-lg backdrop-blur transition hover:-translate-y-2 hover:shadow-xl">
            <FileText className="mx-auto mb-4 h-10 w-10 text-blue-600" />

            <h3 className="text-xl font-bold text-gray-900">
              Export Anywhere
            </h3>

            <p className="mt-3 text-gray-600">
              Copy your summary or download it instantly as TXT, Markdown, or
              PDF.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}