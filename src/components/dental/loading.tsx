"use client";

import { m } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Branded loading spinner for inline async states.
 * Uses the OMDC shield mark with rotating pink ring.
 */
export function LoadingSpinner({
  size = 48,
  label,
  className,
}: {
  size?: number;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className ?? ""}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 48 48" className="absolute inset-0">
          <defs>
            <linearGradient id="loader-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9D174D" />
              <stop offset="0.5" stopColor="#DB2777" />
              <stop offset="1" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          {/* Track */}
          <circle cx="24" cy="24" r="20" fill="none" stroke="#FBCFE8" strokeWidth="3.5" />
          {/* Spinning arc */}
          <m.circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="url(#loader-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="32 100"
            style={{ transformOrigin: "24px 24px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          />
          {/* Center tooth */}
          <path
            d="M24 12c-3.5 0-5 1.4-7.5 1.4-2 0-4 1-4 4.6 0 4 1.4 6 2.5 9.4 0.8 2.6 1.4 7.4 3 7.4 1.5 0 1.6-3.4 2.4-6 0.6-1.8 1.1-2.8 3.6-2.8s3 1 3.6 2.8c0.8 2.6 0.9 6 2.4 6 1.6 0 2.2-4.8 3-7.4 1.1-3.4 2.5-5.4 2.5-9.4 0-3.6-2-4.6-4-4.6C29 13.4 27.5 12 24 12z"
            fill="url(#loader-grad)"
            opacity="0.85"
          />
        </svg>
      </div>
      {label && (
        <m.p
          className="text-xs font-medium text-pink-700"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {label}
        </m.p>
      )}
    </div>
  );
}

/**
 * Full-screen loading overlay — for global async operations.
 */
export function FullScreenLoader({ visible, label }: { visible: boolean; label?: string }) {
  if (!visible) return null;
  return (
    <m.div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-pink-50/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LoadingSpinner size={64} label={label} />
    </m.div>
  );
}

/**
 * Skeleton placeholder card for async-loaded content.
 */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={`rounded-3xl border border-pink-100 bg-white p-6 ${className ?? ""}`}>
      <div className="h-12 w-12 animate-pulse rounded-2xl bg-pink-100" />
      <div className="mt-5 h-4 w-3/4 animate-pulse rounded-full bg-pink-100" />
      <div className="mt-2 h-3 w-full animate-pulse rounded-full bg-pink-100/70" />
      <div className="mt-1.5 h-3 w-5/6 animate-pulse rounded-full bg-pink-100/70" />
      <div className="mt-5 flex items-center justify-between border-t border-pink-100 pt-4">
        <div className="h-6 w-20 animate-pulse rounded-full bg-pink-100" />
        <div className="h-9 w-9 animate-pulse rounded-full bg-pink-100" />
      </div>
    </div>
  );
}

/**
 * Animated scroll progress bar — pinned to the top of viewport.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
      <m.div
        className="h-full origin-left bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-500"
        style={{ scaleX: progress / 100, transformOrigin: "left" }}
        transition={{ ease: "linear", duration: 0.1 }}
      />
    </div>
  );
}
