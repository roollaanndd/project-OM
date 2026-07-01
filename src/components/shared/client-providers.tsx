"use client";

import { useState, useEffect } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { useHasHydrated } from "@/lib/use-hydrated";
import { ThemeProvider } from "./theme-provider";
import { AccessibilityHelpers } from "./accessibility";
import { PlatformSwitcher } from "@/components/hub/platform-switcher";
import { VersionSwitcher } from "@/components/hub/version-switcher";

/**
 * Client-side providers wrapper.
 * Platform + Version switchers are collapsible (user can hide/show).
 */
export function ClientProviders({ children }: { children: React.ReactNode }) {
  const hydrated = useHasHydrated();
  const [switchersVisible, setSwitchersVisible] = useState(false);

  // Show switchers on Ctrl+Shift+P (developer shortcut)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault();
        setSwitchersVisible((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <AccessibilityHelpers />
      <ThemeProvider>{children}</ThemeProvider>
      {hydrated && switchersVisible && (
        <div className="fixed bottom-5 left-5 z-[80] flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Dev Tools</span>
            <button
              onClick={() => setSwitchersVisible(false)}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <PlatformSwitcher />
          <VersionSwitcher />
        </div>
      )}
      {/* Small toggle button — always visible but unobtrusive */}
      {hydrated && !switchersVisible && (
        <button
          onClick={() => setSwitchersVisible(true)}
          className="fixed bottom-2 right-2 z-[80] h-6 w-6 rounded-full bg-gray-200/50 text-[10px] text-gray-400 hover:bg-gray-300/50"
          aria-label="Show developer tools"
        />
      )}
    </LazyMotion>
  );
}
