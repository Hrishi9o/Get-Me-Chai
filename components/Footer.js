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
            </div>

            {/* Supported OAuth Providers Stack */}
            <div className="pt-2 space-y-1.5">
              <p className="text-[10px] uppercase tracking-wider font-bold text-neutral-400">
                Supported Social Sign-in
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {/* GitHub */}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-medium text-neutral-300 transition-colors">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </span>

                {/* Google */}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-medium text-neutral-300 transition-colors">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google</span>
                </span>

                {/* LinkedIn */}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-medium text-neutral-300 transition-colors">
                  <svg className="w-3.5 h-3.5 fill-[#0A66C2]" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.97 0 1.75-.79 1.75-1.76s-.78-1.75-1.75-1.75c-.97 0-1.76.78-1.76 1.75s.79 1.76 1.76 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                  </svg>
                  <span>LinkedIn</span>
                </span>

                {/* Facebook */}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-medium text-neutral-300 transition-colors">
                  <svg className="w-3.5 h-3.5 fill-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </span>
              </div>
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
                <Link href="/creators" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="text-rose-400 group-hover:translate-x-0.5 transition-transform">✨</span>
                  <span className="text-white font-bold">Explore Creators</span>
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