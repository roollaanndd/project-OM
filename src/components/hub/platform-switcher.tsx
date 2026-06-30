"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
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
  route: string;
}[] = [
  {
    id: "website",
    label: "Website",
    desc: "Halaman marketing klinik",
    icon: Globe,
    color: "from-pink-500 to-rose-500",
    route: "/",
  },
  {
    id: "app",
    label: "Mobile App",
    desc: "Aplikasi pasien (booking, rekam medis, bayar)",
    icon: Smartphone,
    color: "from-rose-500 to-fuchsia-600",
    route: "/app",
  },
  {
    id: "kiosk",
    label: "e-Kiosk",
    desc: "Self-service kiosk di klinik",
    icon: Monitor,
    color: "from-fuchsia-500 to-pink-600",
    route: "/kiosk",
  },
  {
    id: "cms",
    label: "CMS Admin",
    desc: "Dashboard staff (login multi-role)",
    icon: LayoutDashboard,
    color: "from-pink-600 to-rose-700",
    route: "/cms",
  },
];

export function PlatformSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Determine current platform from URL
  const currentPlatform: Platform = pathname.startsWith("/app")
    ? "app"
    : pathname.startsWith("/kiosk")
      ? "kiosk"
      : pathname.startsWith("/cms")
        ? "cms"
        : "website";

  const current = PLATFORMS.find((p) => p.id === currentPlatform) ?? PLATFORMS[0];

  // Hide on kiosk and CMS (full-screen experiences)
  if (currentPlatform === "kiosk" || currentPlatform === "cms") {
    return null;
  }

  const handleSwitch = (platform: Platform) => {
    const target = PLATFORMS.find((p) => p.id === platform);
    if (target) {
      router.push(target.route);
      setOpen(false);
    }
  };

  return (
    <>
      {/* Floating button — bottom right */}
      <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-2">
        {/* Expanded panel */}
        <AnimatePresence>
          {open && (
            <m.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="w-72 overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-soft-pink dark:border-pink-800 dark:bg-pink-950"
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
                  const active = currentPlatform === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSwitch(p.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition-colors",
                        active ? "bg-pink-50 dark:bg-pink-900/40" : "hover:bg-pink-50/60 dark:hover:bg-pink-900/20",
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
                          <span className="text-sm font-bold text-pink-950 dark:text-pink-100">{p.label}</span>
                          {active && (
                            <span className="rounded-full bg-pink-600 px-1.5 py-0.5 text-[9px] font-bold text-white">
                              AKTIF
                            </span>
                          )}
                        </div>
                        <div className="truncate text-[11px] text-pink-950/55 dark:text-pink-200/60">{p.desc}</div>
                      </div>
                      {!active && (
                        <ArrowRight className="h-4 w-4 shrink-0 text-pink-950/30 dark:text-pink-200/30" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Footer hint */}
              <div className="border-t border-pink-100 px-4 py-2 text-center text-[10px] text-pink-950/45 dark:border-pink-900/40 dark:text-pink-200/40">
                💡 Akses cepat semua platform dari sini
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <m.button
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
          <m.div animate={{ rotate: open ? 180 : 0 }}>
            <ChevronUp className="h-3.5 w-3.5 text-white/70" />
          </m.div>
        </m.button>
      </div>
    </>
  );
}
