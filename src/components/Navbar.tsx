export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎬</span>
          <h1 className="text-xl font-bold text-blue-600">
            BriefTube
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden gap-8 md:flex">
          <a href="#" className="text-gray-600 hover:text-blue-600">
            Features
          </a>

          <a href="#" className="text-gray-600 hover:text-blue-600">
            Pricing
          </a>

          <a href="#" className="text-gray-600 hover:text-blue-600">
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}