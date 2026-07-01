/**
 * OMDC Environment Configuration
 *
 * Centralized config that reads from environment variables.
 * Each platform (website, app, kiosk, cms) can have different settings.
 *
 * For separate deployment:
 * - Website:  NEXT_PUBLIC_APP_URL=https://omdc.id
 * - Mobile:   NEXT_PUBLIC_APP_URL=https://app.omdc.id
 * - Kiosk:    NEXT_PUBLIC_APP_URL=https://kiosk.omdc.id
 * - CMS:      NEXT_PUBLIC_APP_URL=https://admin.omdc.id
 *
 * All platforms share the same API:
 * - API:      NEXT_PUBLIC_API_URL=https://api.omdc.id
 */

export type Platform = "website" | "mobile-app" | "kiosk" | "cms" | "server";

interface AppConfig {
  // URLs
  appUrl: string;
  apiUrl: string;

  // Platform
  platform: Platform;

  // Features
  features: {
    auth: boolean;
    payment: boolean;
    notifications: boolean;
    offlineMode: boolean;
  };

  // API client
  api: {
    timeout: number;
    retries: number;
  };

  // Storage keys
  storage: {
    auth: string;
    store: string;
    cache: string;
  };

  // App info
  app: {
    name: string;
    version: string;
    environment: "development" | "production" | "test";
  };
}

function detectPlatform(): Platform {
  if (typeof window === "undefined") return "server";

  // Check Capacitor (native app)
  if (typeof (window as unknown as { capacitor?: unknown }).capacitor !== "undefined") {
    return "mobile-app";
  }

  const pathname = window.location.pathname;
  if (pathname.startsWith("/kiosk")) return "kiosk";
  if (pathname.startsWith("/app")) return "mobile-app";
  if (pathname.startsWith("/cms")) return "cms";

  // PWA standalone
  if (window.matchMedia("(display-mode: standalone)").matches) {
    return "mobile-app";
  }

  return "website";
}

export function getConfig(): AppConfig {
  const env = process.env.NODE_ENV ?? "development";

  return {
    appUrl:
      process.env.NEXT_PUBLIC_APP_URL ??
      (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"),
    apiUrl:
      process.env.NEXT_PUBLIC_API_URL ??
      process.env.NEXT_PUBLIC_APP_URL ??
      (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"),

    platform: detectPlatform(),

    features: {
      auth: process.env.NEXT_PUBLIC_AUTH_ENABLED === "true",
      payment: Boolean(process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY),
      notifications: Boolean(process.env.NEXT_PUBLIC_FCM_SERVER_KEY),
      offlineMode: true, // Always enabled — IndexedDB used when available
    },

    api: {
      timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT ?? "15000", 10),
      retries: parseInt(process.env.NEXT_PUBLIC_API_RETRIES ?? "3", 10),
    },

    storage: {
      auth: "omdc-auth-token",
      store: "omdc-store-v4",
      cache: "omdc-api-cache",
    },

    app: {
      name: "OMDC",
      version: "2.1.0",
      environment: env as "development" | "production" | "test",
    },
  };
}

/** Check if running in production */
export function isProduction(): boolean {
  return getConfig().app.environment === "production";
}

/** Check if running in Capacitor (native app shell) */
export function isNativeApp(): boolean {
  if (typeof window === "undefined") return false;
  return typeof (window as unknown as { capacitor?: unknown }).capacitor !== "undefined";
}

/** Check if running as installed PWA (standalone mode) */
export function isStandalonePWA(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}
