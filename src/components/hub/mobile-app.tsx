"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { AppShell } from "@/components/mobile/app-shell";
import { Onboarding } from "@/components/mobile/screens/onboarding";
import { HomeScreen } from "@/components/mobile/screens/home";
import { BookingScreen } from "@/components/mobile/screens/booking";
import { RecordsScreen } from "@/components/mobile/screens/records";
import { PaymentsScreen } from "@/components/mobile/screens/payments";
import { ProfileScreen } from "@/components/mobile/screens/profile";

export function MobileApp() {
  const { isAuthenticated, activeTab } = useAppStore();

  return (
    <AppShell activeTab={isAuthenticated ? activeTab : "onboarding"}>
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Onboarding />
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="h-full"
          >
            {activeTab === "home" && <HomeScreen />}
            {activeTab === "booking" && <BookingScreen />}
            {activeTab === "records" && <RecordsScreen />}
            {activeTab === "payments" && <PaymentsScreen />}
            {activeTab === "profile" && <ProfileScreen />}
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
