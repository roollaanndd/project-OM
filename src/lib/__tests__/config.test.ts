import { describe, it, expect } from "vitest";
import { getConfig, isProduction, isNativeApp, isStandalonePWA } from "@/lib/config";

describe("Config", () => {
  describe("getConfig", () => {
    it("should return config object", () => {
      const config = getConfig();
      expect(config).toBeDefined();
      expect(config.app).toBeDefined();
      expect(config.app.name).toBe("OMDC");
      expect(config.app.version).toBe("2.0.0");
    });

    it("should have storage keys", () => {
      const config = getConfig();
      expect(config.storage.auth).toBe("omdc-auth-token");
      expect(config.storage.store).toBe("omdc-store-v4");
    });

    it("should have API config", () => {
      const config = getConfig();
      expect(config.api.timeout).toBeGreaterThan(0);
      expect(config.api.retries).toBeGreaterThan(0);
    });

    it("should have features", () => {
      const config = getConfig();
      expect(config.features.offlineMode).toBe(true);
    });
  });

  describe("isProduction", () => {
    it("should return boolean", () => {
      expect(typeof isProduction()).toBe("boolean");
    });
  });

  describe("isNativeApp", () => {
    it("should return false in test environment", () => {
      expect(isNativeApp()).toBe(false);
    });
  });

  describe("isStandalonePWA", () => {
    it("should return false in test environment", () => {
      expect(isStandalonePWA()).toBe(false);
    });
  });
});
