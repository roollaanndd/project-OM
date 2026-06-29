"use client";

import { useEffect, useState } from "react";

/**
 * Mock iOS-style status bar shown inside the phone frame.
 * Shows real time so it feels live.
 */
export function StatusBar({ dark = false }: { dark?: boolean }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    };
    update();
    const t = setInterval(update, 30_000);
    return () => clearInterval(t);
  }, []);

  const color = dark ? "text-white" : "text-pink-950";

  return (
    <div className={`flex items-center justify-between px-6 pt-3 pb-1 text-xs font-semibold ${color}`}>
      <span>{time}</span>
      <div className="flex items-center gap-1.5">
        {/* Signal */}
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
          <rect x="0" y="6" width="3" height="4" rx="0.5" fill="currentColor" />
          <rect x="4" y="4" width="3" height="6" rx="0.5" fill="currentColor" />
          <rect x="8" y="2" width="3" height="8" rx="0.5" fill="currentColor" />
          <rect x="12" y="0" width="3" height="10" rx="0.5" fill="currentColor" opacity="0.4" />
        </svg>
        {/* WiFi */}
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
          <path d="M7 2C9.5 2 11.8 3 13.5 4.6L12 6.1C10.7 4.8 9 4 7 4C5 4 3.3 4.8 2 6.1L0.5 4.6C2.2 3 4.5 2 7 2Z" fill="currentColor" />
          <path d="M7 5C8.6 5 10 5.6 11 6.6L9.5 8.1C8.9 7.4 8 7 7 7C6 7 5.1 7.4 4.5 8.1L3 6.6C4 5.6 5.4 5 7 5Z" fill="currentColor" />
          <circle cx="7" cy="9" r="1" fill="currentColor" />
        </svg>
        {/* Battery */}
        <div className="relative ml-0.5 flex h-[10px] w-[22px] items-center rounded-[3px] border border-current px-[1.5px]">
          <div className="h-[6px] w-[16px] rounded-[1px] bg-current" />
          <div className="absolute -right-[3px] h-[4px] w-[1.5px] rounded-r bg-current" />
        </div>
      </div>
    </div>
  );
}
