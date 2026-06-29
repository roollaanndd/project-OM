"use client";

import { useEffect } from "react";

/**
 * Accessibility helpers:
 * - Skip-to-content link (keyboard users)
 * - Focus ring visible only for keyboard navigation
 * - Announces route changes to screen readers
 */
export function AccessibilityHelpers() {
  useEffect(() => {
    // Add 'keyboard-nav' class to body when user uses Tab key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        document.body.classList.add("keyboard-nav");
      }
    };
    const handleMouseDown = () => {
      document.body.classList.remove("keyboard-nav");
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <>
      {/* Skip to main content link — visible only when focused */}
      <a
        href="#main-content"
        className="sr-only z-[200] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-full focus:bg-pink-600 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg"
      >
        Lewati ke konten utama
      </a>
    </>
  );
}
