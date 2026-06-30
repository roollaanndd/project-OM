"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { AppShell } from "@/components/mobile/app-shell";
import { OnboardingScreen } from "@/components/mobile/screens/onboarding-slides";
import { Onboarding } from "@/components/mobile/screens/onboarding";
import { HomeScreen } from "@/components/mobile/screens/home";
import { BookingScreen } from "@/components/mobile/screens/booking";
import { RecordsScreen } from "@/components/mobile/screens/records";
import { PaymentsScreen } from "@/components/mobile/screens/payments";
import { ProfileScreen } from "@/components/mobile/screens/profile";

type AppStage = "onboarding" | "login" | "authenticated";

export function MobileApp() {
  const { isAuthenticated, activeTab, setActiveTab } = useAppStore();
  const [stage, setStage] = useState<AppStage>("onboarding");

  // Flow: onboarding slides → login screen → authenticated
  const currentStage: AppStage = isAuthenticated ? "authenticated" : stage;

  return (
    <AppShell activeTab={isAuthenticated ? activeTab : "onboarding"}>
      <AnimatePresence mode="wait">
        {currentStage === "onboarding" && (
          <m.div
            key="onboarding-slides"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <OnboardingScreen onComplete={() => setStage("login")} />
          </m.div>
        )}

        {currentStage === "login" && (
          <m.div
            key="login"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Onboarding />
          </m.div>
        )}

        {currentStage === "authenticated" && (
          <m.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="h-full"
          >
            {activeTab === "home" && <HomeScreen />}
            {activeTab === "booking" && <BookingScreen onComplete={() => setActiveTab("home")} onBack={() => setActiveTab("home")} />}
            {activeTab === "records" && <RecordsScreen />}
            {activeTab === "payments" && <PaymentsScreen />}
            {activeTab === "profile" && <ProfileScreen />}
          </m.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
