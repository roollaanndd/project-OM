/**
 * Security utilities for input sanitization, output encoding, and helpers.
 */

// ============ Input sanitization ============

/**
 * Strip HTML tags and dangerous characters from user input.
 * Use for free-text fields that will be displayed back to users.
 */
export function sanitizeText(input: string, maxLength = 1000): string {
  return input
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/[<>]/g, "") // strip remaining angle brackets
    .replace(/javascript:/gi, "") // strip javascript: URIs
    .replace(/on\w+\s*=/gi, "") // strip onX= event handlers
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

/**
 * Validate and normalize phone number.
 * Returns null if invalid.
 */
export function normalizePhone(phone: string): string | null {
  const cleaned = phone.replace(/[^\d+]/g, "");
  if (cleaned.length < 8 || cleaned.length > 20) return null;
  if (!/^\+?\d{8,20}$/.test(cleaned)) return null;
  return cleaned;
}

/**
 * Validate email format.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 150;
}

// ============ Output encoding (XSS prevention) ============

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
};

/**
 * Escape HTML special characters. Use when rendering untrusted text in HTML context.
 */
export function escapeHtml(str: string): string {
  return str.replace(/[&<>"'/]/g, (c) => HTML_ENTITIES[c] ?? c);
}

/**
 * Escape string for use inside JavaScript string literals.
 */
export function escapeJsString(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

// ============ Token generators ============

/**
 * Generate a cryptographically secure random token.
 * Uses Web Crypto API (available in Node 19+ and all modern browsers).
 */
export function generateSecureToken(lengthBytes = 32): string {
  const bytes = new Uint8Array(lengthBytes);
  if (typeof globalThis.crypto?.getRandomValues === "function") {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    // Fallback for older environments
    for (let i = 0; i < lengthBytes; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Generate a booking code (human-readable but unique).
 * Format: OMD-YYYYMMDD-XXXX (4 random chars)
 */
export function generateBookingCode(): string {
  const date = new Date();
  const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const rand = generateSecureToken(2).toUpperCase().slice(0, 4);
  return `OMD-${ymd}-${rand}`;
}

// ============ Password hashing (for future auth) ============

/**
 * Hash a password using PBKDF2 via Web Crypto API.
 * Returns "algorithm:iterations:salt:hash" all hex-encoded.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = generateSecureToken(16);
  const iterations = 100_000;
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: encoder.encode(salt), iterations, hash: "SHA-256" },
    keyMaterial,
    256,
  );
  const hash = Array.from(new Uint8Array(bits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `pbkdf2:${iterations}:${salt}:${hash}`;
}

/**
 * Verify a password against a stored hash.
 */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  try {
    const [algo, iterStr, salt, expectedHash] = stored.split(":");
    if (algo !== "pbkdf2") return false;
    const iterations = parseInt(iterStr, 10);
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveBits"],
    );
    const bits = await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt: encoder.encode(salt), iterations, hash: "SHA-256" },
      keyMaterial,
      256,
    );
    const actualHash = Array.from(new Uint8Array(bits))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return actualHash === expectedHash;
  } catch {
    return false;
  }
}

// ============ Audit logging ============

export type AuditAction =
  | "booking.create"
  | "booking.cancel"
  | "payment.create"
  | "payment.success"
  | "payment.fail"
  | "auth.login"
  | "auth.logout"
  | "auth.failed"
  | "user.create"
  | "user.update"
  | "user.delete"
  | "queue.call"
  | "queue.complete"
  | "queue.skip"
  | "cms.settings.update"
  | "cms.doctor.update";

/**
 * Write an audit log entry. In production, route to a dedicated log service
 * (Sentry, Datadog, or a separate audit table). In development, use console.
 */
export function auditLog(action: AuditAction, meta: Record<string, unknown> = {}): void {
  const entry = {
    timestamp: new Date().toISOString(),
    action,
    ...meta,
  };
  // Never include raw PII in logs — sanitize first
  if (process.env.NODE_ENV === "production") {
    // Production: structured logging to stdout (parseable by log aggregators)
    // When Sentry/Datadog is configured, replace with their SDK calls
    if (typeof window === "undefined") {
      process.stdout.write(JSON.stringify({ level: "audit", ...entry }) + "\n");
    }
  } else {
    // Development: human-readable console output
    console.log(`[audit] ${action}`, meta);
  }
}
