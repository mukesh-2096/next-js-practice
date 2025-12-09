import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-sky-50 to-violet-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-slate-900 mb-4">
            Next.js Rendering Modes
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore the three different rendering patterns in Next.js App Router
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Static Page Card */}
          <Link href="/about" className="group">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 hover:-translate-y-2 transition-transform duration-300 h-full">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Static Rendering</h2>
              <div className="mt-6 inline-flex items-center text-blue-500 font-semibold">
                View About Page
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Dynamic Page Card */}
          <Link href="/dashboard" className="group">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 hover:-translate-y-2 transition-transform duration-300 h-full">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Dynamic Rendering</h2>
              <div className="mt-6 inline-flex items-center text-green-500 font-semibold">
                View Dashboard
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* ISR Page Card */}
          <Link href="/news" className="group">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 hover:-translate-y-2 transition-transform duration-300 h-full">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">ISR Rendering</h2>
              <div className="mt-6 inline-flex items-center text-purple-500 font-semibold">
                View News
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
