"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Focus trap hook for modal/drawer/dialog accessibility.
 * Prevents keyboard focus from leaving the container while open.
 */
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  isActive: boolean,
) {
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    const container = containerRef.current;
    return Array.from(
      container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => {
      const style = window.getComputedStyle(el);
      return style.display !== "none" && style.visibility !== "hidden" && el.offsetWidth > 0;
    });
  }, [containerRef]);

  useEffect(() => {
    if (!isActive) return;

    previouslyFocused.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first || !containerRef.current?.contains(document.activeElement)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last || !containerRef.current?.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const focusable = getFocusableElements();
    if (focusable.length > 0) {
      setTimeout(() => focusable[0].focus(), 50);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused.current) {
        previouslyFocused.current.focus();
      }
    };
  }, [isActive, getFocusableElements, containerRef]);
}

/**
 * ARIA live region announcer for screen readers.
 */
export function useAriaLive() {
  const announce = useCallback((message: string, assertive = false) => {
    const liveRegion = document.getElementById("aria-live-region");
    if (liveRegion) {
      liveRegion.setAttribute("aria-live", assertive ? "assertive" : "polite");
      liveRegion.textContent = message;
      setTimeout(() => {
        if (liveRegion) liveRegion.textContent = "";
      }, 3000);
    }
  }, []);
  return { announce };
}

/**
 * Escape key handler hook.
 */
export function useEscapeKey(callback: () => void, isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") callback();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [callback, isActive]);
}
