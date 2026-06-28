"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { HubLauncher } from "@/components/hub/launcher";
import { WebsiteView } from "@/components/hub/website-view";
import { MobileApp } from "@/components/hub/mobile-app";
import { KioskApp } from "@/components/kiosk/kiosk-app";
import { CmsApp } from "@/components/cms/cms-app";

export default function Home() {
  const { view } = useAppStore();

  return (
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
  );
}
