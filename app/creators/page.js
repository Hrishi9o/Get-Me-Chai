"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchCreators } from '@/actions/useractions'

export default function CreatorsPage() {
    const [creators, setCreators] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState("all")

    useEffect(() => {
        document.title = "Explore & Support Creators - GetMeAChai"
        const load = async () => {
            try {
                const data = await fetchCreators()
                setCreators(data || [])
            } catch (err) {
                console.error("Failed to load creators:", err)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    const filteredCreators = creators.filter((c) => {
        const query = searchQuery.toLowerCase().trim()
        const matchesName = (c.name || "").toLowerCase().includes(query)
        const matchesUsername = (c.username || "").toLowerCase().includes(query)
        const matchesSearch = matchesName || matchesUsername

        if (!matchesSearch) return false

        if (filter === "supported") {
            return (c.supporters || 0) > 0
        }
        return true
    })

    return (
        <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 transition-colors duration-300">
            {/* Ambient Background Glow */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-rose-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

            {/* Header Title & Tagline */}
            <div className="text-center space-y-4 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-black tracking-widest uppercase">
                    <span>✨ Discover Community Builders</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                    Explore <span className="bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300 bg-clip-text text-transparent">Creators</span>
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    Find your favorite developers, writers, designers, and thinkers. Support their independent work directly with a cup of chai.
                </p>
            </div>

            {/* Live Search & Filter Bar */}
            <div className="max-w-2xl mx-auto space-y-3">
                <div className="relative flex items-center">
                    <span className="absolute left-4 text-neutral-400 text-lg">🔍</span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by creator name or @username..."
                        className="w-full bg-[#121216] border border-white/[0.1] rounded-2xl pl-12 pr-10 py-3.5 text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-xl"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3.5 w-6 h-6 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-neutral-400 hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Filter Pills */}
                <div className="flex items-center justify-between px-1 text-xs">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setFilter("all")}
                            className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                                filter === "all"
                                    ? "bg-rose-500 text-white shadow-sm"
                                    : "bg-white/[0.04] text-neutral-400 hover:text-white"
                            }`}
                        >
                            All ({creators.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilter("supported")}
                            className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                                filter === "supported"
                                    ? "bg-rose-500 text-white shadow-sm"
                                    : "bg-white/[0.04] text-neutral-400 hover:text-white"
                            }`}
                        >
                            ☕ Top Supported
                        </button>
                    </div>

                    <span className="text-neutral-500 hidden sm:inline">
                        Showing {filteredCreators.length} {filteredCreators.length === 1 ? "creator" : "creators"}
                    </span>
                </div>
            </div>

            {/* Creators Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <div key={n} className="patreon-glass rounded-3xl p-6 border border-white/[0.06] animate-pulse space-y-4">
                            <div className="h-24 bg-white/[0.03] rounded-2xl" />
                            <div className="w-16 h-16 rounded-full bg-white/[0.06] -mt-10 mx-auto" />
                            <div className="h-4 bg-white/[0.06] rounded w-1/2 mx-auto" />
                            <div className="h-3 bg-white/[0.03] rounded w-1/3 mx-auto" />
                        </div>
                    ))}
                </div>
            ) : filteredCreators.length === 0 ? (
                <div className="text-center py-16 space-y-4 patreon-glass rounded-3xl p-8 max-w-lg mx-auto border border-white/[0.08]">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-3xl">
                        ☕
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold text-white">No creators found</h3>
                        <p className="text-xs text-neutral-400">
                            {searchQuery ? `No creators matching "${searchQuery}"` : "Be the first creator to start a GetMeAChai page!"}
                        </p>
                    </div>
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-xs font-bold text-white transition-all cursor-pointer shadow-md"
                        >
                            Clear Search
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                    {filteredCreators.map((creator) => (
                        <div
                            key={creator.username}
                            data-cursor-3d
                            data-tilt-deg="5"
                            className="card-3d-interactive patreon-glass rounded-3xl overflow-hidden border border-white/[0.08] hover:border-rose-500/40 shadow-xl transition-all duration-300 flex flex-col justify-between group"
                        >
                            {/* Card Cover Banner */}
                            <div className="relative h-28 w-full overflow-hidden bg-neutral-900">
                                <img
                                    src={creator.coverpic || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"}
                                    alt={creator.username}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-black/20" />
                            </div>

                            {/* Card Body */}
                            <div className="px-5 pb-5 pt-0 relative space-y-4 flex-1 flex flex-col justify-between">
                                <div>
                                    {/* Avatar */}
                                    <div className="relative -mt-10 mb-3 flex items-end justify-between">
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-2xl p-0.5 bg-gradient-to-tr from-rose-500 via-orange-500 to-amber-400 shadow-xl overflow-hidden">
                                                <img
                                                    src={creator.profilepic || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                                                    alt={creator.name || creator.username}
                                                    className="w-full h-full object-cover rounded-2xl bg-neutral-900"
                                                />
                                            </div>
                                            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#121216] flex items-center justify-center text-[8px] text-white font-black" title="Verified Creator">
                                                ✓
                                            </span>
                                        </div>

                                        {/* Stats Badge */}
                                        <div className="text-right">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[11px] font-black">
                                                <span>☕</span>
                                                <span>{creator.supporters || 0} Supporters</span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Creator Details */}
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-black text-white group-hover:text-rose-400 transition-colors truncate">
                                            {creator.name || creator.username}
                                        </h3>
                                        <p className="text-xs font-bold text-rose-400">
                                            @{creator.username}
                                        </p>
                                    </div>
                                </div>

                                {/* Support CTA Button */}
                                <Link
                                    href={`/${creator.username}`}
                                    data-cursor-3d
                                    data-tilt-deg="8"
                                    data-tilt-scale="1.04"
                                    className="btn-3d-interactive w-full py-2.5 px-4 rounded-2xl bg-white/[0.06] hover:bg-rose-500 hover:text-white border border-white/10 hover:border-rose-400 text-xs sm:text-sm font-bold text-neutral-200 transition-all duration-200 text-center flex items-center justify-center gap-2 shadow-sm cursor-pointer group/btn"
                                >
                                    <span>Buy Chai</span>
                                    <span className="group-hover/btn:translate-x-0.5 transition-transform">☕</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
