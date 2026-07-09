import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
              BriefTube
            </h1>

            <p className="-mt-1 text-xs text-gray-500">
              AI YouTube Summarizer
            </p>
          </div>
        </div>

        {/* Right */}

        <div className="hidden items-center gap-6 md:flex">
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
            Gemini AI
          </span>
        </div>
      </div>
    </header>
  );
}