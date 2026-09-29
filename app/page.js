"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null)
  const [supporterCount, setSupporterCount] = useState(150)
  const [chaiPrice, setChaiPrice] = useState(20)
  const [activeStep, setActiveStep] = useState(0)
  const [brewingChai, setBrewingChai] = useState(5)
  const [comparisonTab, setComparisonTab] = useState("getmeachai")

  // Interactive Video Spotlight Player State
  const [videoPlaying, setVideoPlaying] = useState(true)
  const [videoProgress, setVideoProgress] = useState(0)
  const [activeVideoScene, setActiveVideoScene] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  const videoScenes = [
    {
      id: 0,
      title: "1. Create Page & Connect Razorpay",
      badge: "Creator Setup",
      accent: "from-rose-500/20 to-orange-500/10",
      glowColor: "rgba(244, 63, 94, 0.25)",
      desc: "Claim your custom handle, set up your profile, and connect your Razorpay keys."
    },
    {
      id: 1,
      title: "2. Supporter Picks Chai & Checkout",
      badge: "5-Sec UPI",
      accent: "from-orange-500/20 to-amber-500/10",
      glowColor: "rgba(245, 158, 11, 0.25)",
      desc: "Fans pick chai cups, add personal encouragement, and pay via UPI or card."
    },
    {
      id: 2,
      title: "3. Direct Bank Settlement (0% Cut)",
      badge: "Instant Payout",
      accent: "from-emerald-500/20 to-teal-500/10",
      glowColor: "rgba(16, 185, 129, 0.25)",
      desc: "Funds transfer directly into your linked bank account with 0% platform deductions."
    },
    {
      id: 3,
      title: "4. Live Supporter Wall & Recognition",
      badge: "Real-Time Feed",
      accent: "from-amber-500/20 to-rose-500/10",
      glowColor: "rgba(251, 191, 36, 0.25)",
      desc: "Supporter notes and amounts appear instantly on your real-time leaderboard."
    }
  ];

  useEffect(() => {
    let interval = null;
    if (videoPlaying) {
      interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            setActiveVideoScene(0);
            return 0;
          }
          const increment = 1.0 * playbackSpeed;
          const next = prev + increment;
          const sceneIndex = Math.min(Math.floor((next / 100) * videoScenes.length), videoScenes.length - 1);
          setActiveVideoScene(sceneIndex);
          return next;
        });
      }, 120);
    }
    return () => clearInterval(interval);
  }, [videoPlaying, videoScenes.length, playbackSpeed]);

  const handleSelectScene = (sceneIndex) => {
    setActiveVideoScene(sceneIndex);
    setVideoProgress((sceneIndex / videoScenes.length) * 100 + 2);
  };

  const creatorCategories = [
    { label: "💻 Open Source", count: "Developers" },
    { label: "🎨 Digital Arts", count: "Artists" },
    { label: "🎙️ Podcasts", count: "Podcasters" },
    { label: "✍️ Writing & Blogs", count: "Writers" },
    { label: "🎮 Game Development", count: "Builders" },
    { label: "🎥 Video & Media", count: "Creators" },
    { label: "🎵 Music & Audio", count: "Musicians" },
  ];

  const platformCapabilities = [
    { title: "Direct Razorpay Payouts", desc: "Funds go straight to your bank", icon: "⚡" },
    { title: "0% Platform Commissions", desc: "Keep 100% of community support", icon: "💎" },
    { title: "Real-Time Supporter Wall", desc: "Display fans' notes instantly", icon: "💬" },
    { title: "Custom Creator URL", desc: "getmeachai.com/yourhandle", icon: "🔗" },
    { title: "Instant UPI & Card Checkout", desc: "Supporters back you in 5 seconds", icon: "💳" },
    { title: "Creator Studio Dashboard", desc: "Manage your keys & public page", icon: "📊" },
  ];

  const steps = [
    {
      num: "01",
      title: "Create Your Account",
      desc: "Sign in with GitHub in seconds, claim your custom username handle, and set up your public profile banner.",
      icon: "⚡"
    },
    {
      num: "02",
      title: "Link Your Razorpay",
      desc: "Add your Razorpay Key ID and Secret in your dashboard to receive 100% direct payouts straight to your bank.",
      icon: "💳"
    },
    {
      num: "03",
      title: "Share & Get Funded",
      desc: "Share your creator link across social bios, YouTube descriptions, or GitHub READMEs and receive chai with heartfelt notes.",
      icon: "☕"
    }
  ];

  const faqs = [
    {
      q: "How do I receive payments from my supporters?",
      a: "All payments are processed directly through your own linked Razorpay account. There are no platform holding periods—funds go straight to your designated bank account."
    },
    {
      q: "Are there any hidden platform fees or subscription cuts?",
      a: "GetMeAChai charges 0% platform commissions on your earnings. You receive 100% of your community's direct contributions minus standard payment gateway fees."
    },
    {
      q: "Can anyone buy me a chai without creating an account?",
      a: "Yes! Supporters can quickly send you chai and encouraging messages without needing to complete any complicated signup process."
    },
    {
      q: "Where can I share my GetMeAChai creator link?",
      a: "You can place your personal link in your YouTube video descriptions, GitHub READMEs, Twitter/X bio, Instagram link-in-bio, personal portfolio, or newsletter."
    }
  ];

  const estimatedEarnings = supporterCount * chaiPrice;

  // Zero-render RAF-driven smooth parallax & spotlight tracking (No React re-renders)
  const pageRef = React.useRef(null);

  useEffect(() => {
    let animationFrameId = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let mouseClientX = -1000;
    let mouseClientY = -1000;
    let currentMouseX = -1000;
    let currentMouseY = -1000;

    const handleMouseMove = (e) => {
      const width = window.innerWidth || 1200;
      const height = window.innerHeight || 800;
      targetX = (e.clientX - width / 2) / (width / 2);
      targetY = (e.clientY - height / 2) / (height / 2);
      mouseClientX = e.clientX;
      mouseClientY = e.clientY;
    };

    const render = () => {
      // Silky smooth interpolation factor
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      currentMouseX += (mouseClientX - currentMouseX) * 0.12;
      currentMouseY += (mouseClientY - currentMouseY) * 0.12;

      if (pageRef.current) {
        pageRef.current.style.setProperty('--norm-x', currentX.toFixed(4));
        pageRef.current.style.setProperty('--norm-y', currentY.toFixed(4));
        pageRef.current.style.setProperty('--mouse-x', `${currentMouseX.toFixed(1)}px`);
        pageRef.current.style.setProperty('--mouse-y', `${currentMouseY.toFixed(1)}px`);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Zero-render 60-120 FPS 3D Card & Button Tilt with Specular Sheen Handler
  const handleCardTilt = (e, maxTilt = 10, scale = 1.025) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
    card.style.setProperty('--sheen-x', `${((x / rect.width) * 100).toFixed(1)}%`);
    card.style.setProperty('--sheen-y', `${((y / rect.height) * 100).toFixed(1)}%`);
  };

  const handleCardTiltReset = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };



  // Appropriate Authentic Creator & Chai Pictures for Home Page Background
  const backgroundPictures = [
    {
      id: "bg-chai-ritual",
      category: "☕ Chai Ritual",
      role: "Masala Chai Craft",
      stat: "100% Direct Payouts",
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
      top: "7%",
      left: "2%",
      speedX: -26,
      speedY: -18,
      rotate: "-5deg",
    },
    {
      id: "bg-artist-canvas",
      category: "🎨 Visual Arts",
      role: "Digital Concept Painter",
      stat: "850+ Backers",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
      top: "28%",
      right: "2%",
      speedX: 28,
      speedY: -22,
      rotate: "6deg",
    },
    {
      id: "bg-developer-coding",
      category: "💻 Indie Software",
      role: "Open Source Builder",
      stat: "0% Platform Cut",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
      top: "50%",
      left: "2.5%",
      speedX: -30,
      speedY: 24,
      rotate: "4deg",
    },
    {
      id: "bg-podcast-studio",
      category: "🎙️ Sound & Media",
      role: "Audio Show Creator",
      stat: "Real-time Wall",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
      top: "70%",
      right: "2.5%",
      speedX: 26,
      speedY: 18,
      rotate: "-6deg",
    },
    {
      id: "bg-writer-desk",
      category: "✍️ Literature",
      role: "Independent Writer",
      stat: "Direct Fan Notes",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
      top: "87%",
      left: "3%",
      speedX: -24,
      speedY: 16,
      rotate: "5deg",
    },
  ];

  return (
    <div ref={pageRef} className="relative overflow-hidden text-neutral-100 bg-[#0c0c0f]">

      {/* GPU Smooth Ambient Spotlight Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 opacity-70 will-change-transform"
        style={{
          background: `radial-gradient(650px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(255, 66, 77, 0.12), rgba(245, 158, 11, 0.05) 45%, transparent 70%)`
        }}
      />

      {/* Dynamic Animated Ambient Background Layer with Parallax Pictures */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Subtle Tech Dot Grid Mesh */}
        <div className="absolute inset-0 dynamic-bg-mesh opacity-50" />

        {/* Ambient Aurora Wave */}
        <div className="absolute inset-0 animate-aurora-wave opacity-25 mix-blend-screen" />

        {/* Drifting Radiant Ambient Glow Orbs */}
        <div className="absolute top-[8%] -left-28 w-[560px] h-[560px] rounded-full bg-rose-600/18 blur-[140px] animate-orb-drift-1" />
        <div className="absolute top-[32%] -right-28 w-[620px] h-[620px] rounded-full bg-amber-500/15 blur-[150px] animate-orb-drift-2" />
        <div className="absolute top-[58%] left-[10%] w-[680px] h-[680px] rounded-full bg-orange-600/12 blur-[160px] animate-orb-drift-3" />
        <div className="absolute top-[82%] right-[5%] w-[520px] h-[520px] rounded-full bg-emerald-500/12 blur-[130px] animate-orb-drift-1" />

        {/* Dynamic Rising Particles */}
        {[
          { left: 10, size: 3, duration: 18, delay: 0 },
          { left: 22, size: 4, duration: 24, delay: 3 },
          { left: 35, size: 2.5, duration: 16, delay: 6 },
          { left: 48, size: 5, duration: 22, delay: 2 },
          { left: 62, size: 3, duration: 19, delay: 7 },
          { left: 75, size: 4, duration: 25, delay: 1 },
          { left: 88, size: 3.5, duration: 20, delay: 5 },
          { left: 95, size: 2, duration: 17, delay: 8 },
        ].map((pt, idx) => (
          <span
            key={idx}
            className="floating-bg-particle bg-gradient-to-t from-rose-500/35 via-orange-400/25 to-amber-300/10 blur-[1px]"
            style={{
              left: `${pt.left}%`,
              width: `${pt.size}px`,
              height: `${pt.size * 2.5}px`,
              animationDuration: `${pt.duration}s`,
              animationDelay: `${pt.delay}s`,
            }}
          />
        ))}

        {/* Appropriate Creator & Chai Pictures with Silk Parallax */}
        {backgroundPictures.map((pic) => (
          <div
            key={pic.id}
            className="interactive-bg-picture hidden lg:flex flex-col items-start absolute p-2 rounded-2xl bg-neutral-900/70 backdrop-blur-xl border border-white/10 shadow-2xl group pointer-events-auto z-[2] opacity-45 hover:opacity-100 transition-all duration-300 will-change-transform"
            style={{
              top: pic.top,
              left: pic.left,
              right: pic.right,
              transform: `translate3d(calc(var(--norm-x, 0) * ${pic.speedX}px), calc(var(--norm-y, 0) * ${pic.speedY}px), 0) rotate(${pic.rotate})`,
            }}
          >
            <div className="w-32 xl:w-36 h-24 xl:h-28 rounded-xl overflow-hidden relative border border-white/10 shadow-inner">
              <img
                src={pic.image}
                alt={pic.role}
                className="w-full h-full object-cover object-center filter brightness-90 group-hover:scale-115 group-hover:brightness-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
              <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[9px] font-bold text-rose-300 border border-white/10">
                {pic.category.split(' ')[0]}
              </span>
              <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-bold text-white truncate drop-shadow">
                {pic.role}
              </span>
            </div>
            <div className="pt-1.5 px-1 flex items-center justify-between w-full text-[10px]">
              <span className="text-neutral-400 font-semibold">{pic.category}</span>
              <span className="text-emerald-400 font-bold">{pic.stat}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">

        {/* 1. Modern Creator Showcase Hero with Silk GPU 3D Parallax */}
        <section className="perspective-hero relative w-full min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between overflow-hidden bg-neutral-950/80 border-b border-white/[0.08] preserve-3d">

          {/* Full-bleed Immersive Creator Visual Background with Subtle Parallax */}
          <div
            className="absolute inset-0 z-0 overflow-hidden will-change-transform"
            style={{
              transform: `scale(1.06) translate3d(calc(var(--norm-x, 0) * -10px), calc(var(--norm-y, 0) * -8px), 0)`
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=2000&q=80"
              alt="Creator Scene"
              className="w-full h-full object-cover object-center opacity-70 filter brightness-[0.75] contrast-[1.08] animate-hero-kenburns"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] via-black/20 to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
          </div>

          {/* Dynamic GPU Hero Glow */}
          <div
            className="absolute pointer-events-none z-0 rounded-full blur-[120px] opacity-35 will-change-transform"
            style={{
              width: '450px',
              height: '450px',
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(244, 63, 94, 0.15) 50%, transparent 70%)',
              transform: `translate3d(calc(var(--mouse-x, -500px) - 225px), calc(var(--mouse-y, -500px) - 225px), 0)`
            }}
          />

          {/* Hero Top Content Area: Platform Headline & Trust Badges */}
          <div className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/10 text-xs font-semibold text-neutral-200 shadow-xl patreon-float cursor-default">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Direct Support for Modern Creators</span>
              <span className="text-white/20">•</span>
              <span className="text-amber-300 font-bold">0% Platform Fee</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
              Fund Your Passion, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-300 via-rose-400 to-orange-400 bg-clip-text text-transparent">
                One Chai At A Time.
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Connect directly with your audience. Receive 100% direct payouts straight to your bank account with zero platform commission.
            </p>
          </div>

          {/* Center Floating Organic Cutout Array with Silky GPU 3D Float */}
          <div className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto flex items-center justify-center py-8 sm:py-14">
            <div className="relative group preserve-3d">

              {/* Primary Centerpiece: Digital Visual Artist Cutout */}
              <div
                style={{
                  transform: `translate3d(calc(var(--norm-x, 0) * 18px), calc(var(--norm-y, 0) * 18px), 25px) rotateY(calc(var(--norm-x, 0) * 10deg)) rotateX(calc(var(--norm-y, 0) * -10deg))`,
                }}
                className="patreon-float-1 relative cursor-pointer will-change-transform z-20 group/center preserve-3d"
              >
                {/* Masked Organic Image */}
                <div className="patreon-organic-shape-1 w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 overflow-hidden border-2 border-white/60 shadow-2xl backdrop-blur-md relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                    alt="Creator Spotlight"
                    className="w-full h-full object-cover object-center group-hover/center:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-950/40 via-transparent to-transparent opacity-60" />
                </div>
                {/* Badge outside overflow-hidden so NEVER clipped */}
                <div
                  style={{ transform: 'translateZ(38px)' }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/90 backdrop-blur-xl border border-white/30 text-xs font-bold text-white shadow-2xl whitespace-nowrap z-40 transition-all duration-300 group-hover/center:scale-105 group-hover/center:border-rose-400 pointer-events-none"
                >
                  🎨 Visual Artist • Direct Chai
                </div>
              </div>

              {/* Satellite 1: Indie Software Developer (Top-Left) */}
              <div
                style={{
                  transform: `translate3d(calc(var(--norm-x, 0) * -24px), calc(var(--norm-y, 0) * -24px), 35px) rotateY(calc(var(--norm-x, 0) * -12deg)) rotateX(calc(var(--norm-y, 0) * 12deg))`,
                }}
                className="hidden md:block absolute -top-8 -left-16 sm:-top-10 sm:-left-20 md:-top-10 md:-left-24 patreon-float-3 cursor-pointer will-change-transform z-30 group/indie preserve-3d"
              >
                {/* Masked Organic Image */}
                <div className="patreon-organic-shape-3 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 overflow-hidden border-2 border-white/50 shadow-2xl relative">
                  <img
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500&q=80"
                    alt="Indie Developer"
                    className="w-full h-full object-cover group-hover/indie:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-950/60 to-transparent" />
                </div>
                {/* Badge outside overflow-hidden */}
                <div
                  style={{ transform: 'translateZ(32px)' }}
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/90 backdrop-blur-xl border border-rose-400/50 text-[10px] font-bold text-rose-300 shadow-2xl whitespace-nowrap z-40 transition-all duration-300 group-hover/indie:scale-105 pointer-events-none"
                >
                  💻 Indie Builder
                </div>
              </div>

              {/* Satellite 2: Podcaster / Audio Creator (Top-Right) */}
              <div
                style={{
                  transform: `translate3d(calc(var(--norm-x, 0) * 24px), calc(var(--norm-y, 0) * -20px), 30px) rotateY(calc(var(--norm-x, 0) * 12deg)) rotateX(calc(var(--norm-y, 0) * -12deg))`,
                }}
                className="hidden lg:block absolute top-2 -right-16 sm:top-4 sm:-right-24 md:top-2 md:-right-28 patreon-float-4 cursor-pointer will-change-transform z-30 group/audio preserve-3d"
              >
                {/* Masked Organic Image */}
                <div className="patreon-organic-shape-4 w-26 h-26 sm:w-30 sm:h-30 md:w-32 md:h-32 overflow-hidden border-2 border-white/50 shadow-2xl relative">
                  <img
                    src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=500&q=80"
                    alt="Audio Creator"
                    className="w-full h-full object-cover group-hover/audio:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 to-transparent" />
                </div>
                {/* Badge outside overflow-hidden */}
                <div
                  style={{ transform: 'translateZ(32px)' }}
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/90 backdrop-blur-xl border border-emerald-400/50 text-[10px] font-bold text-emerald-300 shadow-2xl whitespace-nowrap z-40 transition-all duration-300 group-hover/audio:scale-105 pointer-events-none"
                >
                  🎙️ Audio Creator
                </div>
              </div>

              {/* Satellite 3: Authentic Chai Pouring / Brewing (Bottom-Right) */}
              <div
                style={{
                  transform: `translate3d(calc(var(--norm-x, 0) * 28px), calc(var(--norm-y, 0) * 28px), 40px) rotateY(calc(var(--norm-x, 0) * 14deg)) rotateX(calc(var(--norm-y, 0) * -14deg))`,
                }}
                className="hidden sm:block absolute -bottom-8 -right-12 sm:-bottom-10 sm:-right-16 md:-bottom-10 md:-right-20 patreon-float-2 cursor-pointer will-change-transform z-30 group/chai preserve-3d"
              >
                {/* Masked Organic Image */}
                <div className="patreon-organic-shape-2 w-28 h-28 sm:w-34 sm:h-34 md:w-36 md:h-36 overflow-hidden border-2 border-white/50 shadow-2xl relative">
                  <img
                    src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=500&q=80"
                    alt="Fresh Chai Pour"
                    className="w-full h-full object-cover group-hover/chai:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-950/60 to-transparent" />
                </div>
                {/* Badge outside overflow-hidden */}
                <div
                  style={{ transform: 'translateZ(32px)' }}
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/90 backdrop-blur-xl border border-amber-400/50 text-[10px] font-bold text-amber-300 shadow-2xl whitespace-nowrap z-40 transition-all duration-300 group-hover/chai:scale-105 pointer-events-none"
                >
                  ☕ Chai Ritual
                </div>
              </div>

            </div>
          </div>

          {/* Hero Bottom Bar: CTAs + Live Highlights + Down Arrow */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">

              {/* Down Arrow Indicator */}
              <div className="flex items-center gap-3">
                <a
                  href="#content"
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-base transition-all hover:scale-110 active:scale-95 shadow-lg group cursor-pointer"
                  aria-label="Scroll Down"
                >
                  <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
                </a>
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-300 hidden sm:inline">
                  Explore Platform
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
                <Link href="/login" className="w-full sm:w-auto">
                  <button
                    type="button"
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all shadow-xl hover:shadow-rose-500/20 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Start My Page</span>
                    <span className="text-neutral-500">→</span>
                  </button>
                </Link>
                <Link href="/creators" className="w-full sm:w-auto">
                  <button
                    type="button"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white font-semibold text-sm transition-all hover:scale-105 active:scale-95 backdrop-blur-md cursor-pointer"
                  >
                    Browse Creators
                  </button>
                </Link>
              </div>

              {/* Floating Interactive Creator Spotlight Card */}
              <Link
                href="/login"
                style={{
                  transform: `translate3d(calc(var(--norm-x, 0) * -8px), calc(var(--norm-y, 0) * -6px), 15px)`
                }}
                className="patreon-glass p-3 sm:p-3.5 rounded-2xl flex items-center gap-3 max-w-xs hover:border-rose-500/50 hover:scale-105 transition-all duration-300 shadow-2xl group cursor-pointer will-change-transform"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
                    alt="Creator"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-white leading-snug line-clamp-2">
                    Empowering creators to build community & get funded directly with chai →
                  </p>
                </div>
              </Link>

            </div>
          </div>
        </section>

        {/* 2. Animated Real Platform Capabilities Marquee */}
        <section className="py-5 bg-black/50 border-b border-white/[0.06] overflow-hidden">
          <div className="animate-marquee-features gap-6 items-center">
            {[...platformCapabilities, ...platformCapabilities].map((cap, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-rose-500/40 transition-all duration-300 shrink-0 cursor-default patreon-card-hover"
              >
                <span className="text-base">{cap.icon}</span>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-white">{cap.title}</span>
                  <span className="text-[10px] text-neutral-400">{cap.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Hero Headline & Quick CTA Area */}
        <section id="content" className="relative pt-16 sm:pt-24 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-7">
          <div className="space-y-3">
            <p className="text-xs uppercase font-bold tracking-widest text-rose-500">
              A New Way for Supporters & Creators
            </p>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Where Creator Communities & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                Chai Meet.
              </span>
            </h2>
          </div>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Give your fans and followers a simple, heartfelt way to buy you a cup of chai, fund your creative projects, and say thank you directly.
          </p>

          {/* CTAs with Glow Effect & 3D Chai Token */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link href="/login" className="w-full sm:w-auto">
              <button
                type="button"
                onMouseMove={(e) => handleCardTilt(e, 8, 1.04)}
                onMouseLeave={handleCardTiltReset}
                className="btn-3d-interactive w-full sm:w-auto text-black bg-white hover:bg-neutral-200 font-bold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all shadow-xl hover:shadow-rose-500/25 cursor-pointer flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                <span>Start My Page</span>
                <span className="text-neutral-500 font-normal group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Link>

            <Link href="/about" className="w-full sm:w-auto">
              <button
                type="button"
                onMouseMove={(e) => handleCardTilt(e, 8, 1.04)}
                onMouseLeave={handleCardTiltReset}
                className="btn-3d-interactive w-full sm:w-auto text-neutral-200 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full transition-all backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
              >
                How It Works
              </button>
            </Link>

            {/* Floating 3D Chai Token Pill */}
            <div className="hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-amber-400/30 backdrop-blur-md shadow-lg ml-2">
              <div className="w-8 h-8 relative perspective-800 animate-coin-float">
                <div className="w-full h-full relative preserve-3d animate-coin-spin-3d">
                  <div className="coin-face-front flex items-center justify-center border border-amber-300/80 shadow-sm">
                    <span className="text-xs select-none">☕</span>
                  </div>
                  <div className="coin-face-back flex items-center justify-center border border-amber-300/80 shadow-sm text-amber-950 font-black text-[9px]">
                    0%
                  </div>
                  <div className="coin-edge" />
                </div>
              </div>
              <div className="text-left leading-tight">
                <span className="text-[11px] font-bold text-amber-300 block">Direct UPI</span>
                <span className="text-[9px] text-neutral-400 block">Zero Deductions</span>
              </div>
            </div>
          </div>

          {/* Patreon Interactive Category Pills */}
          <div className="pt-6">
            <p className="text-xs uppercase font-bold tracking-widest text-neutral-500 mb-3">
              Explore Creator Categories
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
              {creatorCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className="patreon-interactive-tag flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-rose-500/50 shadow-sm"
                >
                  <span className="text-xs font-semibold text-neutral-200">{cat.label}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 font-bold">
                    {cat.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Interactive Live Animated Chai Pouring / Cup Fill Simulator */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="patreon-glass rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden space-y-7">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">Interactive Chai Simulator</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">Tap To Pour A Virtual Chai</h3>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Real-Time Calculation</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

              {/* Realistic 3D Ceramic Chai Mug & Saucer Graphic with 3D Depth */}
              <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-b from-[#1c1c24] to-[#121216] border border-white/[0.08] relative space-y-6 simulator-3d-stage overflow-hidden">

                {/* Floating 3D Chai Token in Simulator corner */}
                <div className="absolute top-4 right-4 z-30">
                  <div className="w-10 h-10 relative perspective-800 animate-coin-float">
                    <div className="w-full h-full relative preserve-3d animate-coin-spin-3d">
                      <div className="coin-face-front flex items-center justify-center border border-amber-300/80 shadow-md">
                        <span className="text-base select-none">☕</span>
                      </div>
                      <div className="coin-face-back flex flex-col items-center justify-center border border-amber-300/80 shadow-md text-amber-950 font-black text-[9px]">
                        <span>₹10</span>
                      </div>
                      <div className="coin-edge" />
                    </div>
                  </div>
                </div>

                {/* 3D Cup Assembly with Dynamic Parallax Depth */}
                <div
                  style={{
                    transform: `perspective(900px) rotateX(calc(10deg + var(--norm-y, 0) * -10deg)) rotateY(calc(var(--norm-x, 0) * 14deg))`,
                  }}
                  className="mug-3d-assembly relative flex flex-col items-center pt-8 cursor-pointer group"
                >

                  {/* Multi-Particle Steam Sway Array in 3D Z-plane */}
                  <div
                    style={{ transform: 'translateZ(35px)' }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none z-30"
                  >
                    <span className="patreon-steam-particle w-1.5 h-8 bg-gradient-to-t from-orange-400/60 to-transparent rounded-full blur-[0.5px]" />
                    <span className="patreon-steam-particle w-2 h-11 bg-gradient-to-t from-rose-400/70 to-transparent rounded-full blur-[0.5px] [animation-delay:0.35s]" />
                    <span className="patreon-steam-particle w-1.5 h-7 bg-gradient-to-t from-amber-300/60 to-transparent rounded-full blur-[0.5px] [animation-delay:0.7s]" />
                  </div>

                  {/* Mug Body Container */}
                  <div className="relative flex items-center preserve-3d">

                    {/* Ceramic Mug with 3D Highlight & Shadow */}
                    <div
                      style={{ transform: 'translateZ(10px)' }}
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-b-[2rem] rounded-t-lg bg-gradient-to-b from-[#2e2e3a] via-[#1e1e26] to-[#14141c] border-2 border-white/30 relative shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden z-10 transition-transform duration-300 group-hover:scale-105"
                    >

                      {/* Glossy Ceramic Highlight Reflection */}
                      <div className="absolute top-0 left-2 w-2 h-full bg-gradient-to-b from-white/25 via-white/10 to-transparent rounded-full blur-[0.5px] pointer-events-none z-20" />

                      {/* Liquid Fill Level with Foam Surface */}
                      <div
                        className="absolute bottom-0 left-0 right-0 w-full bg-gradient-to-t from-amber-900 via-orange-600 to-amber-500 rounded-b-[1.85rem] transition-all duration-500 ease-out flex items-center justify-center text-xs font-black text-white shadow-inner z-10"
                        style={{ height: `${Math.min(brewingChai * 9.2, 90)}%` }}
                      >
                        {/* Foam Surface Highlight */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-300/50 via-orange-200/80 to-amber-300/50 animate-pulse shadow-sm" />

                        <span className="drop-shadow-md text-sm font-black flex items-center gap-1">
                          <span>☕</span>
                          <span>{brewingChai}</span>
                        </span>
                      </div>
                    </div>

                    {/* Ceramic Cup Handle with 3D Depth */}
                    <div
                      style={{ transform: 'translateZ(16px) rotateY(15deg)' }}
                      className="absolute -right-3.5 top-5 w-6 h-16 border-4 border-white/30 rounded-r-2xl bg-neutral-900/40 shadow-lg pointer-events-none z-0"
                    />

                  </div>

                  {/* Ceramic Saucer Base in Back Z-plane */}
                  <div
                    style={{ transform: 'translateZ(-14px) scale(1.08)' }}
                    className="w-36 sm:w-40 h-3 rounded-full bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 border border-white/20 shadow-2xl -mt-1 z-0"
                  />

                </div>

                {/* Real-time Math Summary */}
                <div className="text-center space-y-0.5">
                  <p className="text-xs font-bold text-white tracking-wide">{brewingChai} Cup{brewingChai > 1 ? 's' : ''} of Fresh Chai Selected</p>
                  <p className="text-xl font-black bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
                    Total: ₹{brewingChai * 10}
                  </p>
                </div>
              </div>

              {/* Chai Brewing Preset Controls */}
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Choose Cups to Send to Creator:
                </label>

                <div className="grid grid-cols-2 gap-2.5">
                  {[1, 2, 5, 10].map((cup) => (
                    <button
                      key={cup}
                      type="button"
                      onClick={() => setBrewingChai(cup)}
                      onMouseMove={(e) => handleCardTilt(e, 8, 1.05)}
                      onMouseLeave={handleCardTiltReset}
                      className={`btn-3d-interactive py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold border transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-between ${brewingChai === cup
                        ? "bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/30 scale-105 animate-cup-bounce"
                        : "bg-white/[0.04] border-white/[0.08] text-neutral-300 hover:bg-white/[0.08]"
                        }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="text-base">☕</span>
                        <span>{cup} Chai</span>
                      </span>
                      <span className="text-[11px] opacity-80 font-bold">₹{cup * 10}</span>
                    </button>
                  ))}
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-neutral-400 leading-relaxed">
                  💡 In GetMeAChai, every cup sent goes directly to the creator&apos;s Razorpay account with zero platform middleman cuts.
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 5. Interactive Creator Revenue Calculator Widget */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="patreon-glass rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden space-y-7">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">Earnings Estimator</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">How Much Can You Earn On GetMeAChai?</h3>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold">
                <span>0% Platform Commission</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

              {/* Slider & Tier Selectors */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-neutral-300">
                    <span>Number of Supporters:</span>
                    <span className="text-rose-400 font-black text-sm">{supporterCount} Backers</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={supporterCount}
                    onChange={(e) => setSupporterCount(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500">
                    <span>10</span>
                    <span>500</span>
                    <span>1,000+</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-300">
                    Average Chai Price:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[10, 20, 50].map((price) => (
                      <button
                        key={price}
                        type="button"
                        onClick={() => setChaiPrice(price)}
                        className={`py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${chaiPrice === price
                          ? "bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/30 scale-105"
                          : "bg-white/[0.04] border-white/[0.08] text-neutral-300 hover:bg-white/[0.08]"
                          }`}
                      >
                        ☕ ₹{price} / Chai
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Real-time Dynamic Earnings Box with 3D Depth */}
              <div
                onMouseMove={handleCardTilt}
                onMouseLeave={handleCardTiltReset}
                className="p-6 rounded-3xl bg-gradient-to-br from-[#1c1c24] to-[#121216] border border-white/[0.14] shadow-2xl text-center space-y-3 card-3d-interactive relative overflow-hidden group cursor-default"
              >
                {/* Floating Mini 3D Coin Badge inside Revenue Card */}
                <div className="absolute top-3 right-3 pointer-events-none z-20">
                  <div className="w-8 h-8 relative perspective-800 animate-coin-float">
                    <div className="w-full h-full relative preserve-3d animate-coin-spin-3d">
                      <div className="coin-face-front flex items-center justify-center border border-amber-300/80 shadow-sm">
                        <span className="text-xs select-none">₹</span>
                      </div>
                      <div className="coin-face-back flex items-center justify-center border border-amber-300/80 shadow-sm text-amber-950 font-black text-[9px]">
                        ☕
                      </div>
                      <div className="coin-edge" />
                    </div>
                  </div>
                </div>

                <p className="card-3d-pop text-xs uppercase font-bold tracking-wider text-neutral-400">
                  Estimated Monthly Revenue
                </p>
                <div className="card-3d-pop-deep text-4xl sm:text-5xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent py-1 drop-shadow-lg">
                  ₹{estimatedEarnings.toLocaleString('en-IN')}
                </div>
                <p className="card-3d-pop text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
                  Deposited 100% directly to your bank account via your linked Razorpay keys.
                </p>
                <div className="pt-2 card-3d-pop">
                  <Link href="/login">
                    <button
                      type="button"
                      className="w-full py-2.5 px-4 rounded-full bg-white text-black hover:bg-neutral-200 font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      Start Receiving Payouts →
                    </button>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 6. Interactive Platform Comparison Matrix with Animated Tabs */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="patreon-glass rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">Why GetMeAChai?</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">Compare The Difference</h3>
            </div>

            <div className="flex justify-center">
              <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setComparisonTab("getmeachai")}
                  className={`py-2 px-5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${comparisonTab === "getmeachai"
                    ? "bg-rose-500 text-white shadow-lg"
                    : "text-neutral-400 hover:text-white"
                    }`}
                >
                  ☕ GetMeAChai (Direct)
                </button>
                <button
                  type="button"
                  onClick={() => setComparisonTab("others")}
                  className={`py-2 px-5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${comparisonTab === "others"
                    ? "bg-neutral-800 text-white shadow-lg"
                    : "text-neutral-400 hover:text-white"
                    }`}
                >
                  🏢 Traditional Gateways
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {comparisonTab === "getmeachai" ? (
                <>
                  <div
                    onMouseMove={(e) => handleCardTilt(e, 8, 1.02)}
                    onMouseLeave={handleCardTiltReset}
                    className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2 card-3d-interactive cursor-default animate-fadeIn"
                  >
                    <span className="text-xl card-3d-pop">✅</span>
                    <h4 className="font-bold text-sm text-white card-3d-pop">0% Platform Cut</h4>
                    <p className="text-xs text-neutral-300 card-3d-pop">Keep 100% of the money sent by your supporters.</p>
                  </div>
                  <div
                    onMouseMove={(e) => handleCardTilt(e, 8, 1.02)}
                    onMouseLeave={handleCardTiltReset}
                    className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2 card-3d-interactive cursor-default animate-fadeIn"
                  >
                    <span className="text-xl card-3d-pop">⚡</span>
                    <h4 className="font-bold text-sm text-white card-3d-pop">Direct Razorpay Settlement</h4>
                    <p className="text-xs text-neutral-300 card-3d-pop">Money flows directly to your linked bank account.</p>
                  </div>
                  <div
                    onMouseMove={(e) => handleCardTilt(e, 8, 1.02)}
                    onMouseLeave={handleCardTiltReset}
                    className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2 card-3d-interactive cursor-default animate-fadeIn"
                  >
                    <span className="text-xl card-3d-pop">🔒</span>
                    <h4 className="font-bold text-sm text-white card-3d-pop">Full Fan Ownership</h4>
                    <p className="text-xs text-neutral-300 card-3d-pop">Your supporters connect with you directly with custom notes.</p>
                  </div>
                </>
              ) : (
                <>
                  <div
                    onMouseMove={(e) => handleCardTilt(e, 8, 1.02)}
                    onMouseLeave={handleCardTiltReset}
                    className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-2 card-3d-interactive cursor-default animate-fadeIn"
                  >
                    <span className="text-xl card-3d-pop">❌</span>
                    <h4 className="font-bold text-sm text-white card-3d-pop">10% - 30% Platform Cut</h4>
                    <p className="text-xs text-neutral-400 card-3d-pop">High fees taken from every donation and subscription.</p>
                  </div>
                  <div
                    onMouseMove={(e) => handleCardTilt(e, 8, 1.02)}
                    onMouseLeave={handleCardTiltReset}
                    className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-2 card-3d-interactive cursor-default animate-fadeIn"
                  >
                    <span className="text-xl card-3d-pop">⏳</span>
                    <h4 className="font-bold text-sm text-white card-3d-pop">30-Day Payout Holds</h4>
                    <p className="text-xs text-neutral-400 card-3d-pop">Complex payout schedules and minimum withdrawal limits.</p>
                  </div>
                  <div
                    onMouseMove={(e) => handleCardTilt(e, 8, 1.02)}
                    onMouseLeave={handleCardTiltReset}
                    className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-2 card-3d-interactive cursor-default animate-fadeIn"
                  >
                    <span className="text-xl card-3d-pop">🔒</span>
                    <h4 className="font-bold text-sm text-white card-3d-pop">Locked Ecosystems</h4>
                    <p className="text-xs text-neutral-400 card-3d-pop">Fans must create complex recurring memberships to support you.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* 7. Feature Value Grid with Patreon Card Hover */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <p className="text-xs uppercase font-bold tracking-widest text-rose-400">Made for Every Creator</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Everything you need to get funded
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              A frictionless platform where your community can back your vision with direct payments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1 */}
            <div
              onMouseMove={handleCardTilt}
              onMouseLeave={handleCardTiltReset}
              className="patreon-glass card-3d-interactive rounded-3xl p-8 flex flex-col items-start text-left space-y-4 group cursor-default border border-white/10 hover:border-rose-500/40 shadow-xl"
            >
              <div className="card-3d-pop-deep w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                <img src="/coin.gif" alt="Direct Payments" className="w-full h-full object-contain" />
              </div>
              <h3 className="card-3d-pop text-xl font-bold text-white group-hover:text-rose-400 transition-colors">
                Instant Direct Payouts
              </h3>
              <p className="card-3d-pop text-sm text-neutral-400 leading-relaxed">
                Payments processed directly to your own Razorpay account. No hidden platform delays or complex payout schedules.
              </p>
            </div>

            {/* Card 2 */}
            <div
              onMouseMove={handleCardTilt}
              onMouseLeave={handleCardTiltReset}
              className="patreon-glass card-3d-interactive rounded-3xl p-8 flex flex-col items-start text-left space-y-4 group cursor-default border border-white/10 hover:border-orange-500/40 shadow-xl"
            >
              <div className="card-3d-pop-deep w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                <img src="/group.gif" alt="Community Support" className="w-full h-full object-contain" />
              </div>
              <h3 className="card-3d-pop text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                Supporter Recognition
              </h3>
              <p className="card-3d-pop text-sm text-neutral-400 leading-relaxed">
                Fans can leave encouraging notes with their donations, displayed in real-time on your live public supporters wall.
              </p>
            </div>

            {/* Card 3 */}
            <div
              onMouseMove={handleCardTilt}
              onMouseLeave={handleCardTiltReset}
              className="patreon-glass card-3d-interactive rounded-3xl p-8 flex flex-col items-start text-left space-y-4 group cursor-default border border-white/10 hover:border-amber-500/40 shadow-xl"
            >
              <div className="card-3d-pop-deep w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                <img src="/man.gif" alt="Custom Page" className="w-full h-full object-contain" />
              </div>
              <h3 className="card-3d-pop text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                Custom Creator Hub
              </h3>
              <p className="card-3d-pop text-sm text-neutral-400 leading-relaxed">
                Personalize your public profile with custom banners, avatars, bios, and shareable short links for your audience.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Interactive Animated 3-Step Walkthrough with Step Highlights & 3D Tilt */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <p className="text-xs uppercase font-bold tracking-widest text-orange-400">Simple & Transparent</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How It Works in 3 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveStep(idx)}
                onMouseMove={handleCardTilt}
                onMouseLeave={handleCardTiltReset}
                className={`patreon-glass card-3d-interactive rounded-3xl p-7 space-y-4 transition-all duration-300 cursor-pointer ${activeStep === idx
                  ? "border-rose-500/60 shadow-2xl bg-white/[0.07]"
                  : "border-white/10 hover:border-white/20"
                  }`}
              >
                <div className="flex items-center justify-between card-3d-pop-deep">
                  <span className={`step-badge-3d inline-flex w-11 h-11 rounded-2xl font-black text-sm items-center justify-center border transition-all ${activeStep === idx
                    ? "bg-rose-500 text-white border-rose-400"
                    : "bg-rose-500/15 text-rose-400 border-rose-500/30"
                    }`}>
                    {step.num}
                  </span>
                  <span className="text-2xl transform transition-transform group-hover:scale-110">{step.icon}</span>
                </div>
                <h3 className="card-3d-pop text-lg font-bold text-white">{step.title}</h3>
                <p className="card-3d-pop text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Interactive Animated FAQ Accordion */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/[0.06] space-y-8">
          <div className="text-center space-y-2">
            <p className="text-xs uppercase font-bold tracking-widest text-rose-400">Got Questions?</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                onMouseMove={(e) => handleCardTilt(e, 4, 1.01)}
                onMouseLeave={handleCardTiltReset}
                className="patreon-glass card-3d-interactive rounded-2xl border border-white/[0.08] hover:border-white/20 overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-rose-400 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className={`text-lg text-rose-400 transition-transform duration-300 shrink-0 ${activeFaq === index ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>

                {activeFaq === index && (
                  <div className="px-6 pb-4 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-white/[0.04] pt-3 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 10. Ultra-Rich Interactive Platform Walkthrough Spotlight Player */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-white/[0.06] text-center space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-bold shadow-lg">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>Interactive Product Demonstration</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              See GetMeAChai in Action
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
              Experience how seamless it is for creators to receive direct support from their community.
            </p>
          </div>

          {/* Cinematic Video Player Frame (Rock-solid, steady frame) */}
          <div
            data-no-tilt="true"
            className="w-full max-w-4xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-gradient-to-b from-[#16161e] via-[#0d0d12] to-[#08080c] relative text-left flex flex-col transition-all duration-300"
          >

            {/* Dynamic Ambient Background Glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 blur-[90px] sm:blur-[110px] rounded-full pointer-events-none transition-all duration-700"
              style={{ backgroundColor: videoScenes[activeVideoScene].glowColor }}
            />

            {/* Browser / Video Player Header */}
            <div className="px-3.5 sm:px-5 py-2.5 sm:py-3 bg-black/70 backdrop-blur-xl border-b border-white/10 flex items-center justify-between z-10 gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                {/* Traffic Light Buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56] border border-black/20" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e] border border-black/20" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f] border border-black/20" />
                </div>

                {/* Title & Live Badge */}
                <div className="flex items-center gap-1.5 sm:gap-2 ml-1 min-w-0">
                  <span className="text-[11px] sm:text-xs font-bold text-white whitespace-nowrap">GetMeAChai Tour</span>
                  <span className="text-[10px] text-neutral-400 hidden sm:inline">•</span>
                  <span className="text-[10px] sm:text-[11px] text-neutral-400 truncate max-w-[130px] sm:max-w-none">{videoScenes[activeVideoScene].title}</span>
                </div>
              </div>

              {/* Right Badges & Audio Waveform Visualizer */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                {/* Animated Waveform Equalizer */}
                <div className="hidden sm:flex items-center gap-0.5 h-3">
                  <span className={`w-0.5 bg-rose-400 rounded-full transition-all duration-200 ${videoPlaying ? 'h-3 animate-pulse' : 'h-1'}`} />
                  <span className={`w-0.5 bg-rose-400 rounded-full transition-all duration-200 ${videoPlaying ? 'h-2 animate-ping' : 'h-1'}`} />
                  <span className={`w-0.5 bg-rose-400 rounded-full transition-all duration-200 ${videoPlaying ? 'h-3.5 animate-pulse' : 'h-1'}`} />
                  <span className={`w-0.5 bg-rose-400 rounded-full transition-all duration-200 ${videoPlaying ? 'h-1.5 animate-ping' : 'h-1'}`} />
                </div>

                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase px-2 sm:px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 whitespace-nowrap">
                  {videoScenes[activeVideoScene].badge}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-neutral-400 bg-white/5 px-1.5 sm:px-2 py-0.5 rounded-md border border-white/10 hidden sm:inline">
                  HD 60FPS
                </span>
              </div>
            </div>

            {/* Video Stage Screen Content Area */}
            <div className="relative min-h-[300px] sm:min-h-[360px] p-3.5 sm:p-6 md:p-8 flex items-center justify-center overflow-hidden z-10">

              {/* SCENE 0: Creator Page & Key Setup */}
              {activeVideoScene === 0 && (
                <div className="w-full max-w-lg space-y-3 sm:space-y-4 animate-fadeIn">
                  <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-neutral-900/90 border border-white/15 shadow-2xl space-y-3 sm:space-y-4 backdrop-blur-xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-rose-500 to-orange-400 flex items-center justify-center font-black text-white text-base sm:text-lg shadow-lg shrink-0">
                          ☕
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-1.5 truncate">
                            <span className="truncate">getmeachai.com/developer_chai</span>
                            <span className="text-emerald-400 text-xs shrink-0">✓</span>
                          </h4>
                          <p className="text-[10px] sm:text-xs text-neutral-400 truncate">Open Source Builder & Content Creator</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 sm:p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-[11px] sm:text-xs">
                        <span className="text-neutral-400">Razorpay API Status:</span>
                        <span className="font-bold text-emerald-400 flex items-center gap-1.5 whitespace-nowrap">
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-ping" />
                          <span>Connected (Direct Payouts)</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] sm:text-xs">
                        <span className="text-neutral-400">Platform Commission:</span>
                        <span className="font-bold text-emerald-400">0.00% Always</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                      <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/25">
                        ✓ Instant UPI Ready
                      </span>
                      <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/5 text-neutral-300 font-semibold border border-white/10">
                        ⚡ 0-Day Holding Period
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* SCENE 1: Supporter Chai Selection & Checkout */}
              {activeVideoScene === 1 && (
                <div className="w-full max-w-lg space-y-3 sm:space-y-4 animate-fadeIn">
                  <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-neutral-900/90 border border-white/15 shadow-2xl space-y-3 sm:space-y-4 backdrop-blur-xl">
                    <div className="flex flex-wrap gap-1 justify-between items-center text-[11px] sm:text-xs font-bold border-b border-white/10 pb-3">
                      <span className="text-neutral-300">Choose Chai for @developer_chai:</span>
                      <span className="text-rose-400 font-black text-xs sm:text-sm bg-rose-500/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-rose-500/20">
                        ₹50 (5 Chai)
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      <div className="py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-white/[0.04] border border-white/10 text-center text-[11px] sm:text-xs font-bold text-neutral-400">
                        ☕ 1 (₹10)
                      </div>
                      <div className="py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-white/[0.04] border border-white/10 text-center text-[11px] sm:text-xs font-bold text-neutral-400">
                        ☕ 2 (₹20)
                      </div>
                      <div className="py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 border border-rose-400 text-center text-[11px] sm:text-xs font-black text-white shadow-lg shadow-rose-500/30 scale-105 animate-cup-bounce">
                        ☕ 5 (₹50) ★
                      </div>
                    </div>

                    <div className="p-2.5 sm:p-3.5 rounded-xl bg-black/50 border border-white/10 text-[11px] sm:text-xs text-neutral-300 italic flex items-center gap-2">
                      <span className="text-sm sm:text-base shrink-0">💬</span>
                      <span className="line-clamp-2 sm:line-clamp-none">&ldquo;Your open source tutorials helped me crack my interview! Have a chai! 🚀&rdquo;</span>
                    </div>

                    <div className="py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white font-extrabold text-[11px] sm:text-xs flex items-center justify-center gap-2 shadow-xl animate-pulse">
                      <span>⚡ Instant UPI / Card Checkout</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SCENE 2: Direct Razorpay Settlement */}
              {activeVideoScene === 2 && (
                <div className="w-full max-w-lg space-y-3 sm:space-y-4 animate-fadeIn">
                  <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-b from-emerald-950/60 to-neutral-900 border border-emerald-500/35 shadow-2xl space-y-3 sm:space-y-4 text-center backdrop-blur-xl">
                    <div className="w-11 h-11 sm:w-14 sm:h-14 mx-auto rounded-xl sm:rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xl sm:text-2xl shadow-lg shadow-emerald-500/20 animate-bounce">
                      ✅
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-lg font-black text-white">Payment Received Directly!</h4>
                      <p className="text-[11px] sm:text-xs text-emerald-400 font-bold mt-0.5">₹50.00 Transferred to Creator Bank Account</p>
                    </div>

                    <div className="p-3 sm:p-4 rounded-xl bg-black/60 border border-white/10 grid grid-cols-2 gap-2 sm:gap-3 text-[11px] sm:text-xs">
                      <div className="text-left">
                        <p className="text-neutral-500 text-[9px] sm:text-[10px] uppercase font-bold">Platform Fee (0%)</p>
                        <p className="font-black text-emerald-400 text-xs sm:text-sm">₹0.00 Deducted</p>
                      </div>
                      <div className="text-left border-l border-white/10 pl-2 sm:pl-3">
                        <p className="text-neutral-500 text-[9px] sm:text-[10px] uppercase font-bold">Bank Payout</p>
                        <p className="font-black text-white text-xs sm:text-sm">100% Retained</p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-bold text-emerald-300 bg-emerald-500/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-emerald-500/20 max-w-full">
                      <span className="truncate">⚡ Razorpay Settlement ID: pay_OK98234</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SCENE 3: Live Supporter Recognition Wall */}
              {activeVideoScene === 3 && (
                <div className="w-full max-w-lg space-y-3 sm:space-y-4 animate-fadeIn">
                  <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-neutral-900/90 border border-white/15 shadow-2xl space-y-3 sm:space-y-3.5 backdrop-blur-xl">
                    <div className="flex items-center justify-between text-[11px] sm:text-xs border-b border-white/10 pb-2.5 gap-2">
                      <span className="font-extrabold text-white flex items-center gap-1.5 truncate">
                        <span className="text-amber-400 text-sm sm:text-base shrink-0">🏆</span>
                        <span className="truncate">Live Supporter Wall</span>
                      </span>
                      <span className="text-emerald-400 font-extrabold text-[9px] sm:text-[10px] bg-emerald-500/10 px-1.5 sm:px-2 py-0.5 rounded-md border border-emerald-500/20 animate-pulse whitespace-nowrap shrink-0">
                        ● LIVE
                      </span>
                    </div>

                    <div className="p-2.5 sm:p-3.5 rounded-xl bg-gradient-to-r from-rose-500/15 via-white/[0.04] to-transparent border border-rose-500/30 flex items-center justify-between shadow-lg gap-2">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gradient-to-tr from-rose-500 to-amber-400 text-white font-black flex items-center justify-center text-xs shadow-md shrink-0">
                          A
                        </div>
                        <div className="text-left min-w-0">
                          <p className="text-[11px] sm:text-xs font-bold text-white flex items-center gap-1 truncate">
                            <span className="truncate">Alex_Dev</span>
                            <span className="text-[9px] px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 font-bold shrink-0">Backer</span>
                          </p>
                          <p className="text-[10px] sm:text-[11px] text-neutral-300 italic truncate">&ldquo;Helped me crack my interview!&rdquo;</p>
                        </div>
                      </div>
                      <span className="text-[11px] sm:text-xs font-black text-rose-400 bg-rose-500/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-rose-500/20 shrink-0">
                        ₹50
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-400 px-1">
                      <span>⚡ Note on creator&apos;s wall</span>
                      <span className="text-neutral-500 font-semibold">Just now</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Video Player Controls Bottom Bar */}
            <div className="p-3 sm:p-5 bg-black/85 backdrop-blur-2xl border-t border-white/10 space-y-2.5 sm:space-y-3 z-10">

              {/* Timeline Progress Bar (Interactive scrubber) */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newPct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                  setVideoProgress(newPct);
                  const sceneIndex = Math.min(Math.floor((newPct / 100) * videoScenes.length), videoScenes.length - 1);
                  setActiveVideoScene(sceneIndex);
                }}
                className="relative w-full h-2 sm:h-2.5 bg-neutral-800/90 rounded-full overflow-hidden cursor-pointer group"
              >
                <div
                  className="h-full bg-gradient-to-r from-rose-500 via-orange-500 to-amber-400 rounded-full transition-all duration-150 relative"
                  style={{ width: `${videoProgress}%` }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform" />
                </div>
              </div>

              {/* Bottom Controls & Chapter Navigation */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 pt-1">

                {/* Play / Pause, Time & Speed Controls */}
                <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setVideoPlaying(!videoPlaying)}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                      title={videoPlaying ? "Pause Walkthrough" : "Play Walkthrough"}
                    >
                      {videoPlaying ? "⏸" : "▶"}
                    </button>

                    <div className="flex flex-col text-left">
                      <span className="text-[11px] sm:text-xs font-bold text-white whitespace-nowrap">
                        {videoPlaying ? "Tour Playing" : "Tour Paused"}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-neutral-400 whitespace-nowrap">
                        Scene {activeVideoScene + 1} of 4
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Speed Toggle */}
                    <div className="flex items-center gap-0.5 sm:gap-1 bg-white/5 p-0.5 sm:p-1 rounded-lg border border-white/10">
                      {[1, 1.5, 2].map((spd) => (
                        <button
                          key={spd}
                          type="button"
                          onClick={() => setPlaybackSpeed(spd)}
                          className={`px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold transition-all cursor-pointer ${playbackSpeed === spd
                            ? "bg-rose-500 text-white"
                            : "text-neutral-400 hover:text-white"
                            }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setVideoProgress(0);
                        setActiveVideoScene(0);
                        setVideoPlaying(true);
                      }}
                      className="text-[11px] sm:text-xs text-neutral-400 hover:text-white px-1.5 sm:px-2 py-1 rounded hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      ↺ Replay
                    </button>
                  </div>
                </div>

                {/* Chapter Pill Buttons */}
                <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
                  {videoScenes.map((scene) => (
                    <button
                      key={scene.id}
                      type="button"
                      onClick={() => handleSelectScene(scene.id)}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${activeVideoScene === scene.id
                        ? "bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105"
                        : "bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08]"
                        }`}
                    >
                      {scene.title.split('.')[1] || scene.title}
                    </button>
                  ))}
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* 11. Bottom CTA Banner */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-r from-rose-950/60 via-[#18181e] to-neutral-900 border border-white/[0.1] shadow-2xl text-center space-y-6">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-rose-500/20 blur-3xl rounded-full pointer-events-none" />
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
              Ready to start receiving support from your fans?
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 max-w-lg mx-auto">
              Join creators who turn their passion into a sustainable creative journey with direct community funding.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/login">
                <button
                  type="button"
                  className="w-full sm:w-auto text-black bg-white hover:bg-neutral-200 font-bold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Create Your Page Today
                </button>
              </Link>
              <Link href="/creators">
                <button
                  type="button"
                  className="w-full sm:w-auto text-white bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 font-bold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Explore Creators</span>
                  <span>✨</span>
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
