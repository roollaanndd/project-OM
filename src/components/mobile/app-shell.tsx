"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { StatusBar } from "./status-bar";
import { BottomNav } from "./bottom-nav";

/**
 * Mobile app shell.
 * On desktop: shows in a phone frame (iPhone-style).
 * On mobile devices: full viewport.
 *
 * Manages screen transitions and renders the active tab.
 */
export function AppShell({
  children,
  activeTab,
}: {
  children: ReactNode;
  activeTab: string;
}) {
  const { isAuthenticated, setAuthenticated } = useAppStore();
  const [hydrated, setHydrated] = useState(false);

  // Skip first render to avoid hydration mismatch (Zustand persist is async)
  useEffect(() => {
    Promise.resolve().then(() => setHydrated(true));
  }, []);

  // Lock body scroll while in app mode (we manage scroll inside the app frame)
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-pink-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-200 border-t-pink-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-pink-50 px-0 py-0 sm:p-6 lg:p-8">
      {/* Background decoration (desktop) */}
      <div className="pointer-events-none fixed inset-0 -z-10 hidden sm:block">
        <div className="absolute left-[5%] top-[10%] h-72 w-72 rounded-full bg-pink-300/20 blur-3xl" />
        <div className="absolute right-[10%] bottom-[15%] h-80 w-80 rounded-full bg-rose-300/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-200/20 blur-3xl" />
      </div>

      {/* Desktop side panel (brand info) */}
      <aside className="mr-12 hidden max-w-xs flex-col lg:flex">
        <div className="mb-8 inline-flex items-center gap-3">
          <svg viewBox="0 0 48 48" className="h-12 w-12 drop-shadow-[0_4px_12px_rgba(236,72,153,0.4)]">
            <defs>
              <linearGradient id="app-shield" x1="0" y1="0" x2="48" y2="48">
                <stop stopColor="#9D174D" />
                <stop offset="0.5" stopColor="#DB2777" />
                <stop offset="1" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <path d="M24 2l18 6v14c0 12-8 20-18 24C14 42 6 34 6 22V8l18-6z" fill="url(#app-shield)" />
            <path d="M24 12c-3.5 0-5 1.4-7.5 1.4-2 0-4 1-4 4.6 0 4 1.4 6 2.5 9.4 0.8 2.6 1.4 7.4 3 7.4 1.5 0 1.6-3.4 2.4-6 0.6-1.8 1.1-2.8 3.6-2.8s3 1 3.6 2.8c0.8 2.6 0.9 6 2.4 6 1.6 0 2.2-4.8 3-7.4 1.1-3.4 2.5-5.4 2.5-9.4 0-3.6-2-4.6-4-4.6C29 13.4 27.5 12 24 12z" fill="#FFFFFF" />
          </svg>
          <div>
            <div className="font-display text-3xl font-extrabold tracking-tight">
              <span className="text-gradient-pink">OMDC</span>
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-700/70">
              Patient App
            </div>
          </div>
        </div>

        <h2 className="font-display text-4xl font-extrabold leading-tight text-pink-950">
          Senyum sehat,
          <br />
          <span className="text-gradient-pink">genggam di tangan</span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-pink-950/60">
          Booking online, rekam medis digital, pembayaran mudah, dan loyalty rewards — semua
          dalam satu aplikasi OMDC.
        </p>

        <ul className="mt-6 space-y-3 text-sm">
          {[
            "Booking real-time dengan dokter pilihan",
            "Akses rekam medis 24/7",
            "Pembayaran cashless & cicilan 0%",
            "Poin reward untuk setiap perawatan",
          ].map((f) => (
            <li key={f} className="flex items-start gap-2 text-pink-950/75">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-200 text-pink-700">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>

        <button
          onClick={() => useAppStore.getState().setView("hub")}
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-pink-300 bg-white/70 px-4 py-2 text-sm font-semibold text-pink-700 transition-colors hover:bg-pink-50"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 12L5 7l4-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Kembali ke Hub
        </button>
      </aside>

      {/* Phone frame */}
      <div className="relative h-screen w-full overflow-hidden bg-pink-50 sm:h-[860px] sm:max-h-[90vh] sm:w-[420px] sm:rounded-[3rem] sm:border-[10px] sm:border-pink-950 sm:shadow-[0_40px_80px_-20px_rgba(157,23,77,0.5),0_0_0_2px_rgba(244,114,182,0.3)]">
        {/* Notch (desktop only) */}
        <div className="absolute left-1/2 top-0 z-50 hidden h-7 w-36 -translate-x-1/2 rounded-b-2xl bg-pink-950 sm:block" />

        {/* App content */}
        <div className="relative flex h-full flex-col overflow-hidden bg-pink-50">
          <StatusBar />

          {/* Scrollable content */}
          <div className="relative flex-1 overflow-y-auto overflow-x-hidden pb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + (isAuthenticated ? "-auth" : "-guest")}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="min-h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom nav (only when authenticated) */}
          {isAuthenticated && <BottomNav />}
        </div>
      </div>
    </div>
  );
}
