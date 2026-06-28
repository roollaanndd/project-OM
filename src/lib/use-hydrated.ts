"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/app-store";

/**
 * Hook to check if the Zustand persist store has hydrated from localStorage.
 *
 * Because we use `skipHydration: true` in the persist config (to prevent SSR
 * hydration mismatches), this hook manually triggers rehydration on mount
 * and returns `true` once it's complete.
 *
 * Pattern:
 * ```tsx
 * const hydrated = useHasHydrated();
 * if (!hydrated) return <LoadingSpinner />;
 * return <ActualContent />;
 * ```
 */
export function useHasHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Manually trigger hydration since skipHydration is true
    useAppStore.persist.rehydrate();

    const unsub = useAppStore.persist.onFinishHydration(() => {
      Promise.resolve().then(() => setHydrated(true));
    });

    // If already hydrated (sync), set immediately via microtask
    if (useAppStore.persist.hasHydrated()) {
      Promise.resolve().then(() => setHydrated(true));
    }

    return unsub;
  }, []);

  return hydrated;
}
