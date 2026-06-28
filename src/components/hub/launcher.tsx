"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import {
  Globe,
  Smartphone,
  ArrowRight,
  Sparkles,
  Calendar,
  FileText,
  CreditCard,
  User,
} from "lucide-react";

export function HubLauncher() {
  const { setView } = useAppStore();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Decorative blobs */}
      <motion.div
        className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-pink-300/30 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-rose-300/30 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-200/30 blur-3xl"
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #9D174D 1px, transparent 1px), linear-gradient(to bottom, #9D174D 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-5 py-10 lg:px-8 lg:py-16">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 48 48" className="h-12 w-12 drop-shadow-[0_4px_12px_rgba(236,72,153,0.4)]">
              <defs>
                <linearGradient id="hub-shield" x1="0" y1="0" x2="48" y2="48">
                  <stop stopColor="#9D174D" />
                  <stop offset="0.5" stopColor="#DB2777" />
                  <stop offset="1" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              <path d="M24 2l18 6v14c0 12-8 20-18 24C14 42 6 34 6 22V8l18-6z" fill="url(#hub-shield)" />
              <path d="M24 12c-3.5 0-5 1.4-7.5 1.4-2 0-4 1-4 4.6 0 4 1.4 6 2.5 9.4 0.8 2.6 1.4 7.4 3 7.4 1.5 0 1.6-3.4 2.4-6 0.6-1.8 1.1-2.8 3.6-2.8s3 1 3.6 2.8c0.8 2.6 0.9 6 2.4 6 1.6 0 2.2-4.8 3-7.4 1.1-3.4 2.5-5.4 2.5-9.4 0-3.6-2-4.6-4-4.6C29 13.4 27.5 12 24 12z" fill="#FFFFFF" />
            </svg>
            <div>
              <div className="font-display text-3xl font-extrabold tracking-tight">
                <span className="text-gradient-pink">OMDC</span>
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-700/70">
                Oktri Manessa Dental Clinic
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-pink-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-pink-700 backdrop-blur">
            <Sparkles className="h-3 w-3" />
            Project Hub
          </div>
        </motion.header>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-12 max-w-2xl text-center lg:mt-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold text-pink-700 shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-500" />
            </span>
            Selamat datang di OMDC Hub
          </div>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-pink-950 sm:text-5xl lg:text-6xl">
            Pilih pengalaman
            <br />
            <span className="text-gradient-pink">OMDC Anda</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-pink-950/65 sm:text-lg">
            Jelajahi website klinik untuk informasi layanan, atau buka aplikasi pasien untuk
            booking online, rekam medis digital, dan pembayaran — semua dalam genggaman.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2">
          {/* Website card */}
          <motion.button
            onClick={() => setView("website")}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="group relative overflow-hidden rounded-3xl border border-pink-200 bg-white p-6 text-left shadow-soft-pink transition-all lg:p-8"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-pink-100/60 transition-transform group-hover:scale-150" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-md">
                  <Globe className="h-7 w-7" />
                </div>
                <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-700">
                  Marketing
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-extrabold text-pink-950">
                Website Klinik
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-pink-950/65">
                Landing page lengkap dengan informasi layanan, dokter, harga, testimoni, dan
                formulir booking untuk calon pasien.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-pink-950/55">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                  9 section lengkap + animasi premium
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                  Hero, Layanan, Dokter, Harga, FAQ
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                  Welcome splash + scroll progress
                </li>
              </ul>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-pink-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors group-hover:bg-pink-700">
                Buka Website
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </motion.button>

          {/* Mobile app card */}
          <motion.button
            onClick={() => setView("app")}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="group relative overflow-hidden rounded-3xl border border-pink-200 bg-gradient-to-br from-pink-600 via-rose-500 to-fuchsia-600 p-6 text-left text-white shadow-soft-pink transition-all lg:p-8"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 transition-transform group-hover:scale-150" />
            <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/10" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                  <Smartphone className="h-7 w-7" />
                </div>
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                  Patient App · NEW
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-extrabold">
                Aplikasi Mobile Pasien
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                Pengalaman native mobile app dengan booking online, rekam medis digital,
                pembayaran cashless, dan loyalty rewards.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  { icon: Calendar, label: "Booking" },
                  { icon: FileText, label: "Rekam Medis" },
                  { icon: CreditCard, label: "Pembayaran" },
                  { icon: User, label: "Profil" },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-2 rounded-lg bg-white/15 px-2.5 py-1.5 text-xs font-semibold backdrop-blur-sm">
                    <f.icon className="h-3.5 w-3.5" />
                    {f.label}
                  </div>
                ))}
              </div>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-pink-700 shadow-sm transition-colors group-hover:bg-pink-50">
                Buka Mobile App
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </motion.button>
        </div>

        {/* Bottom info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-auto pt-12 text-center text-xs text-pink-950/50"
        >
          OMDC · Your Smile, Our Passion · Dibuat dengan ❤️ di Bekasi
        </motion.div>
      </div>
    </div>
  );
}
