"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore, type AppVersion } from "@/lib/app-store";
import { GitBranch, Check, ChevronUp, X, Sparkles, History } from "lucide-react";
import { cn } from "@/lib/utils";

const VERSIONS: {
  id: AppVersion;
  label: string;
  desc: string;
  features: string[];
  badge?: string;
  color: string;
}[] = [
  {
    id: "v2.0.0",
    label: "v2.0.0",
    desc: "Creative Refresh — Glassmorphism, mesh gradients, micro-interactions",
    features: [
      "✨ Glassmorphism cards",
      "🎨 Mesh gradient backgrounds",
      "🎬 Scroll reveal animations",
      "🖱️ Micro-interactions (hover, magnetic)",
      "🌙 Dark mode ready",
      "💎 Premium UI polish",
    ],
    badge: "LATEST",
    color: "from-pink-500 via-rose-500 to-fuchsia-600",
  },
  {
    id: "v1.5.0",
    label: "v1.5.0",
    desc: "Stable — Real photos, branch selector, background variations",
    features: [
      "📸 Real doctor & testimonial photos",
      "🏥 Branch selector (3 cabang)",
      "🎨 Background variations",
      "🔐 Security hardening (CSP, rate limit)",
      "🔍 SEO optimized (JSON-LD, sitemap)",
      "📱 PWA ready (disabled temporarily)",
    ],
    badge: "STABLE",
    color: "from-rose-500 to-pink-600",
  },
];

export function VersionSwitcher() {
  const { appVersion, setAppVersion } = useAppStore();
  const [open, setOpen] = useState(false);
  const current = VERSIONS.find((v) => v.id === appVersion) ?? VERSIONS[0];

  return (
    <div className="fixed bottom-5 left-5 z-[80] flex flex-col items-start gap-2">
      {/* Expanded panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="w-80 overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-soft-pink"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-pink-600 to-rose-500 px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    App Version
                  </div>
                  <div className="text-sm font-bold">Pilih versi UI</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 hover:bg-white/30"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Version list */}
            <div className="p-2">
              {VERSIONS.map((v) => {
                const active = appVersion === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      setAppVersion(v.id);
                      setOpen(false);
                      // Reload to apply version changes
                      setTimeout(() => window.location.reload(), 200);
                    }}
                    className={cn(
                      "relative w-full rounded-2xl p-3 text-left transition-colors",
                      active ? "bg-pink-50" : "hover:bg-pink-50/60",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm",
                          v.color,
                        )}
                      >
                        {v.id === "v2.0.0" ? (
                          <Sparkles className="h-5 w-5" />
                        ) : (
                          <History className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-display text-sm font-bold text-pink-950">
                            {v.label}
                          </span>
                          {v.badge && (
                            <span
                              className={cn(
                                "rounded-full px-1.5 py-0.5 text-[9px] font-bold",
                                v.badge === "LATEST"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-amber-100 text-amber-700",
                              )}
                            >
                              {v.badge}
                            </span>
                          )}
                          {active && (
                            <span className="rounded-full bg-pink-600 px-1.5 py-0.5 text-[9px] font-bold text-white">
                              AKTIF
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 text-[11px] leading-snug text-pink-950/60">
                          {v.desc}
                        </div>
                        <ul className="mt-1.5 space-y-0.5">
                          {v.features.slice(0, 3).map((f) => (
                            <li key={f} className="text-[10px] text-pink-950/55">
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {active && (
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-500 text-white">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-pink-100 px-4 py-2 text-center text-[10px] text-pink-950/45">
              💡 Switch version akan reload halaman untuk apply changes
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 rounded-full bg-white py-2.5 pl-2.5 pr-4 shadow-soft-pink ring-1 ring-pink-200"
        aria-label="Buka version switcher"
      >
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-white",
            current.color,
          )}
        >
          <GitBranch className="h-4 w-4" />
        </div>
        <span className="font-mono text-xs font-bold text-pink-950">{current.label}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }}>
          <ChevronUp className="h-3.5 w-3.5 text-pink-950/50" />
        </motion.div>
      </motion.button>
    </div>
  );
}
