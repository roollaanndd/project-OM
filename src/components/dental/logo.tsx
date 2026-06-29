"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg";
}

export function OmdcLogo({ className, showSubtitle = false, size = "md" }: LogoProps) {
  const dim = size === "sm" ? "h-9" : size === "lg" ? "h-14" : "h-11";
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* Shield-tooth mark */}
      <svg
        viewBox="0 0 48 48"
        className={cn(dim, "w-auto shrink-0", "drop-shadow-[0_4px_12px_rgba(236,72,153,0.35)]")}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="omdc-shield" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9D174D" />
            <stop offset="0.5" stopColor="#DB2777" />
            <stop offset="1" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="omdc-tooth" x1="14" y1="10" x2="36" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#FCE7F3" />
          </linearGradient>
        </defs>
        {/* Shield */}
        <path
          d="M24 2l18 6v14c0 12-8 20-18 24C14 42 6 34 6 22V8l18-6z"
          fill="url(#omdc-shield)"
        />
        <path
          d="M24 5l15 5v12c0 10.5-7 17.5-15 21C16 39.5 9 32.5 9 22V10l15-5z"
          fill="#FFFFFF"
          opacity="0.12"
        />
        {/* Tooth */}
        <path
          d="M24 12c-3.5 0-5 1.4-7.5 1.4-2 0-4 1-4 4.6 0 4 1.4 6 2.5 9.4 0.8 2.6 1.4 7.4 3 7.4 1.5 0 1.6-3.4 2.4-6 0.6-1.8 1.1-2.8 3.6-2.8s3 1 3.6 2.8c0.8 2.6 0.9 6 2.4 6 1.6 0 2.2-4.8 3-7.4 1.1-3.4 2.5-5.4 2.5-9.4 0-3.6-2-4.6-4-4.6C29 13.4 27.5 12 24 12z"
          fill="url(#omdc-tooth)"
        />
        <path
          d="M24 12c-3.5 0-5 1.4-7.5 1.4-2 0-4 1-4 4.6 0 4 1.4 6 2.5 9.4 0.8 2.6 1.4 7.4 3 7.4 1.5 0 1.6-3.4 2.4-6 0.6-1.8 1.1-2.8 3.6-2.8s3 1 3.6 2.8c0.8 2.6 0.9 6 2.4 6 1.6 0 2.2-4.8 3-7.4 1.1-3.4 2.5-5.4 2.5-9.4 0-3.6-2-4.6-4-4.6C29 13.4 27.5 12 24 12z"
          fill="none"
          stroke="#9D174D"
          strokeWidth="0.6"
          opacity="0.4"
        />
        {/* Sparkle */}
        <path d="M34 14l0.8 2 2 0.8-2 0.8-0.8 2-0.8-2-2-0.8 2-0.8z" fill="#FBBF24" />
      </svg>

      <div className="flex flex-col leading-none">
        <span
          className="font-display font-extrabold tracking-tight text-2xl md:text-[26px] text-gradient-pink"
          style={{ letterSpacing: "-0.02em" }}
        >
          OMDC
        </span>
        {showSubtitle && (
          <span className="mt-1 text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Oktri Manessa Dental Clinic
          </span>
        )}
      </div>
    </div>
  );
}
