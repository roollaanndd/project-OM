/**
 * OMDC QR Code System
 *
 * Generates unique, tamper-proof QR codes for bookings and payments.
 * Each QR contains: { type, id, hash, timestamp, data }
 *
 * Flow:
 * 1. Booking created → generateQR("booking", bookingId, { service, doctor, date, time })
 * 2. QR displayed in app/email/website
 * 3. Kiosk scans QR → verifyQR() → fetch booking → instant check-in
 * 4. Payment: generateQR("payment", paymentId, { amount, method })
 * 5. CMS: scan QR → verifyQR() → pull up record
 *
 * Security:
 * - HMAC-SHA256 hash prevents tampering (can't forge QR with fake booking ID)
 * - Hash includes: type + id + timestamp + secret
 * - QR expires after 24 hours (configurable)
 */

import QRCode from "qrcode";
import { createHmac, timingSafeEqual } from "crypto";

// ============ Types ============

export type QRType = "booking" | "payment" | "patient" | "queue";

export interface QRPayload {
  /** QR format version */
  v: 1;
  /** What this QR represents */
  type: QRType;
  /** Unique ID (booking ID, payment ID, etc.) */
  id: string;
  /** Human-readable code (e.g., "OMD-20250615-A3F2") */
  code: string;
  /** Unix timestamp when QR was generated */
  ts: number;
  /** HMAC-SHA256 hash for tamper prevention */
  hash: string;
  /** Optional embedded data for offline use */
  data?: {
    service?: string;
    doctor?: string;
    date?: string;
    time?: string;
    patientName?: string;
    amount?: number;
    branch?: string;
  };
}

export interface QRVerifyResult {
  valid: boolean;
  payload: QRPayload | null;
  expired: boolean;
  error?: string;
}

// ============ Configuration ============

const QR_SECRET = process.env.NEXTAUTH_SECRET ?? process.env.QR_SECRET ?? "omdc-qr-secret-dev-only";
const QR_EXPIRY_HOURS = 24; // QR codes valid for 24 hours

// ============ Hash Generation ============

function generateHash(type: QRType, id: string, code: string, timestamp: number): string {
  const payload = `${type}:${id}:${code}:${timestamp}`;
  return createHmac("sha256", QR_SECRET).update(payload).digest("hex");
}

function verifyHash(type: QRType, id: string, code: string, timestamp: number, hash: string): boolean {
  const expectedHash = generateHash(type, id, code, timestamp);
  try {
    return timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(expectedHash, "hex"));
  } catch {
    return false;
  }
}

// ============ Public API ============

/**
 * Generate a QR code payload and return as data URL.
 * Use this when you need to display a QR code image.
 */
export async function generateQR(
  type: QRType,
  id: string,
  code: string,
  data?: QRPayload["data"],
): Promise<{ payload: QRPayload; dataUrl: string }> {
  const timestamp = Date.now();
  const hash = generateHash(type, id, code, timestamp);

  const payload: QRPayload = {
    v: 1,
    type,
    id,
    code,
    ts: timestamp,
    hash,
    data,
  };

  // Generate QR code as data URL (PNG)
  const qrString = JSON.stringify(payload);
  const dataUrl = await QRCode.toDataURL(qrString, {
    width: 300,
    margin: 2,
    color: {
      dark: "#9D174D", // OMDC brand pink
      light: "#FFFFFF",
    },
    errorCorrectionLevel: "M",
  });

  return { payload, dataUrl };
}

/**
 * Generate a QR code as SVG string (for print/inline display).
 */
export async function generateQRSvg(
  type: QRType,
  id: string,
  code: string,
  data?: QRPayload["data"],
): Promise<{ payload: QRPayload; svg: string }> {
  const timestamp = Date.now();
  const hash = generateHash(type, id, code, timestamp);

  const payload: QRPayload = {
    v: 1,
    type,
    id,
    code,
    ts: timestamp,
    hash,
    data,
  };

  const qrString = JSON.stringify(payload);
  const svg = await QRCode.toString(qrString, {
    type: "svg",
    margin: 2,
    color: {
      dark: "#9D174D",
      light: "#FFFFFF00", // transparent background
    },
    errorCorrectionLevel: "M",
  });

  return { payload, svg };
}

/**
 * Verify a scanned QR code payload.
 * Checks: format, hash integrity, expiry.
 */
export function verifyQR(qrString: string): QRVerifyResult {
  try {
    const payload = JSON.parse(qrString) as QRPayload;

    // Validate format
    if (!payload.v || payload.v !== 1) {
      return { valid: false, payload: null, expired: false, error: "Invalid QR version" };
    }
    if (!payload.type || !payload.id || !payload.code || !payload.hash) {
      return { valid: false, payload: null, expired: false, error: "Missing required fields" };
    }

    // Verify hash
    const hashValid = verifyHash(payload.type, payload.id, payload.code, payload.ts, payload.hash);
    if (!hashValid) {
      return { valid: false, payload: null, expired: false, error: "Invalid QR — hash mismatch (possible tampering)" };
    }

    // Check expiry
    const ageHours = (Date.now() - payload.ts) / (1000 * 60 * 60);
    const expired = ageHours > QR_EXPIRY_HOURS;
    if (expired) {
      return { valid: false, payload, expired: true, error: `QR expired (${Math.round(ageHours)}h old, max ${QR_EXPIRY_HOURS}h)` };
    }

    return { valid: true, payload, expired: false };
  } catch (err) {
    return { valid: false, payload: null, expired: false, error: "Invalid QR format — not a valid OMDC QR code" };
  }
}

/**
 * Generate a human-readable booking code.
 * Format: OMD-YYYYMMDD-XXXX (4 random hex chars)
 */
export function generateBookingCode(): string {
  const date = new Date();
  const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(16).toUpperCase().substring(2, 6);
  return `OMD-${ymd}-${rand}`;
}

/**
 * Generate a payment invoice ID.
 * Format: INV/YYYY/MM/XXXXXX
 */
export function generateInvoiceId(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const rand = String(Date.now()).slice(-6);
  return `INV/${year}/${month}/${rand}`;
}
