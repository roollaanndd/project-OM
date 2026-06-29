import { z } from "zod";

/**
 * Environment variable validation.
 * Throws at startup if required vars are missing or malformed in production.
 */

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  // App
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url()
    .default("http://localhost:3000"),

  // Auth (NextAuth) — required only when AUTH_ENABLED=true
  AUTH_ENABLED: z
    .string()
    .optional()
    .transform((v) => v === "true")
    .default("false"),
  NEXTAUTH_SECRET: z.string().optional(),
  NEXTAUTH_URL: z.string().url().optional(),

  // Payment gateway (Midtrans) — optional, only required for real payments
  MIDTRANS_SERVER_KEY: z.string().optional(),
  MIDTRANS_CLIENT_KEY: z.string().optional(),
  MIDTRANS_IS_PRODUCTION: z
    .string()
    .optional()
    .transform((v) => v === "true")
    .default("false"),

  // Notifications (FCM) — optional
  FCM_SERVER_KEY: z.string().optional(),

  // Error tracking (Sentry) — optional
  SENTRY_DSN: z.string().optional(),

  // WhatsApp Business API — optional
  WA_API_TOKEN: z.string().optional(),
  WA_PHONE_ID: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

let _env: Env | null = null;

export function getEnv(): Env {
  if (_env) return _env;

  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    if (process.env.NODE_ENV === "production") {
      console.error("❌ Invalid environment variables:");
      parsed.error.issues.forEach((i) => console.error(`  - ${i.path.join(".")}: ${i.message}`));
      throw new Error("Invalid environment configuration. See logs above.");
    }
    // In dev, fall back to defaults with warnings
    console.warn("⚠️ Some environment variables are missing (dev mode, using defaults):");
    parsed.error.issues.forEach((i) =>
      console.warn(`  - ${i.path.join(".")}: ${i.message}`),
    );
    _env = envSchema.parse({
      ...process.env,
      DATABASE_URL: process.env.DATABASE_URL ?? "file:./db/custom.db",
      NODE_ENV: process.env.NODE_ENV ?? "development",
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    });
    return _env;
  }

  _env = parsed.data;
  return _env;
}

/**
 * Check if a feature flag is enabled.
 */
export function isFeatureEnabled(flag: "auth" | "payment" | "notifications"): boolean {
  const env = getEnv();
  switch (flag) {
    case "auth":
      return env.AUTH_ENABLED;
    case "payment":
      return Boolean(env.MIDTRANS_SERVER_KEY && env.MIDTRANS_CLIENT_KEY);
    case "notifications":
      return Boolean(env.FCM_SERVER_KEY);
    default:
      return false;
  }
}
