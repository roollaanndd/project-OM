"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import type { ScreenTab } from "./types";
import { Home, CalendarPlus, FileText, CreditCard, User } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS: { id: ScreenTab; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Beranda", icon: Home },
  { id: "booking", label: "Booking", icon: CalendarPlus },
  { id: "records", label: "Rekam", icon: FileText },
  { id: "payments", label: "Bayar", icon: CreditCard },
  { id: "profile", label: "Profil", icon: User },
];

export function BottomNav() {
  const { activeTab, setActiveTab, bills } = useAppStore();
  const unpaidCount = bills.filter((b) => b.status !== "paid").length;

  return (
    <div className="absolute inset-x-0 bottom-0 z-30">
      {/* Subtle top fade */}
      <div className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-pink-50/95 to-transparent" />

      <nav className="relative border-t border-pink-100 bg-white/95 backdrop-blur-xl px-2 pb-[max(env(safe-area-inset-bottom),12px)] pt-2">
        <ul className="flex items-center justify-between">
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <li key={tab.id} className="flex-1">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className="group relative flex w-full flex-col items-center gap-1 py-1.5"
                  aria-label={tab.label}
                  aria-current={active ? "page" : undefined}
                >
                  {/* Active background pill */}
                  <AnimatePresence>
                    {active && (
                      <motion.div
                        layoutId="tab-pill"
                        className="absolute -top-0.5 h-9 w-14 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="relative">
                    <tab.icon
                      className={cn(
                        "h-[22px] w-[22px] transition-colors",
                        active ? "text-pink-700" : "text-pink-950/40",
                      )}
                      strokeWidth={active ? 2.4 : 2}
                    />
                    {/* Notification badge */}
                    {tab.id === "payments" && unpaidCount > 0 && (
                      <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                        {unpaidCount}
                      </span>
                    )}
                  </div>

                  <span
                    className={cn(
                      "relative text-[10px] font-semibold transition-colors",
                      active ? "text-pink-700" : "text-pink-950/45",
                    )}
                  >
                    {tab.label}
                  </span>

                  {/* Active indicator dot */}
                  <AnimatePresence>
                    {active && (
                      <motion.div
                        className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-pink-600"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      />
                    )}
                  </AnimatePresence>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
