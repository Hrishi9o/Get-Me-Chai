"use client"
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { fetchuser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast, Bounce } from 'react-toastify'

const Dashboard = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [form, setForm] = useState({})
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  const getData = useCallback(async () => {
    if (session?.user?.name) {
      let u = await fetchuser(session.user.name)
      if (u) setForm(u)
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
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] max-w-md">
        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
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
          className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
            activeTab === "payout"
              ? "bg-rose-500 text-white shadow-md scale-[1.02]"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          💳 Razorpay Keys
        </button>
      </div>

      {/* Main Settings Form */}
      <form action={handleSubmit} className="space-y-8">
        
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
