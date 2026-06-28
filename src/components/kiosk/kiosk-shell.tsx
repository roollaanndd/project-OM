"use client";

import { useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { Clock, Wifi, Signal, BatteryFull } from "lucide-react";

/**
 * e-Kiosk shell — landscape touch-screen kiosk format.
 * Designed for self-service machines at clinic entrance.
 */
export function KioskShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-900 via-pink-950 to-slate-900 p-0 sm:p-6">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[5%] top-[10%] h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute right-[10%] bottom-[15%] h-80 w-80 rounded-full bg-rose-500/20 blur-3xl" />
      </div>

      {/* Kiosk frame — landscape 16:9 ratio */}
      <div className="relative aspect-[16/10] w-full max-w-7xl overflow-hidden rounded-[2rem] border-[10px] border-slate-800 bg-pink-50 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)] sm:aspect-[16/9]">
        {/* Top status bar */}
        <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between bg-gradient-to-r from-pink-700 to-rose-600 px-6 py-2 text-white">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 48 48" className="h-7 w-7">
              <path d="M24 2l18 6v14c0 12-8 20-18 24C14 42 6 34 6 22V8l18-6z" fill="white" />
              <path d="M24 12c-3.5 0-5 1.4-7.5 1.4-2 0-4 1-4 4.6 0 4 1.4 6 2.5 9.4 0.8 2.6 1.4 7.4 3 7.4 1.5 0 1.6-3.4 2.4-6 0.6-1.8 1.1-2.8 3.6-2.8s3 1 3.6 2.8c0.8 2.6 0.9 6 2.4 6 1.6 0 2.2-4.8 3-7.4 1.1-3.4 2.5-5.4 2.5-9.4 0-3.6-2-4.6-4-4.6C29 13.4 27.5 12 24 12z" fill="#DB2777" />
            </svg>
            <div className="leading-none">
              <div className="text-sm font-extrabold">OMDC Self-Service Kiosk</div>
              <div className="text-[10px] text-white/70">Oktri Manessa Dental Clinic</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
              <Signal className="h-3.5 w-3.5" />
              Online
            </span>
            <span className="flex items-center gap-1">
              <Wifi className="h-3.5 w-3.5" />
              Connected
            </span>
            <KioskClock />
            <span className="flex items-center gap-1">
              <BatteryFull className="h-3.5 w-3.5" />
              100%
            </span>
          </div>
        </div>

        {/* Content area */}
        <div className="absolute inset-0 top-12 bottom-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key="kiosk-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Back to hub button (floating, for demo navigation) */}
      <button
        onClick={() => useAppStore.getState().setView("hub")}
        className="fixed bottom-4 left-4 z-50 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-md hover:bg-white/20"
      >
        ← Kembali ke Hub
      </button>
    </div>
  );
}

function KioskClock() {
  const time = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <span className="flex items-center gap-1 font-mono font-bold">
      <Clock className="h-3.5 w-3.5" />
      {time}
    </span>
  );
}
