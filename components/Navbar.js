"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from "next-auth/react"
import { fetchuser } from '@/actions/useractions'

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setshowdropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profilePic, setProfilePic] = useState(session?.user?.profilepic || session?.user?.image || null)
  const pathname = usePathname()

  useEffect(() => {
    if (session?.user?.name) {
      fetchuser(session.user.name).then((u) => {
        if (u?.profilepic) {
          setProfilePic(u.profilepic)
        }
      }).catch(() => {})
    }
  }, [session])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Zero-render 3D Magnetic Cursor Tilt Handler
  const handleTilt = (e, maxTilt = 10, scale = 1.04) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -maxTilt;
    const ry = ((x - cx) / cx) * maxTilt;
    el.style.transform = `perspective(600px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
    el.style.setProperty('--sheen-x', `${((x / rect.width) * 100).toFixed(1)}%`);
    el.style.setProperty('--sheen-y', `${((y / rect.height) * 100).toFixed(1)}%`);
  };

  const handleReset = (e) => {
    const el = e.currentTarget;
    el.style.transform = `perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-[#0a0a0e]/80 border-b border-white/[0.08] shadow-2xl transition-all">
      {/* Hairline ambient light accent at the very top */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Left Nav Links & Live Platform Tag — hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 sm:gap-4">
          <nav className="flex items-center gap-1 sm:gap-1.5">
            <Link
              href="/"
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all ${
                pathname === '/'
                  ? 'text-white bg-white/[0.1] shadow-sm'
                  : 'text-neutral-300 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              Home
            </Link>
            <Link
              href="/creators"
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all ${
                pathname === '/creators'
                  ? 'text-white bg-white/[0.1] shadow-sm'
                  : 'text-neutral-300 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              Explore
            </Link>
            <Link
              href="/about"
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all ${
                pathname === '/about'
                  ? 'text-white bg-white/[0.1] shadow-sm'
                  : 'text-neutral-300 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              How It Works
            </Link>
          </nav>

          {/* Live Status Pill */}
          <div className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>0% Platform Commission</span>
          </div>
        </div>

        {/* Center Brand Logo (Enhanced 3D Crystal Gem with Interactive Cursor Tilt) */}
        <Link 
          href="/" 
          onMouseMove={(e) => handleTilt(e, 14, 1.05)}
          onMouseLeave={handleReset}
          className="group flex items-center gap-3 cursor-pointer select-none preserve-3d"
        >
          {/* 3D Crystal Emblem Container */}
          <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#2a1720] via-[#1a1520] to-[#251515] border border-rose-500/40 group-hover:border-rose-400/80 transition-all duration-300 shadow-xl shadow-rose-950/40 preserve-3d">
            
            {/* Ambient Radial Glow behind Cup */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-rose-500/20 via-orange-500/15 to-transparent blur-sm pointer-events-none" />
            
            {/* Micro Rising Steam Wisps */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center gap-1 pointer-events-none z-20">
              <span className="w-0.5 h-3 bg-gradient-to-t from-orange-300/70 to-transparent rounded-full blur-[0.3px] animate-logo-steam-1" />
              <span className="w-0.5 h-4 bg-gradient-to-t from-rose-300/80 to-transparent rounded-full blur-[0.3px] animate-logo-steam-2" />
            </div>

            {/* Chai GIF Emblem with 3D Depth */}
            <div style={{ transform: 'translateZ(14px)' }} className="relative z-10 transition-transform duration-300 group-hover:scale-110">
              <img src="/tea.gif" width={28} height={28} alt="Chai" className="drop-shadow-[0_4px_10px_rgba(255,66,77,0.4)] filter brightness-110" />
            </div>

            {/* Live Ruby Status Dot with Glow Pulse */}
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 border-2 border-[#0a0a0e] shadow-[0_0_10px_#f43f5e] z-30 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
          </div>

          {/* Brand Typography with Pro Pill & Subtitle */}
          <div className="flex flex-col text-left leading-none">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-rose-100 transition-colors">
                GetMeA<span className="bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300 bg-clip-text text-transparent">Chai</span>
              </span>
              <span className="px-1.5 py-0.5 rounded-md bg-gradient-to-r from-rose-500/20 to-orange-500/20 border border-rose-500/40 text-[9px] font-black tracking-widest text-rose-300 uppercase hidden sm:inline-block shadow-sm">
                PRO
              </span>
            </div>
            <span className="text-[9px] font-bold text-neutral-400 tracking-widest uppercase hidden md:block mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity">
              Creator Direct Platform
            </span>
          </div>
        </Link>


        {/* Right Actions: Auth Buttons — hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 sm:gap-3">
          
          {session ? (
            <div className="relative inline-block text-left">
              {/* User Pill Button with 3D Interactive Cursor */}
              <button
                id="dropdownDefaultButton"
                data-cursor-3d
                data-tilt-deg="7"
                data-tilt-scale="1.03"
                onClick={() => setshowdropdown(!showdropdown)}
                onBlur={() => {
                  setTimeout(() => {
                    setshowdropdown(false)
                  }, 250);
                }}
                className="btn-3d-interactive flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-rose-500/40 cursor-pointer"
                type="button"
              >
                {profilePic ? (
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-white/30 shrink-0 bg-neutral-900 shadow-sm">
                    <img
                      src={profilePic}
                      alt={session.user?.name || "User"}
                      className="w-full h-full object-cover rounded-full"
                      onError={() => setProfilePic(null)}
                    />
                  </div>
                ) : (
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-rose-500 to-orange-400 flex items-center justify-center text-white text-xs font-black uppercase shadow-sm shrink-0">
                    {(session.user?.name || session.user?.email || "U")[0]}
                  </div>
                )}
                <span className="text-xs sm:text-sm font-bold text-neutral-200 max-w-[80px] sm:max-w-[130px] truncate">
                  {session.user?.name || session.user?.email}
                </span>
                <svg className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${showdropdown ? 'rotate-180 text-rose-400' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                id="dropdown"
                className={`z-50 ${showdropdown ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"} absolute right-0 mt-2.5 origin-top-right w-60 rounded-3xl bg-[#14141a]/95 border border-white/15 shadow-2xl p-2 transition-all duration-200 ease-out backdrop-blur-2xl`}
              >
                <div className="px-3.5 py-2.5 border-b border-white/[0.08] mb-1.5 flex items-center gap-2.5">
                  {profilePic ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-rose-500/40 shrink-0 bg-neutral-900 shadow-md">
                      <img
                        src={profilePic}
                        alt={session.user?.name || "User"}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-orange-400 flex items-center justify-center text-white text-xs font-black uppercase shadow-md shrink-0">
                      {(session.user?.name || session.user?.email || "U")[0]}
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <p className="text-[10px] uppercase tracking-wider font-extrabold text-neutral-400">Signed in as</p>
                    <p className="text-xs font-black text-white truncate">@{session.user?.name || "user"}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <Link
                    href={`/${session.user?.name}`}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/[0.08] rounded-2xl transition-colors"
                  >
                    <span className="text-rose-400 text-sm">☕</span>
                    <span>Your Public Page</span>
                  </Link>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/[0.08] rounded-2xl transition-colors"
                  >
                    <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                    <span>Creator Dashboard</span>
                  </Link>

                  <Link
                    href="/"
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/[0.08] rounded-2xl transition-colors"
                  >
                    <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Home Page</span>
                  </Link>
                </div>

                <div className="pt-1.5 mt-1.5 border-t border-white/[0.08]">
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-2xl transition-colors cursor-pointer text-left"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/login"
                data-cursor-3d
                data-tilt-deg="8"
                data-tilt-scale="1.04"
                className="btn-3d-interactive text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white px-3.5 sm:px-4 py-2 rounded-full hover:bg-white/[0.08] border border-white/10 transition-all cursor-pointer"
              >
                Log In
              </Link>
              <Link
                href="/login"
                data-cursor-3d
                data-tilt-deg="8"
                data-tilt-scale="1.04"
                className="btn-3d-interactive text-xs sm:text-sm font-extrabold text-black bg-white hover:bg-neutral-200 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all shadow-xl hover:shadow-rose-500/20 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Start My Page</span>
                <span className="text-neutral-500 text-xs hidden sm:inline">→</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button — visible only on mobile */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500/40 cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          type="button"
        >
          <span className="sr-only">Menu</span>
          {mobileMenuOpen ? (
            /* X icon */
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Hamburger icon */
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-5 pt-2 border-t border-white/[0.08] bg-[#0a0a0e]/95 backdrop-blur-2xl space-y-1">

          {/* Nav Links */}
          <Link
            href="/"
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
              pathname === '/'
                ? 'text-white bg-white/[0.1]'
                : 'text-neutral-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>

          <Link
            href="/creators"
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
              pathname === '/creators'
                ? 'text-white bg-white/[0.1]'
                : 'text-neutral-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <span className="text-base">✨</span>
            Explore Creators
          </Link>

          <Link
            href="/about"
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
              pathname === '/about'
                ? 'text-white bg-white/[0.1]'
                : 'text-neutral-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How It Works
          </Link>

          {/* Divider */}
          <div className="h-px bg-white/[0.06] my-2" />

          {/* Auth section */}
          {session ? (
            <>
              {/* User Info */}
              <div className="flex items-center gap-3 px-4 py-3">
                {profilePic ? (
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-rose-500/40 shrink-0 bg-neutral-900 shadow-md">
                    <img src={profilePic} alt={session.user?.name || "User"} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-orange-400 flex items-center justify-center text-white text-sm font-black uppercase shadow-md shrink-0">
                    {(session.user?.name || session.user?.email || "U")[0]}
                  </div>
                )}
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-extrabold text-neutral-400">Signed in as</p>
                  <p className="text-sm font-black text-white truncate max-w-[180px]">@{session.user?.name || "user"}</p>
                </div>
              </div>

              <Link
                href={`/${session.user?.name}`}
                className="flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-semibold text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                <span className="text-rose-400">☕</span>
                Your Public Page
              </Link>

              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-semibold text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                Creator Dashboard
              </Link>

              <button
                onClick={() => signOut()}
                className="flex items-center gap-2.5 w-full px-4 py-3 text-sm font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-2xl transition-colors cursor-pointer text-left"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-1">
              <Link
                href="/login"
                className="flex items-center justify-center px-4 py-3 rounded-2xl text-sm font-semibold text-neutral-200 hover:text-white border border-white/10 hover:bg-white/[0.08] transition-all"
              >
                Log In
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-extrabold text-black bg-white hover:bg-neutral-200 transition-all shadow-xl"
              >
                Start My Page <span className="text-neutral-500">→</span>
              </Link>
            </div>
          )}

          {/* Live Status Pill at bottom */}
          <div className="flex items-center gap-1.5 px-4 py-2 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 text-[11px] font-bold">0% Platform Commission</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
