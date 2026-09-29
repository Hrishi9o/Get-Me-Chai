"use client"
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { fetchuser, updateProfile, fetchUserStats } from '@/actions/useractions'
import { ToastContainer, toast, Bounce } from 'react-toastify'

const Dashboard = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [form, setForm] = useState({})
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalPayments: 0,
    uniqueSupporters: 0,
    avgDonation: 0,
    topSupporter: null,
    recentPayments: []
  })

  const getData = useCallback(async () => {
    if (session?.user?.name) {
      let u = await fetchuser(session.user.name)
      if (u) setForm(u)

      let s = await fetchUserStats(session.user.name)
      if (s) setStats(s)
    }
  }, [session])


  useEffect(() => {
    if (!session) {
      router.push("/login")
    } else {
      getData()
    }
  }, [session, router, getData])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (formData) => {
    setSaving(true)
    try {
      let a = await updateProfile(formData, session?.user?.name)
      if (a?.error) {
        toast.error(a.error, {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        toast.success('✨ Profile & Payout Settings Saved!', {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (err) {
      toast.error(err.message || "Failed to update profile", { theme: "dark" });
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 transition-colors duration-300">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      {/* Header Banner with 3D Interactive Cursor Depth */}
      <div 
        data-cursor-3d
        data-tilt-deg="4"
        className="card-3d-interactive flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-950/40 via-[#18181e] to-neutral-900 border border-white/[0.08] shadow-xl relative overflow-hidden"
      >
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Creator Profile Avatar in Dashboard */}
          <div className="relative group/avatar shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-0.5 bg-gradient-to-tr from-rose-500 via-orange-500 to-amber-400 shadow-xl overflow-hidden">
              {form.profilepic ? (
                <img
                  src={form.profilepic}
                  alt={form.name || form.username || "Profile"}
                  className="w-full h-full object-cover rounded-2xl bg-neutral-900"
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-rose-500 to-orange-400 flex items-center justify-center text-white text-xl sm:text-2xl font-black uppercase">
                  {(form.name || form.username || session?.user?.name || "U")[0]}
                </div>
              )}
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#121216] flex items-center justify-center text-[8px] text-white font-black">
              ✓
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-bold text-rose-400">Creator Studio</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {form.name || form.username ? `@${form.username || session?.user?.name}` : "Account & Payout Settings"}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400">
              Manage your public creator profile and link your Razorpay credentials.
            </p>
          </div>
        </div>

        {session?.user?.name && (
          <Link
            href={`/${form.username || session.user.name}`}
            data-cursor-3d
            data-tilt-deg="8"
            data-tilt-scale="1.04"
            className="btn-3d-interactive flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-xs sm:text-sm font-semibold text-white transition-all shadow-sm group cursor-pointer"
          >
            <span>View Public Page</span>
            <span className="text-rose-400 group-hover:translate-x-0.5 transition-transform">↗</span>
          </Link>
        )}
      </div>

      {/* Interactive Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] max-w-xl">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`flex-1 py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
            activeTab === "overview"
              ? "bg-rose-500 text-white shadow-md scale-[1.02]"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          📊 Analytics & Payouts
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`flex-1 py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
            activeTab === "profile"
              ? "bg-rose-500 text-white shadow-md scale-[1.02]"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          👤 Profile Details
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("payout")}
          className={`flex-1 py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
            activeTab === "payout"
              ? "bg-rose-500 text-white shadow-md scale-[1.02]"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          💳 Razorpay Keys
        </button>
      </div>

      {/* Tab 1: Analytics & Payouts */}
      {activeTab === "overview" && (
        <div className="space-y-6 animate-fadeIn">
          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div data-cursor-3d data-tilt-deg="6" className="card-3d-interactive patreon-glass rounded-3xl p-5 border border-white/[0.08] relative overflow-hidden">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-xs font-bold uppercase tracking-wider">Total Raised</span>
                <span className="text-lg">💰</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">
                ₹{stats.totalEarnings}
              </p>
              <p className="text-[11px] text-neutral-500 mt-1">100% direct payouts</p>
            </div>

            <div data-cursor-3d data-tilt-deg="6" className="card-3d-interactive patreon-glass rounded-3xl p-5 border border-white/[0.08] relative overflow-hidden">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-xs font-bold uppercase tracking-wider">Chais Received</span>
                <span className="text-lg">☕</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-rose-400 mt-2">
                {stats.totalPayments}
              </p>
              <p className="text-[11px] text-neutral-500 mt-1">Total cups donated</p>
            </div>

            <div data-cursor-3d data-tilt-deg="6" className="card-3d-interactive patreon-glass rounded-3xl p-5 border border-white/[0.08] relative overflow-hidden">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-xs font-bold uppercase tracking-wider">Supporters</span>
                <span className="text-lg">👥</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-amber-400 mt-2">
                {stats.uniqueSupporters}
              </p>
              <p className="text-[11px] text-neutral-500 mt-1">Unique individuals</p>
            </div>

            <div data-cursor-3d data-tilt-deg="6" className="card-3d-interactive patreon-glass rounded-3xl p-5 border border-white/[0.08] relative overflow-hidden">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-xs font-bold uppercase tracking-wider">Avg. Donation</span>
                <span className="text-lg">📈</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-sky-400 mt-2">
                ₹{stats.avgDonation}
              </p>
              <p className="text-[11px] text-neutral-500 mt-1">Per contribution</p>
            </div>
          </div>

          {/* Top Supporter Banner (if any) */}
          {stats.topSupporter && (
            <div data-cursor-3d data-tilt-deg="4" className="card-3d-interactive p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-[#1a1714] to-neutral-900 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20">
                  👑
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-amber-400 uppercase tracking-widest">Hall of Fame</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">#1 Top Supporter</span>
                  </div>
                  <h3 className="text-lg font-black text-white">{stats.topSupporter.name}</h3>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs text-neutral-400">Highest contribution</p>
                <p className="text-xl font-black text-emerald-400">₹{stats.topSupporter.amount}</p>
              </div>
            </div>
          )}

          {/* Recent Payments Table / Feed */}
          <div className="patreon-glass rounded-3xl p-4 sm:p-7 space-y-4 shadow-xl overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                    <span>📜</span>
                    <span>Payment History</span>
                  </h2>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300 font-bold border border-rose-500/20 whitespace-nowrap">
                    {stats.recentPayments.length} transactions
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  Real-time log of supporters who sent chai to your linked Razorpay account.
                </p>
              </div>
            </div>

            {stats.recentPayments.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-2xl">
                  ☕
                </div>
                <p className="text-base font-bold text-white">No payments received yet</p>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                  Share your public page link with your audience on Twitter, YouTube, or Instagram to start receiving chai!
                </p>
              </div>
            ) : (
              <>
                {/* Mobile View: Clean Card-based Feed */}
                <div className="block md:hidden space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                  {stats.recentPayments.map((p, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500/30 to-amber-500/30 text-rose-300 flex items-center justify-center text-xs font-bold shrink-0 border border-white/10">
                            {(p.name || "A")[0].toUpperCase()}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-white truncate max-w-[140px] xs:max-w-[180px]">
                              {p.name || "Anonymous"}
                            </p>
                            <p className="text-[10px] text-neutral-400">
                              {new Date(p.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                          +₹{p.amount / 100}
                        </span>
                      </div>
                      {p.message && (
                        <div className="pt-2 border-t border-white/[0.04]">
                          <p className="text-xs text-neutral-300 italic leading-relaxed break-words">
                            &ldquo;{p.message}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Desktop View: Formatted Structured Table */}
                <div className="hidden md:block overflow-x-auto max-h-[480px] overflow-y-auto pr-1">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.06] text-neutral-400 font-bold text-[11px] uppercase tracking-wider">
                        <th className="pb-3 pl-3">Supporter</th>
                        <th className="pb-3">Amount</th>
                        <th className="pb-3">Date</th>
                        <th className="pb-3 pr-3">Message</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {stats.recentPayments.map((p, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 pl-3 font-bold text-white flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center text-xs font-bold shrink-0">
                              {(p.name || "A")[0].toUpperCase()}
                            </span>
                            <span className="truncate max-w-[180px]">{p.name || "Anonymous"}</span>
                          </td>
                          <td className="py-3.5 font-black text-emerald-400 whitespace-nowrap">
                            ₹{p.amount / 100}
                          </td>
                          <td className="py-3.5 text-neutral-400 text-xs whitespace-nowrap">
                            {new Date(p.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="py-3.5 pr-3 text-neutral-300 italic text-xs max-w-sm truncate">
                            {p.message ? `"${p.message}"` : <span className="text-neutral-500 not-italic">—</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Settings Form */}
      <form action={handleSubmit} className={`space-y-8 ${activeTab === "overview" ? "hidden" : ""}`}>
        
        {/* Section 1: Profile Information */}
        <div className={`patreon-glass rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 ${activeTab !== "profile" ? "hidden" : "animate-fadeIn"}`}>
          <div className="border-b border-white/[0.06] pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>👤</span>
              <span>Creator Profile Details</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              This information will be displayed on your public GetMeAChai page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-semibold text-neutral-300">
                Display Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name || ""}
                onChange={handleChange}
                placeholder="e.g. Alex Morgan"
                className="w-full bg-[#121216] border border-white/[0.08] rounded-2xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-neutral-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email || ""}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full bg-[#121216] border border-white/[0.08] rounded-2xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all duration-200"
              />
            </div>

            {/* Username */}
            <div className="space-y-1.5 md:col-span-2">
              <label htmlFor="username" className="text-xs font-semibold text-neutral-300">
                Custom Username (URL Handle)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-xs font-bold text-neutral-500">getmeachai.com/</span>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={form.username || ""}
                  onChange={handleChange}
                  placeholder="username"
                  className="w-full bg-[#121216] border border-white/[0.08] rounded-2xl pl-32 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* Profile Picture URL */}
            <div className="space-y-1.5">
              <label htmlFor="profilepic" className="text-xs font-semibold text-neutral-300">
                Profile Avatar URL
              </label>
              <input
                type="text"
                id="profilepic"
                name="profilepic"
                value={form.profilepic || ""}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full bg-[#121216] border border-white/[0.08] rounded-2xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all duration-200"
              />
            </div>

            {/* Cover Banner URL */}
            <div className="space-y-1.5">
              <label htmlFor="coverpic" className="text-xs font-semibold text-neutral-300">
                Cover Banner URL
              </label>
              <input
                type="text"
                id="coverpic"
                name="coverpic"
                value={form.coverpic || ""}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full bg-[#121216] border border-white/[0.08] rounded-2xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Razorpay Payout Settings */}
        <div className={`patreon-glass rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 ${activeTab !== "payout" ? "hidden" : "animate-fadeIn"}`}>
          <div className="border-b border-white/[0.06] pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>💳</span>
              <span>Razorpay Payout Credentials</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Funds donated by your supporters go directly to your Razorpay account using these API keys.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs text-amber-200">
            <span className="text-base">💡</span>
            <p className="leading-relaxed">
              Find your API Key ID and Secret in your <strong>Razorpay Dashboard &gt; Settings &gt; API Keys</strong>. Keep your secret safe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Razorpay Key ID */}
            <div className="space-y-1.5">
              <label htmlFor="razorpayid" className="text-xs font-semibold text-neutral-300">
                Razorpay Key ID
              </label>
              <input
                type="text"
                id="razorpayid"
                name="razorpayid"
                value={form.razorpayid || ""}
                onChange={handleChange}
                placeholder="rzp_test_..."
                className="w-full bg-[#121216] border border-white/[0.08] rounded-2xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all font-mono"
              />
            </div>

            {/* Razorpay Key Secret */}
            <div className="space-y-1.5">
              <label htmlFor="razorpaysecret" className="text-xs font-semibold text-neutral-300">
                Razorpay Key Secret
              </label>
              <input
                type="password"
                id="razorpaysecret"
                name="razorpaysecret"
                value={form.razorpaysecret || ""}
                onChange={handleChange}
                placeholder="••••••••••••••••"
                className="w-full bg-[#121216] border border-white/[0.08] rounded-2xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all font-mono"
              />
            </div>
          </div>
        </div>

        {/* Submit Button with 3D Magnetic Tilt */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            data-cursor-3d
            data-tilt-deg="8"
            data-tilt-scale="1.04"
            className="btn-3d-interactive w-full sm:w-auto px-8 py-3.5 rounded-full text-black bg-white hover:bg-neutral-200 font-bold text-sm sm:text-base shadow-xl transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <span>Save Changes</span>
                <span>✓</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  )
}

export default Dashboard
