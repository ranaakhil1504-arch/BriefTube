import { Sparkles, Heart, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-gradient-to-b from-white via-blue-50 to-violet-50">
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-12 md:grid-cols-3">

          {/* Brand */}

          <div>
            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg">
                <Sparkles className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-2xl font-black text-gray-900">
                  BriefTube
                </h2>

                <p className="text-sm text-gray-500">
                  AI YouTube Summarizer
                </p>
              </div>

            </div>

            <p className="mt-6 leading-7 text-gray-600">
              Turn long YouTube videos into clean, structured AI summaries in
              seconds. Save time, learn faster, and export your notes with one click.
            </p>

          </div>

          {/* Features */}

          <div>

            <h3 className="text-lg font-bold text-gray-900">
              Features
            </h3>

            <ul className="mt-5 space-y-3 text-gray-600">
              <li>✨ AI Generated Summaries</li>
              <li>📄 PDF Export</li>
              <li>📝 Markdown Export</li>
              <li>📋 Copy Summary</li>
              <li>🔗 Share Summary</li>
              <li>⚡ Lightning Fast</li>
            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-lg font-bold text-gray-900">
              Contact
            </h3>

            <div className="mt-5">

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

                <Mail className="h-5 w-5 text-blue-600" />

                <span className="text-gray-700">
                  Coming Soon
                </span>

              </div>

              <div className="mt-6">

                <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                  Version 1.0
                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="mt-14 border-t border-gray-200 pt-8">

          <p className="flex items-center justify-center gap-2 text-center text-gray-500">

            Built with

            <Heart className="h-4 w-4 fill-red-500 text-red-500" />

            using React + TypeScript + Gemini AI

          </p>

          <p className="mt-3 text-center text-sm text-gray-400">
            © 2026 BriefTube. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}