import { describe, it, expect, vi } from "vitest";
import { useFocusTrap, useAriaLive, useEscapeKey } from "@/lib/hooks/use-a11y";
import { renderHook } from "@testing-library/react";

describe("Accessibility Hooks", () => {
  describe("useAriaLive", () => {
    it("should return announce function", () => {
      const { result } = renderHook(() => useAriaLive());
      expect(typeof result.current.announce).toBe("function");
    });
  });

  describe("useEscapeKey", () => {
    it("should not call callback when inactive", () => {
      const callback = vi.fn();
      renderHook(() => useEscapeKey(callback, false));
      // Simulate escape key
      const event = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(event);
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe("useFocusTrap", () => {
    it("should be a function", () => {
      expect(typeof useFocusTrap).toBe("function");
    });
  });
});
