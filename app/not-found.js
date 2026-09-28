import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: "404 - Chai Not Found | GetMeAChai",
  description: "The page or creator you are looking for does not exist.",
}

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-center transition-colors duration-300">
      {/* Glow Effect */}
      <div className="relative max-w-lg w-full mx-auto">
        <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/20 via-orange-500/20 to-amber-500/20 blur-3xl rounded-full -z-10 pointer-events-none" />

        {/* 404 Chai Illustration Card with 3D Interactive Cursor */}
        <div 
          data-cursor-3d
          data-tilt-deg="5"
          className="patreon-glass card-3d-interactive rounded-3xl p-8 sm:p-12 shadow-2xl border border-black/[0.08] dark:border-white/[0.1] backdrop-blur-2xl space-y-6"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-7xl sm:text-8xl font-black bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
              4
            </span>
            <div className="relative flex items-center justify-center p-3.5 bg-neutral-100 dark:bg-white/[0.05] rounded-3xl border border-black/[0.08] dark:border-white/10 shadow-inner animate-bounce">
              <img src="/tea.gif" width={56} height={56} alt="Chai" className="drop-shadow-lg" />
            </div>
            <span className="text-7xl sm:text-8xl font-black bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
              4
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              This Chai Cup is Empty
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
              The creator page or resource you are looking for might have been moved, renamed, or does not exist.
            </p>
          </div>

          {/* Action Buttons with 3D Magnetic Cursor Tilt */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/" className="w-full sm:w-auto">
              <button
                type="button"
                data-cursor-3d
                data-tilt-deg="9"
                data-tilt-scale="1.05"
                className="btn-3d-interactive w-full sm:w-auto text-white bg-neutral-900 hover:bg-neutral-800 dark:text-black dark:bg-white dark:hover:bg-neutral-200 font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg transition-all cursor-pointer"
              >
                ☕ Return Home
              </button>
            </Link>

            <Link href="/about" className="w-full sm:w-auto">
              <button
                type="button"
                data-cursor-3d
                data-tilt-deg="9"
                data-tilt-scale="1.05"
                className="btn-3d-interactive w-full sm:w-auto text-neutral-800 dark:text-neutral-200 bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] border border-black/[0.08] dark:border-white/10 font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all cursor-pointer"
              >
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
