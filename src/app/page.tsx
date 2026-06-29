"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { useHasHydrated } from "@/lib/use-hydrated";
import { HubLauncher } from "@/components/hub/launcher";
import { WebsiteView } from "@/components/hub/website-view";
import { MobileApp } from "@/components/hub/mobile-app";
import { KioskApp } from "@/components/kiosk/kiosk-app";
import { CmsApp } from "@/components/cms/cms-app";
import { PlatformSwitcher } from "@/components/hub/platform-switcher";
import { VersionSwitcher } from "@/components/hub/version-switcher";

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div
            className="absolute inset-0 rounded-full border-2 border-pink-400/40"
            style={{ animation: "pwa-ping 1.8s ease-out infinite" }}
          />
          <div
            className="absolute inset-0 rounded-full border-2 border-pink-400/40"
            style={{ animation: "pwa-ping 1.8s ease-out 0.5s infinite" }}
          />
          <svg viewBox="0 0 96 96" className="h-16 w-16">
            <defs>
              <linearGradient id="load-shield" x1="0" y1="0" x2="96" y2="96">
                <stop stopColor="#9D174D" />
                <stop offset="0.5" stopColor="#DB2777" />
                <stop offset="1" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <path d="M48 4l36 12v28c0 24-16 40-36 48C28 84 12 68 12 44V16L48 4z" fill="url(#load-shield)" />
            <path d="M48 24c-7 0-10 2.8-15 2.8-4 0-8 2-8 9.2 0 8 2.8 12 5 18.8 1.6 5.2 2.8 14.8 7.2 14.8 4 0 4.4-7 6-12 1.2-3.6 2.2-5.6 7-5.6s5.8 2 7 5.6c1.6 5 2 12 6 12 4.4 0 5.6-9.6 7.2-14.8C67 48 69.8 44 69.8 36c0-7.2-4-9.2-8-9.2-5 0-8-2.8-15-2.8z" fill="#FFFFFF" />
          </svg>
        </div>
        <p
          className="text-xs font-medium text-pink-700"
          style={{ animation: "pwa-fade 1.6s ease-in-out infinite" }}
        >
          Memuat…
        </p>
      </div>
      <style>{`
        @keyframes pwa-ping {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes pwa-fade {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const { view } = useAppStore();
  const hydrated = useHasHydrated();

  // Don't render anything until the store has hydrated from localStorage.
  // This prevents hydration mismatches between server and client.
  if (!hydrated) {
    return <LoadingScreen />;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {view === "hub" && (
          <motion.div
            key="hub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HubLauncher />
          </motion.div>
        )}

        {view === "website" && (
          <motion.div
            key="website"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <WebsiteView />
          </motion.div>
        )}

        {view === "app" && (
          <motion.div
            key="app"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <MobileApp />
          </motion.div>
        )}

        {view === "kiosk" && (
          <motion.div
            key="kiosk"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <KioskApp />
          </motion.div>
        )}

        {view === "cms" && (
          <motion.div
            key="cms"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CmsApp />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global platform switcher — available on all views except CMS login & Kiosk */}
      {view !== "kiosk" && view !== "cms" && <PlatformSwitcher />}

      {/* Version switcher with rollback capability */}
      {view !== "kiosk" && view !== "cms" && <VersionSwitcher />}
    </>
  );
}
