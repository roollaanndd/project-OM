"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { useHasHydrated } from "@/lib/use-hydrated";
import { ThemeProvider } from "./theme-provider";
import { AccessibilityHelpers } from "./accessibility";
import { PlatformSwitcher } from "@/components/hub/platform-switcher";
import { VersionSwitcher } from "@/components/hub/version-switcher";

/**
 * Client-side providers wrapper.
 * Renders global UI elements (theme, a11y, platform switcher, version switcher)
 * only after Zustand store has hydrated from localStorage to prevent SSR mismatch.
 *
 * Uses LazyMotion for tree-shaking framer-motion (saves ~50KB gzipped).
 */
export function ClientProviders({ children }: { children: React.ReactNode }) {
  const hydrated = useHasHydrated();

  return (
    <LazyMotion features={domAnimation} strict>
      <AccessibilityHelpers />
      <ThemeProvider>{children}</ThemeProvider>
      {hydrated && <PlatformSwitcher />}
      {hydrated && <VersionSwitcher />}
    </LazyMotion>
  );
}
