"use client"
import React, { useEffect } from 'react'
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from 'next/link'

const Login = () => {
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        document.title = "Log In or Sign Up - GetMeAChai"
        if (session) {
            router.push('/dashboard')
        }
    }, [session, router])

    return (
        <div className="relative min-h-[85vh] flex items-center justify-center px-4 py-12 transition-colors duration-300">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-rose-500/15 blur-[140px] rounded-full pointer-events-none -z-10" />

            <div 
                data-cursor-3d
                data-tilt-deg="4"
                className="w-full max-w-md patreon-glass card-3d-interactive rounded-3xl p-7 sm:p-10 shadow-2xl border border-black/[0.08] dark:border-white/[0.1] backdrop-blur-2xl text-center space-y-6"
            >
                
                {/* Logo Badge */}
                <div className="flex flex-col items-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500/20 via-orange-500/20 to-amber-500/20 border border-rose-500/30 flex items-center justify-center shadow-lg shadow-rose-500/10 hover:scale-105 transition-transform duration-300">
                        <img src="/tea.gif" width={34} height={34} alt="GetMeAChai" className="drop-shadow" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                            Welcome to GetMeAChai
                        </h1>
                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                            Log in or create an account to start receiving support
                        </p>
                    </div>
                </div>

                {/* Social Login Stack with 3D interactive magnetic cursor buttons */}
                <div className="space-y-3 pt-2">
                    
                    {/* GitHub (Primary) */}
                    <button
                        type="button"
                        data-cursor-3d
                        data-tilt-deg="8"
                        data-tilt-scale="1.03"
                        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                        className="btn-3d-interactive w-full h-12 flex items-center justify-center gap-3 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-bold text-sm rounded-full shadow-lg transition-all cursor-pointer"
                    >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        <span>Continue with GitHub</span>
                    </button>

                    {/* Google */}
                    <button
                        type="button"
                        data-cursor-3d
                        data-tilt-deg="8"
                        data-tilt-scale="1.03"
                        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                        className="btn-3d-interactive w-full h-12 flex items-center justify-center gap-3 bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] border border-black/[0.08] dark:border-white/10 text-neutral-800 dark:text-white font-semibold text-sm rounded-full transition-all cursor-pointer"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        <span>Continue with Google</span>
                    </button>

                    {/* LinkedIn */}
                    <button
                        type="button"
                        data-cursor-3d
                        data-tilt-deg="8"
                        data-tilt-scale="1.03"
                        onClick={() => signIn("linkedin", { callbackUrl: "/dashboard" })}
                        className="btn-3d-interactive w-full h-12 flex items-center justify-center gap-3 bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] border border-black/[0.08] dark:border-white/10 text-neutral-800 dark:text-white font-semibold text-sm rounded-full transition-all cursor-pointer"
                    >
                        <svg className="w-4 h-4 fill-current text-[#0A66C2]" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.97 0 1.75-.79 1.75-1.76s-.78-1.75-1.75-1.75c-.97 0-1.76.78-1.76 1.75s.79 1.76 1.76 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                        </svg>
                        <span>Continue with LinkedIn</span>
                    </button>

                    {/* Facebook */}
                    <button
                        type="button"
                        data-cursor-3d
                        data-tilt-deg="8"
                        data-tilt-scale="1.03"
                        onClick={() => signIn("facebook", { callbackUrl: "/dashboard" })}
                        className="btn-3d-interactive w-full h-12 flex items-center justify-center gap-3 bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] border border-black/[0.08] dark:border-white/10 text-neutral-800 dark:text-white font-semibold text-sm rounded-full transition-all cursor-pointer"
                    >
                        <svg className="w-5 h-5 fill-current text-[#1877F2]" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        <span>Continue with Facebook</span>
                    </button>

                </div>

                {/* Footnote */}
                <div className="pt-2 text-center text-[11px] text-neutral-500 dark:text-neutral-400 space-y-2 border-t border-black/[0.06] dark:border-white/[0.06]">
                    <p>
                        By continuing, you agree to our Terms of Service & Privacy Policy.
                    </p>
                    <p>
                        <Link href="/" className="text-rose-600 dark:text-rose-400 hover:underline font-semibold">
                            ← Return to Home
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Login