import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="w-full bg-[#08080c] border-t border-white/[0.08] text-neutral-400 text-xs sm:text-sm relative overflow-hidden transition-colors">

      {/* Hairline Animated Gradient Border */}
      <div className="h-[2px] w-full bg-gradient-to-r from-rose-500/40 via-orange-500/60 to-amber-500/40" />

      {/* Ambient background glow orb */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-rose-500/10 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10 relative z-10">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">

          {/* Brand & Mission Column (Col 5) */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group select-none">
              {/* 3D Crystal Emblem Container */}
              <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2a1720] via-[#1a1520] to-[#251515] border border-rose-500/40 group-hover:border-rose-400/80 transition-all duration-300 shadow-xl shadow-rose-950/40">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-rose-500/20 via-orange-500/15 to-transparent blur-sm pointer-events-none" />
                <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  <img src="/tea.gif" width={26} height={26} alt="Chai" className="drop-shadow-[0_4px_10px_rgba(255,66,77,0.4)] filter brightness-110" />
                </div>
                {/* Live Ruby Status Dot */}
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-[#08080c] shadow-[0_0_8px_#f43f5e] z-30 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                </div>
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col text-left leading-none">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-rose-100 transition-colors">
                    GetMeA<span className="bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300 bg-clip-text text-transparent">Chai</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md bg-gradient-to-r from-rose-500/20 to-orange-500/20 border border-rose-500/40 text-[9px] font-black tracking-widest text-rose-300 uppercase shadow-sm">
                    PRO
                  </span>
                </div>
                <span className="text-[9px] font-bold text-neutral-400 tracking-widest uppercase mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity">
                  Creator Direct Platform
                </span>
              </div>
            </Link>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Empowering developers, artists, podcasters, and builders to receive direct community support with cups of chai. 100% direct bank payouts with 0% platform cuts.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>0% Commission</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-[11px] font-semibold">
                <span>⚡ Direct Razorpay</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-[11px] font-semibold">
                <span>🔒 GitHub Auth</span>
              </span>
            </div>
          </div>

          {/* Quick Links Column (Col 3) */}
          <div className="md:col-span-3 space-y-3.5">
            <p className="text-xs uppercase font-extrabold tracking-widest text-white">
              Platform Navigation
            </p>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="text-neutral-600 group-hover:text-rose-400 transition-colors">→</span>
                  <span>Home Page</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="text-neutral-600 group-hover:text-rose-400 transition-colors">→</span>
                  <span>How It Works</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="text-neutral-600 group-hover:text-rose-400 transition-colors">→</span>
                  <span>About Platform</span>
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1.5 group font-bold">
                  <span className="text-rose-500 group-hover:translate-x-0.5 transition-transform">★</span>
                  <span>Start A Creator Page</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Direct Settlement Column (Col 4) */}
          <div className="md:col-span-4 space-y-3.5">
            <p className="text-xs uppercase font-extrabold tracking-widest text-white">
              Direct Bank Settlement
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every chai contribution is processed directly through your own linked Razorpay account. No platform holding periods or third-party custody of your creator funds.
            </p>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white">System Status</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-400">All Systems Operational</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} GetMeAChai. All contributions processed directly via Razorpay.
          </p>
          <div className="flex items-center gap-2">
            <span>Made with ❤️ and fresh cups of chai <span>☕</span> by Hrishi9o</span>      
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer