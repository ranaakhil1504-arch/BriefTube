import {
  Sparkles,
  PlayCircle,
  FileText,
  Zap,
} from "lucide-react";

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
    <section className="relative isolate overflow-hidden bg-white">

      {/* Background */}

      <div className="absolute inset-0 -z-30 bg-gradient-to-b from-slate-50 via-white to-blue-50" />

      <div className="absolute left-1/2 top-24 -z-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-400/30 via-violet-400/30 to-cyan-300/30 blur-[120px]" />

      <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">

        {/* AI Badge */}

        <div className="animate-floating mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-5 py-2 shadow-md backdrop-blur">

          <Sparkles className="h-4 w-4 text-blue-600" />

          <span className="text-sm font-semibold text-blue-700">
            Powered by Gemini AI
          </span>

        </div>

        {/* Heading */}

        <div className="relative">

          {/* Glow */}

          <div className="hero-glow absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 blur-3xl" />

          <h1 className="relative max-w-5xl text-5xl font-black leading-tight tracking-tight text-gray-900 md:text-7xl">

            Summarize

            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              YouTube Videos{" "}
            </span>

            in Seconds

          </h1>

        </div>
                {/* Description */}

        <p className="mt-8 max-w-3xl text-lg leading-9 text-gray-600 md:text-xl">
          Transform long YouTube videos into concise, AI-powered summaries in
          seconds. Learn faster, save time, and export your notes as PDF,
          Markdown, or TXT with a single click.
        </p>

        {/* URL Input */}

        <div className="mt-12 w-full">
          <UrlInput
            onGenerate={onGenerate}
            loading={loading}
          />
        </div>

        {/* Small Trust Text */}

        <p className="mt-6 text-sm text-gray-500">
          Trusted for educational videos, podcasts, interviews, coding
          tutorials, documentaries, and more.
        </p>

        {/* Features */}

        <div className="mt-20 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Card 1 */}

          <div className="group rounded-3xl border border-gray-100 bg-white/80 p-8 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-3 hover:border-red-200 hover:shadow-2xl hover:shadow-red-100">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">

              <PlayCircle className="h-9 w-9 text-red-500 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6" />

            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900">
              Any YouTube Video
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              Supports tutorials, podcasts, interviews, documentaries,
              educational content and much more.
            </p>

          </div>

          {/* Card 2 */}

          <div className="group rounded-3xl border border-gray-100 bg-white/80 p-8 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-3 hover:border-yellow-200 hover:shadow-2xl hover:shadow-yellow-100">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-50">

              <Zap className="h-9 w-9 text-yellow-500 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />

            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900">
              Lightning Fast AI
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              Powered by Gemini AI to generate clean, structured summaries
              within seconds.
            </p>

          </div>

          {/* Card 3 */}

          <div className="group rounded-3xl border border-gray-100 bg-white/80 p-8 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-3 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">

              <FileText className="h-9 w-9 text-blue-600 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" />

            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900">
              Export Anywhere
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              Download summaries instantly as PDF, Markdown or TXT, or copy
              them with a single click.
            </p>

          </div>
        </div>
</div>
    </section>
  
  );
}