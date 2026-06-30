"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { StatusBar } from "./status-bar";
import { BottomNav } from "./bottom-nav";

/**
 * Mobile app shell — full-screen, no phone frame mockup.
 * Clean, MIKA-inspired: white bg, no device chrome.
 */
export function AppShell({
  children,
  activeTab,
}: {
  children: ReactNode;
  activeTab: string;
}) {
  const { isAuthenticated } = useAppStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => setHydrated(true));
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-pink-600" />
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-white">
      <StatusBar />

      {/* Scrollable content */}
      <div className="relative flex-1 overflow-y-auto overflow-x-hidden pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + (isAuthenticated ? "-auth" : "-guest")}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="min-h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom nav (only when authenticated) */}
      {isAuthenticated && <BottomNav />}
    </div>
  );
}
