"use client"
import React, { useState, useEffect, useCallback } from 'react'
import Script from 'next/script'
import { fetchpayment, fetchuser, initiate } from '@/actions/useractions'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { useSearchParams, useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {
    const [paymentform, setpaymentform] = useState({ name: "", message: "", amount: "10" })
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setpayments] = useState([])
    const [selectedTier, setSelectedTier] = useState("10")
    const searchParams = useSearchParams()
    const router = useRouter()

    const handlechange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
        if (e.target.name === 'amount') {
            setSelectedTier(e.target.value)
        }
    }

    const selectPresetAmount = (amount) => {
        setSelectedTier(amount)
        setpaymentform({ ...paymentform, amount })
    }

    const getData = useCallback(async () => {
        let u = await fetchuser(username)
        setcurrentUser(u);

        let p = await fetchpayment(username)
        setpayments(p || []);
    }, [username])

    useEffect(() => {
        getData()
    }, [getData])

    useEffect(() => {
        if (searchParams.get("paymentdone") === "true") {
            toast.success('☕ Thanks a ton for your support!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });
            router.push(`/${username}`)
        }
    }, [searchParams, username, router])

    const pay = async (amountInPaise) => {
        if (!currentUser?.razorpayid) {
            toast.error("Creator has not configured their Razorpay keys yet.", { theme: "dark" });
            return;
        }

        try {
            let a = await initiate(amountInPaise, username, paymentform)
            let orderID = a.id;

            var options = {
                "key": currentUser?.razorpayid,
                "amount": amountInPaise,
                "currency": "INR",
                "name": "Get-Me-A-Chai",
                "description": `Supporting @${username} on GetMeAChai`,
                "image": currentUser?.profilepic || "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnp6ZmMyajdmMzBvendxajlqMXB2a2V6NHRsMjBib28wODBmcmx5ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XuY1wPLpdv9fKTxb4V/giphy.gif",
                "order_id": orderID,
                "callback_url": `${typeof window !== "undefined" ? window.location.origin : (process.env.NEXT_PUBLIC_URL || "http://localhost:3000")}/api/razorpay`,
                "prefill": {
                    "name": paymentform.name || "Supporter",
                    "email": "supporter@example.com",
                    "contact": "+919876543210"
                },
                "notes": {
                    "creator": username
                },
                "theme": {
                    "color": "#ff424d"
                },
                "modal": {
                    "confirm_close": true,
                    "animation": true
                },
                "retry": {
                    "enabled": true,
                    "max_count": 3
                }
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            toast.error(error.message || "Could not initiate payment", { theme: "dark" });
        }
    }

    const copyProfileLink = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            toast.info("📋 Link copied to clipboard!", { theme: "dark" });
        }
    }

    const totalRaised = payments.reduce((acc, curr) => acc + (curr.amount || 0), 0) / 100;

    return (
        <div className="min-h-screen pb-20 transition-colors duration-300">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload"></Script>

            {/* Cover Banner with Ambient Gradient Fade */}
            <div className="w-full relative h-48 sm:h-72 md:h-80 lg:h-96 overflow-hidden bg-neutral-900">
                <img
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    src={currentUser?.coverpic || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1800&q=80"}
                    alt="Cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] via-transparent to-black/30" />
            </div>

            {/* Profile Overview Container */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Avatar & Header Info Card */}
                <div className="relative -mt-16 sm:-mt-24 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">

                    {/* Avatar + Title */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 text-center sm:text-left">
                        <div className="relative group">
                            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-rose-500 via-orange-500 to-amber-400 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                                <img
                                    className="w-full h-full object-cover rounded-full bg-[#121216]"
                                    src={currentUser?.profilepic || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}
                                    alt={username}
                                />
                            </div>
                            <span className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0c0c0f] flex items-center justify-center text-[10px] text-white font-bold shadow-md animate-pulse" title="Verified Creator">
                                ✓
                            </span>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center justify-center sm:justify-start gap-2">
                                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                    {currentUser?.name || username}
                                </h1>
                            </div>
                            <p className="text-sm font-bold text-rose-400">
                                @{username}
                            </p>
                            <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
                                Creating, coding, and building cool projects with love & chai.
                            </p>
                        </div>
                    </div>

                    {/* Share Action Button with 3D interactive cursor */}
                    <button
                        type="button"
                        data-cursor-3d
                        data-tilt-deg="8"
                        data-tilt-scale="1.04"
                        onClick={copyProfileLink}
                        className="btn-3d-interactive flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs sm:text-sm font-semibold text-neutral-200 transition-all cursor-pointer shadow-sm group"
                    >
                        <svg className="w-4 h-4 text-neutral-400 group-hover:text-rose-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        <span>Share Profile</span>
                    </button>
                </div>

                {/* Live Stats Bar with 3D interactive cards */}
                <div className="grid grid-cols-2 gap-3 py-6 max-w-md mx-auto sm:mx-0">
                    <div
                        data-cursor-3d
                        data-tilt-deg="6"
                        className="p-3.5 sm:p-4 rounded-2xl patreon-glass card-3d-interactive text-center sm:text-left border border-white/[0.08] hover:border-rose-500/40"
                    >
                        <p className="text-[11px] uppercase tracking-wider font-bold text-neutral-400">Supporters</p>
                        <p className="text-xl sm:text-2xl font-black text-white mt-0.5">{payments.length}</p>
                    </div>

                    <div
                        data-cursor-3d
                        data-tilt-deg="6"
                        className="p-3.5 sm:p-4 rounded-2xl patreon-glass card-3d-interactive text-center sm:text-left border border-white/[0.08] hover:border-rose-500/40"
                    >
                        <p className="text-[11px] uppercase tracking-wider font-bold text-neutral-400">Total Raised</p>
                        <p className="text-xl sm:text-2xl font-black text-rose-400 mt-0.5">₹{totalRaised}</p>
                    </div>
                </div>

                {/* Main Content: Two Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">

                    {/* Left Column: Real-time Supporters Feed */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                                <span>Recent Supporters</span>
                                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300 font-bold border border-rose-500/20">
                                    {payments.length}
                                </span>
                            </h2>
                        </div>

                        {/* List of Real Supporters */}
                        <div className="patreon-glass rounded-3xl p-5 sm:p-6 space-y-3 shadow-xl">
                            {payments.length === 0 ? (
                                <div className="text-center py-12 space-y-3">
                                    <div className="w-16 h-16 mx-auto rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-2xl patreon-float">
                                        ☕
                                    </div>
                                    <p className="text-base font-bold text-white">No supporters yet</p>
                                    <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
                                        Be the first one to buy @{username} a chai and leave an encouraging message!
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                                    {payments.map((p, i) => (
                                        <div
                                            key={i}
                                            data-cursor-3d
                                            data-tilt-deg="5"
                                            className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] hover:border-rose-500/30 transition-all duration-300 card-3d-interactive"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500/30 to-amber-500/30 border border-white/10 flex items-center justify-center shrink-0 p-1">
                                                <img src="/avatar.gif" alt="Supporter" className="w-full h-full rounded-full object-cover" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-bold text-white">
                                                        {p.name}
                                                    </span>
                                                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                        ₹{p.amount / 100}
                                                    </span>
                                                </div>
                                                {p.message && (
                                                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                                                        &ldquo;{p.message}&rdquo;
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Support / Buy a Chai Box with Animated Tier Selector */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24 patreon-glass rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl border border-white/[0.1] relative overflow-hidden">

                            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                                <div className="space-y-0.5">
                                    <h2 className="text-xl font-black text-white tracking-tight">
                                        Buy @{username} a Chai
                                    </h2>
                                    <p className="text-xs text-neutral-400">
                                        Direct payout sent to creator&apos;s Razorpay
                                    </p>
                                </div>
                                <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                                    <span className="text-xl">☕</span>
                                    {/* Rising Steam */}
                                    <span className="patreon-steam-particle absolute -top-3 w-1 h-4 bg-gradient-to-t from-rose-400/60 to-transparent rounded-full blur-[0.5px]" />
                                </div>
                            </div>

                            {/* Quick Amount Selector Pills with 3D interactive magnetic cursor */}
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider font-bold text-neutral-400">
                                    Select Chai Quantity
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { val: "10", label: "☕ 1 (₹10)" },
                                        { val: "20", label: "☕ 2 (₹20)" },
                                        { val: "30", label: "☕ 3 (₹30)" },
                                    ].map((tier) => (
                                        <button
                                            key={tier.val}
                                            type="button"
                                            data-cursor-3d
                                            data-tilt-deg="10"
                                            data-tilt-scale="1.05"
                                            onClick={() => selectPresetAmount(tier.val)}
                                            className={`btn-3d-interactive py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all duration-200 cursor-pointer ${selectedTier === tier.val
                                                ? "bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/30 animate-cup-bounce"
                                                : "bg-white/[0.03] border-white/[0.08] text-neutral-300 hover:bg-white/[0.07]"
                                                }`}
                                        >
                                            {tier.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Inputs with Smooth Glow Focus */}
                            <div className="space-y-3.5">
                                <div>
                                    <label htmlFor="name" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        onChange={handlechange}
                                        value={paymentform.name || ""}
                                        placeholder="Enter Name"
                                        className="w-full bg-[#121216] border border-white/[0.08] rounded-2xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all duration-200"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                                        Say something nice
                                    </label>
                                    <input
                                        type="text"
                                        id="message"
                                        name="message"
                                        onChange={handlechange}
                                        value={paymentform.message || ""}
                                        placeholder="Enter Message"
                                        className="w-full bg-[#121216] border border-white/[0.08] rounded-2xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all duration-200"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="amount" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                                        Amount (₹)
                                    </label>
                                    <input
                                        type="number"
                                        id="amount"
                                        name="amount"
                                        min="1"
                                        onChange={handlechange}
                                        value={paymentform.amount || ""}
                                        placeholder="Enter Amount"
                                        className="w-full bg-[#121216] border border-white/[0.08] rounded-2xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Main Submit Action with 3D interactive magnetic cursor button */}
                            <button
                                type="button"
                                data-cursor-3d
                                data-tilt-deg="8"
                                data-tilt-scale="1.03"
                                onClick={() => pay(Number(paymentform.amount) * 100)}
                                disabled={!paymentform.name || paymentform.name.length < 3 || !paymentform.message || paymentform.message.length < 4 || !paymentform.amount || Number(paymentform.amount) <= 0}
                                className="btn-3d-interactive w-full py-4 px-6 rounded-full text-black bg-white hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-600 disabled:cursor-not-allowed font-bold text-sm sm:text-base shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                            >
                                <span>Support {paymentform.amount ? `₹${paymentform.amount}` : "Creator"}</span>
                                <span>☕</span>
                            </button>

                            {/* Security Badge */}
                            <div className="pt-1 text-center space-y-1">
                                <p className="text-[11px] text-neutral-400 flex items-center justify-center gap-1.5 font-medium">
                                    <span>🔒</span>
                                    <span>Secured with Razorpay • 100% Direct Payout</span>
                                </p>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default PaymentPage
