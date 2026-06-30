import { describe, it, expect } from "vitest";
import { sanitizeText, normalizePhone, isValidEmail, escapeHtml, generateSecureToken, generateBookingCode } from "@/lib/security";

describe("Security Utilities", () => {
  describe("sanitizeText", () => {
    it("should strip HTML tags", () => {
      expect(sanitizeText("<script>alert(1)</script>")).toBe("alert(1)");
      expect(sanitizeText("<b>hello</b>")).toBe("hello");
    });

    it("should strip javascript: URIs", () => {
      expect(sanitizeText("javascript:alert(1)")).toBe("alert(1)");
    });

    it("should strip onX= event handlers", () => {
      expect(sanitizeText('onclick=alert(1)')).toBe("alert(1)");
      expect(sanitizeText('onload=evil()')).toBe("evil()");
    });

    it("should trim and collapse whitespace", () => {
      expect(sanitizeText("  hello   world  ")).toBe("hello world");
    });

    it("should respect maxLength", () => {
      expect(sanitizeText("hello world", 5)).toBe("hello");
    });

    it("should handle empty input", () => {
      expect(sanitizeText("")).toBe("");
    });
  });

  describe("normalizePhone", () => {
    it("should normalize phone numbers", () => {
      expect(normalizePhone("0812-3456-7890")).toBe("081234567890");
      expect(normalizePhone("+62 812 3456 7890")).toBe("+6281234567890");
    });

    it("should return null for invalid phones", () => {
      expect(normalizePhone("123")).toBeNull();
      expect(normalizePhone("abcdefghijklmnop")).toBeNull();
    });

    it("should return null for too long phones", () => {
      expect(normalizePhone("123456789012345678901")).toBeNull();
    });

    it("should accept valid phones", () => {
      expect(normalizePhone("081234567890")).toBe("081234567890");
      expect(normalizePhone("+6281234567890")).toBe("+6281234567890");
    });
  });

  describe("isValidEmail", () => {
    it("should accept valid emails", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name@domain.co.id")).toBe(true);
    });

    it("should reject invalid emails", () => {
      expect(isValidEmail("notanemail")).toBe(false);
      expect(isValidEmail("@domain.com")).toBe(false);
      expect(isValidEmail("user@")).toBe(false);
      expect(isValidEmail("")).toBe(false);
    });
  });

  describe("escapeHtml", () => {
    it("should escape HTML special characters", () => {
      expect(escapeHtml("<script>")).toBe("&lt;script&gt;");
      expect(escapeHtml('"quote"')).toBe("&quot;quote&quot;");
      expect(escapeHtml("'single'")).toBe("&#x27;single&#x27;");
      expect(escapeHtml("&amp")).toBe("&amp;amp");
    });
  });

  describe("generateSecureToken", () => {
    it("should generate a hex string", () => {
      const token = generateSecureToken();
      expect(token).toMatch(/^[0-9a-f]+$/);
    });

    it("should generate correct length", () => {
      const token = generateSecureToken(16);
      expect(token.length).toBe(32); // 16 bytes = 32 hex chars
    });

    it("should generate unique tokens", () => {
      const t1 = generateSecureToken();
      const t2 = generateSecureToken();
      expect(t1).not.toBe(t2);
    });
  });

  describe("generateBookingCode", () => {
    it("should generate code with OMD- prefix", () => {
      const code = generateBookingCode();
      expect(code).toMatch(/^OMD-\d{8}-[A-F0-9]{4}$/);
    });
  });
});
