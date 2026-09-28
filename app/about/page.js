import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: "About GetMeAChai - The Creator Support Platform",
  description: "Learn about GetMeAChai - A creator-first platform empowering fans to support creators through direct micro-donations.",
}

const About = () => {
  return (
    <div className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16 transition-colors duration-300">
      
      {/* Ambient Glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-rose-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md patreon-float">
          <span className="text-xs font-semibold text-rose-400">Our Story & Mission</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Fueling Passion, <br />
          <span className="bg-gradient-to-r from-rose-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
            One Cup at a Time.
          </span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          GetMeAChai bridges the gap between passionate creators and the communities that love their work through effortless, direct micro-support.
        </p>
      </div>

      {/* Main Grid Content with 3D Interactive Cursor Sheen */}
      <div className="space-y-8">
        
        {/* Section 1: What is GetMeAChai */}
        <div 
          data-cursor-3d
          data-tilt-deg="5"
          className="patreon-glass card-3d-interactive rounded-3xl p-7 sm:p-10 space-y-4 shadow-xl relative overflow-hidden group border border-white/[0.08] hover:border-rose-500/40"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 group-hover:scale-110 transition-transform duration-300">☕</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              What is GetMeAChai?
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            GetMeAChai is a modern crowdfunding platform designed from the ground up for developers, digital artists, writers, podcasters, and educators. Instead of complex subscription hurdles or high platform cuts, fans can express their appreciation in seconds by buying you a friendly cup of chai.
          </p>
        </div>

        {/* Section 2: How It Works */}
        <div 
          data-cursor-3d
          data-tilt-deg="4"
          className="patreon-glass card-3d-interactive rounded-3xl p-7 sm:p-10 space-y-8 shadow-xl border border-white/[0.08]"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2.5 rounded-2xl bg-orange-500/10 border border-orange-500/20">🚀</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              data-cursor-3d
              data-tilt-deg="8"
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.07] space-y-3 card-3d-interactive hover:border-rose-500/40"
            >
              <span className="inline-flex w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 font-extrabold text-sm items-center justify-center border border-rose-500/30">
                1
              </span>
              <h3 className="font-bold text-base text-white">Create Your Profile</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Sign in with GitHub, set your username, customize your banner, and link your Razorpay credentials.
              </p>
            </div>

            <div 
              data-cursor-3d
              data-tilt-deg="8"
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.07] space-y-3 card-3d-interactive hover:border-orange-500/40"
            >
              <span className="inline-flex w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 font-extrabold text-sm items-center justify-center border border-orange-500/30">
                2
              </span>
              <h3 className="font-bold text-base text-white">Share Your Link</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Add your personal page link to your YouTube descriptions, GitHub READMEs, Twitter bio, or blog.
              </p>
            </div>

            <div 
              data-cursor-3d
              data-tilt-deg="8"
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.07] space-y-3 card-3d-interactive hover:border-amber-500/40"
            >
              <span className="inline-flex w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-extrabold text-sm items-center justify-center border border-amber-500/30">
                3
              </span>
              <h3 className="font-bold text-base text-white">Get Direct Support</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Supporters send micro-donations with friendly messages that go straight to your linked account.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Why Chai */}
        <div 
          data-cursor-3d
          data-tilt-deg="5"
          className="patreon-glass card-3d-interactive rounded-3xl p-7 sm:p-10 space-y-4 shadow-xl border border-white/[0.08] hover:border-amber-500/40"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">❤️</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Why &ldquo;Chai&rdquo;?
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            In our culture, Chai isn&apos;t merely a beverage — it represents hospitality, comfort, shared conversations, and heartfelt gratitude. We believe showing love to creators should carry the same warm and friendly spirit.
          </p>
        </div>

      </div>

      {/* CTA Card with 3D Magnetic Interactive Button */}
      <div 
        data-cursor-3d
        data-tilt-deg="4"
        className="card-3d-interactive rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-rose-950/60 via-neutral-900 to-neutral-900 border border-white/[0.1] text-center space-y-5 shadow-2xl relative overflow-hidden"
      >
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Ready to launch your creator page?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
          Start receiving support from your fans in less than 2 minutes.
        </p>
        <div className="pt-2">
          <Link href="/login">
            <button
              type="button"
              data-cursor-3d
              data-tilt-deg="10"
              data-tilt-scale="1.06"
              className="btn-3d-interactive px-8 py-4 rounded-full text-black bg-white hover:bg-neutral-200 font-bold text-sm sm:text-base shadow-xl transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Start My Page Now</span>
              <span>→</span>
            </button>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default About
