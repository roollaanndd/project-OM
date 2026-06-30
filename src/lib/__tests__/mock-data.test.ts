import { describe, it, expect } from "vitest";
import { formatCurrency, formatDate, formatDateShort, getGreeting } from "@/components/mobile/mock-data";

describe("Mock Data Utilities", () => {
  describe("formatCurrency", () => {
    it("should format IDR currency", () => {
      const result = formatCurrency(250000);
      expect(result).toContain("250");
      expect(result).toContain("000");
    });

    it("should handle zero", () => {
      const result = formatCurrency(0);
      expect(result).toContain("0");
    });

    it("should handle large numbers", () => {
      const result = formatCurrency(18000000);
      expect(result).toContain("18");
    });
  });

  describe("formatDate", () => {
    it("should format date in Indonesian", () => {
      const result = formatDate("2025-06-15");
      expect(result).toContain("2025");
      expect(result).toContain("Juni");
    });

    it("should handle custom options", () => {
      const result = formatDate("2025-06-15", { day: "numeric", month: "short" });
      expect(result).toContain("15");
      expect(result).toContain("Jun");
    });
  });

  describe("formatDateShort", () => {
    it("should format date shortly", () => {
      const result = formatDateShort("2025-06-15");
      expect(result).toContain("15");
      expect(result).toContain("Jun");
    });
  });

  describe("getGreeting", () => {
    it("should return morning greeting before 11", () => {
      // Mock Date
      const realDate = Date;
      const mockDate = new Date("2025-06-15T08:00:00");
      global.Date = class extends realDate {
        constructor() {
          super();
          return mockDate;
        }
      } as any;

      const greeting = getGreeting();
      expect(greeting.text).toContain("Pagi");

      global.Date = realDate;
    });
  });
});
