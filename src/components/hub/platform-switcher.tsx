"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import {
  Globe,
  Smartphone,
  Monitor,
  LayoutDashboard,
  ChevronUp,
  X,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Platform = "website" | "app" | "kiosk" | "cms";

const PLATFORMS: {
  id: Platform;
  label: string;
  desc: string;
  icon: typeof Globe;
  color: string;
}[] = [
  {
    id: "website",
    label: "Website",
    desc: "Halaman marketing klinik",
    icon: Globe,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "app",
    label: "Mobile App",
    desc: "Aplikasi pasien (booking, rekam medis, bayar)",
    icon: Smartphone,
    color: "from-rose-500 to-fuchsia-600",
  },
  {
    id: "kiosk",
    label: "e-Kiosk",
    desc: "Self-service kiosk di klinik",
    icon: Monitor,
    color: "from-fuchsia-500 to-pink-600",
  },
  {
    id: "cms",
    label: "CMS Admin",
    desc: "Dashboard staff (login multi-role)",
    icon: LayoutDashboard,
    color: "from-pink-600 to-rose-700",
  },
];

export function PlatformSwitcher() {
  const { view, setView } = useAppStore();
  const [open, setOpen] = useState(false);

  const current = PLATFORMS.find((p) => p.id === view) ?? PLATFORMS[0];

  return (
    <>
      {/* Floating button — bottom right */}
      <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-2">
        {/* Expanded panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="w-72 overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-soft-pink"
            >
              {/* Header */}
              <div className="flex items-center justify-between bg-gradient-to-r from-pink-600 to-rose-500 px-4 py-3 text-white">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    OMDC Platform
                  </div>
                  <div className="text-sm font-bold">Pilih pengalaman</div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 hover:bg-white/30"
                  aria-label="Tutup"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Platform list */}
              <div className="p-2">
                {PLATFORMS.map((p) => {
                  const active = view === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setView(p.id);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition-colors",
                        active ? "bg-pink-50" : "hover:bg-pink-50/60",
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm",
                          p.color,
                        )}
                      >
                        <p.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-pink-950">{p.label}</span>
                          {active && (
                            <span className="rounded-full bg-pink-600 px-1.5 py-0.5 text-[9px] font-bold text-white">
                              AKTIF
                            </span>
                          )}
                        </div>
                        <div className="truncate text-[11px] text-pink-950/55">{p.desc}</div>
                      </div>
                      {!active && (
                        <ArrowRight className="h-4 w-4 shrink-0 text-pink-950/30" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Footer hint */}
              <div className="border-t border-pink-100 px-4 py-2 text-center text-[10px] text-pink-950/45">
                💡 Akses cepat semua platform dari sini
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 rounded-full bg-pink-950 py-2.5 pl-2.5 pr-4 text-white shadow-soft-pink"
          aria-label="Buka platform switcher"
        >
          <div className={cn("flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br", current.color)}>
            <current.icon className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold">{current.label}</span>
          <motion.div animate={{ rotate: open ? 180 : 0 }}>
            <ChevronUp className="h-3.5 w-3.5 text-white/70" />
          </motion.div>
        </motion.button>
      </div>
    </>
  );
}
