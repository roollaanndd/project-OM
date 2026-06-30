import { describe, it, expect } from "vitest";
import { generateBookingCode, generateInvoiceId } from "@/lib/qr-system";

describe("QR System", () => {
  describe("generateBookingCode", () => {
    it("should generate code with OMD- prefix", () => {
      const code = generateBookingCode();
      expect(code).toMatch(/^OMD-\d{8}-[A-F0-9]{4}$/);
    });

    it("should generate unique codes", () => {
      const codes = new Set<string>();
      for (let i = 0; i < 100; i++) {
        codes.add(generateBookingCode());
      }
      // At least 90% should be unique (4 hex chars = 65536 possible)
      expect(codes.size).toBeGreaterThan(90);
    });

    it("should include current date in code", () => {
      const code = generateBookingCode();
      const today = new Date();
      const ymd = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
      expect(code).toContain(ymd);
    });
  });

  describe("generateInvoiceId", () => {
    it("should generate invoice with INV/ prefix", () => {
      const id = generateInvoiceId();
      expect(id).toMatch(/^INV\/\d{4}\/\d{2}\/\d{6}$/);
    });

    it("should include current year and month", () => {
      const id = generateInvoiceId();
      const now = new Date();
      expect(id).toContain(String(now.getFullYear()));
      expect(id).toContain(String(now.getMonth() + 1).padStart(2, "0"));
    });

    it("should generate unique invoice IDs", async () => {
      const ids = new Set<string>();
      for (let i = 0; i < 50; i++) {
        ids.add(generateInvoiceId());
        // Small delay to ensure different timestamps
        await new Promise((r) => setTimeout(r, 1));
      }
      expect(ids.size).toBeGreaterThan(10);
    });
  });
});
