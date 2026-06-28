"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Branded welcome splash screen.
 * Shows on first page load, animates the OMDC shield mark + tagline,
 * a circular progress ring, and fades out smoothly.
 */
export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress ring 0 -> 100 over ~1.6s
    const start = performance.now();
    const duration = 1600;
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);

    // Hide after the animation completes + a small breath
    const hideTimer = window.setTimeout(() => setVisible(false), 2200);

    // Lock body scroll while splash is visible
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="omdc-splash"
          className="fixed inset-0 z-[200] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100" />
          <div className="absolute inset-0 bg-radial-pink opacity-80" />

          {/* Floating decorative blobs */}
          <motion.div
            className="absolute left-[10%] top-[15%] h-32 w-32 rounded-full bg-pink-300/40 blur-2xl"
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[12%] bottom-[18%] h-40 w-40 rounded-full bg-rose-300/40 blur-2xl"
            animate={{ y: [0, 16, 0], x: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[25%] top-[20%] h-24 w-24 rounded-full bg-fuchsia-300/30 blur-2xl"
            animate={{ y: [0, -16, 0], x: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Center content */}
          <div className="relative flex flex-col items-center px-6 text-center">
            {/* Logo mark with pulsing rings */}
            <div className="relative h-32 w-32">
              {/* Pulsing rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-2 border-pink-400/40"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [0.8, 1.6], opacity: [0.6, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Main shield-tooth mark */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0.4, rotate: -20, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
              >
                <svg viewBox="0 0 96 96" className="h-28 w-28 drop-shadow-[0_12px_24px_rgba(236,72,153,0.4)]">
                  <defs>
                    <linearGradient id="splash-shield" x1="0" y1="0" x2="96" y2="96" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#9D174D" />
                      <stop offset="0.5" stopColor="#DB2777" />
                      <stop offset="1" stopColor="#EC4899" />
                    </linearGradient>
                    <linearGradient id="splash-tooth" x1="28" y1="20" x2="72" y2="84" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFFFFF" />
                      <stop offset="1" stopColor="#FCE7F3" />
                    </linearGradient>
                  </defs>
                  {/* Shield */}
                  <motion.path
                    d="M48 4l36 12v28c0 24-16 40-36 48C28 84 12 68 12 44V16L48 4z"
                    fill="url(#splash-shield)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                  />
                  <path
                    d="M48 10l30 10v24c0 21-14 35-30 42-16-7-30-21-30-42V20L48 10z"
                    fill="#FFFFFF"
                    opacity="0.12"
                  />
                  {/* Tooth */}
                  <motion.path
                    d="M48 24c-7 0-10 2.8-15 2.8-4 0-8 2-8 9.2 0 8 2.8 12 5 18.8 1.6 5.2 2.8 14.8 7.2 14.8 4 0 4.4-7 6-12 1.2-3.6 2.2-5.6 7-5.6s5.8 2 7 5.6c1.6 5 2 12 6 12 4.4 0 5.6-9.6 7.2-14.8C67 48 69.8 44 69.8 36c0-7.2-4-9.2-8-9.2-5 0-8-2.8-15-2.8z"
                    fill="url(#splash-tooth)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.9, type: "spring", stiffness: 220, damping: 14 }}
                    style={{ transformOrigin: "48px 48px" }}
                  />
                  {/* Sparkle */}
                  <motion.path
                    d="M68 28l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z"
                    fill="#FBBF24"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.2, type: "spring", stiffness: 240, damping: 12 }}
                    style={{ transformOrigin: "68px 32px" }}
                  />
                </svg>
              </motion.div>
            </div>

            {/* Wordmark */}
            <motion.div
              className="mt-7"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h1 className="font-display text-5xl font-extrabold tracking-tight">
                <span className="text-gradient-pink">OMDC</span>
              </h1>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-pink-700/80">
                Oktri Manessa Dental Clinic
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="mt-5 text-base italic text-pink-900/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Your Smile, Our Passion
            </motion.p>

            {/* Progress ring + percentage */}
            <motion.div
              className="mt-7 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
            >
              <div className="relative h-9 w-9">
                <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="#FBCFE8"
                    strokeWidth="3"
                  />
                  <motion.circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="url(#splash-shield)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 15}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 15 }}
                    animate={{
                      strokeDashoffset: 2 * Math.PI * 15 * (1 - progress / 100),
                    }}
                    transition={{ ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-pink-700">{progress}</span>
                </div>
              </div>
              <span className="text-[11px] font-medium text-pink-700/70">
                Menyiapkan senyum terbaik untuk Anda…
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
