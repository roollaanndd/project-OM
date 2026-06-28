"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { ArrowRight, Mail, Lock, Eye, EyeOff, Phone, User as UserIcon } from "lucide-react";

type Mode = "welcome" | "login" | "register";

export function Onboarding() {
  const { setAuthenticated, setActiveTab, user } = useAppStore();
  const [mode, setMode] = useState<Mode>("welcome");
  const [showPwd, setShowPwd] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - skip real auth
    setAuthenticated(true);
    setActiveTab("home");
  };

  if (mode === "welcome") {
    return (
      <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-b from-pink-100 via-rose-50 to-white">
        {/* Decorative blobs */}
        <motion.div
          className="absolute -right-12 -top-8 h-48 w-48 rounded-full bg-pink-300/40 blur-2xl"
          animate={{ y: [0, -10, 0], x: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-10 top-1/3 h-40 w-40 rounded-full bg-rose-300/40 blur-2xl"
          animate={{ y: [0, 12, 0], x: [0, 8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative flex flex-1 flex-col items-center justify-center px-8 pb-8 text-center">
          {/* Animated logo */}
          <motion.div
            className="relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.1 }}
          >
            {/* Pulsing rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-pink-400/40"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
              />
            ))}
            <svg viewBox="0 0 96 96" className="h-28 w-28 drop-shadow-[0_12px_24px_rgba(236,72,153,0.4)]">
              <defs>
                <linearGradient id="ob-shield" x1="0" y1="0" x2="96" y2="96">
                  <stop stopColor="#9D174D" />
                  <stop offset="0.5" stopColor="#DB2777" />
                  <stop offset="1" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              <path d="M48 4l36 12v28c0 24-16 40-36 48C28 84 12 68 12 44V16L48 4z" fill="url(#ob-shield)" />
              <path d="M48 12c-7 0-10 2.8-15 2.8-4 0-8 2-8 9.2 0 8 2.8 12 5 18.8 1.6 5.2 2.8 14.8 7.2 14.8 4 0 4.4-7 6-12 1.2-3.6 2.2-5.6 7-5.6s5.8 2 7 5.6c1.6 5 2 12 6 12 4.4 0 5.6-9.6 7.2-14.8C67 36 69.8 32 69.8 24c0-7.2-4-9.2-8-9.2-5 0-8-2.8-15-2.8z" fill="#FFFFFF" />
              <path d="M68 28l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z" fill="#FBBF24" />
            </svg>
          </motion.div>

          <motion.h1
            className="mt-8 font-display text-4xl font-extrabold tracking-tight"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="text-gradient-pink">OMDC</span>
          </motion.h1>
          <motion.p
            className="mt-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-pink-700/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Oktri Manessa Dental Clinic
          </motion.p>

          <motion.h2
            className="mt-6 font-display text-2xl font-bold leading-tight text-pink-950"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Your Smile,
            <br />
            Our Passion
          </motion.h2>
          <motion.p
            className="mt-3 max-w-xs text-sm leading-relaxed text-pink-950/65"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Kelola kesehatan gigi Anda dengan mudah — booking, rekam medis, dan pembayaran dalam
            satu aplikasi.
          </motion.p>

          <motion.div
            className="mt-10 w-full max-w-xs space-y-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
          >
            <button
              onClick={() => setMode("login")}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-4 text-base font-bold text-white shadow-soft-pink transition-transform active:scale-[0.98]"
            >
              Masuk
              <ArrowRight className="h-5 w-5 transition-transform group-active:translate-x-1" />
            </button>
            <button
              onClick={() => setMode("register")}
              className="w-full rounded-2xl border border-pink-200 bg-white px-6 py-4 text-base font-bold text-pink-700 transition-colors hover:bg-pink-50 active:scale-[0.98]"
            >
              Daftar Akun Baru
            </button>
          </motion.div>

          <motion.button
            onClick={handleLogin}
            className="mt-5 text-xs font-medium text-pink-700/60 underline-offset-2 hover:underline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Lanjut sebagai tamu (Demo)
          </motion.button>
        </div>
      </div>
    );
  }

  // Login / Register forms
  return (
    <div className="relative flex h-full flex-col overflow-y-auto bg-gradient-to-b from-pink-50 to-white">
      <div className="px-6 pt-6 pb-12">
        {/* Back */}
        <button
          onClick={() => setMode("welcome")}
          className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-pink-700 shadow-sm"
          aria-label="Kembali"
        >
          <ArrowRight className="h-5 w-5 rotate-180" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <h1 className="font-display text-3xl font-extrabold text-pink-950">
              {mode === "login" ? "Selamat Datang! 👋" : "Buat Akun Baru"}
            </h1>
            <p className="mt-2 text-sm text-pink-950/60">
              {mode === "login"
                ? `Masuk untuk melanjutkan ke akun OMDC Anda`
                : `Daftar untuk memulai perjalanan senyum sehat`}
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              {mode === "register" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-pink-950">Nama Lengkap</label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pink-400" />
                    <input
                      required
                      type="text"
                      defaultValue="Sarah Wijayanti"
                      placeholder="Nama lengkap Anda"
                      className="w-full rounded-2xl border border-pink-200 bg-white py-3.5 pl-12 pr-4 text-sm text-pink-950 placeholder:text-pink-950/30 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-pink-950">Email atau No. Telepon</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pink-400" />
                  <input
                    required
                    type="email"
                    defaultValue={user?.email}
                    placeholder="nama@email.com"
                    className="w-full rounded-2xl border border-pink-200 bg-white py-3.5 pl-12 pr-4 text-sm text-pink-950 placeholder:text-pink-950/30 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-pink-950">Kata Sandi</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pink-400" />
                  <input
                    required
                    type={showPwd ? "text" : "password"}
                    defaultValue="password"
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-pink-200 bg-white py-3.5 pl-12 pr-12 text-sm text-pink-950 placeholder:text-pink-950/30 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-pink-400 hover:text-pink-700"
                    aria-label={showPwd ? "Sembunyikan sandi" : "Tampilkan sandi"}
                  >
                    {showPwd ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {mode === "login" && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs font-semibold text-pink-600 hover:underline">
                    Lupa kata sandi?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-4 text-base font-bold text-white shadow-soft-pink transition-transform active:scale-[0.98]"
              >
                {mode === "login" ? "Masuk" : "Daftar Sekarang"}
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-pink-100" />
              <span className="text-xs font-medium text-pink-950/50">atau lanjut dengan</span>
              <span className="h-px flex-1 bg-pink-100" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Google", emoji: "🔵" },
                { label: "Apple", emoji: "🍎" },
                { label: "Facebook", emoji: "📘" },
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={handleLogin}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-pink-200 bg-white py-3 text-sm font-semibold text-pink-950 transition-colors hover:bg-pink-50"
                >
                  <span>{p.emoji}</span>
                  <span className="hidden sm:inline">{p.label}</span>
                </button>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-pink-950/60">
              {mode === "login" ? "Belum punya akun? " : "Sudah punya akun? "}
              <button
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="font-bold text-pink-600 hover:underline"
              >
                {mode === "login" ? "Daftar di sini" : "Masuk"}
              </button>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
