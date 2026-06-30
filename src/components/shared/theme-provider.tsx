"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/app-store";

/**
 * Applies the theme from the global store to <html> element.
 * Must be rendered once at the root layout level.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return <>{children}</>;
}
