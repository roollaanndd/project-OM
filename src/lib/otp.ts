/**
 * OTP (One-Time Password) System for OMDC
 *
 * Flow:
 * 1. User fills booking form → clicks "Kirim Kode Verifikasi"
 * 2. Backend generates 4-digit OTP, sends via WhatsApp (or email)
 * 3. User enters OTP → backend verifies
 * 4. If valid → booking is confirmed and saved to DB
 *
 * Storage: In-memory (Map) with 5-minute expiry.
 * In production: use Redis or database table.
 */

// ============ In-memory OTP store ============
// Key: phone or email, Value: { code, expiresAt, attempts }
const otpStore = new Map<string, { code: string; expiresAt: number; attempts: number }>();

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const OTP_MAX_ATTEMPTS = 3;

// ============ Generate OTP ============

export function generateOTP(): string {
  // 4-digit numeric OTP
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// ============ Send OTP ============

export interface SendOTPResult {
  ok: boolean;
  method: "whatsapp" | "email";
  message: string;
  debugCode?: string; // Only in development
}

export async function sendOTP(
  identifier: string,
  method: "whatsapp" | "email",
): Promise<SendOTPResult> {
  const code = generateOTP();
  const key = `${method}:${identifier}`;

  // Store OTP
  otpStore.set(key, {
    code,
    expiresAt: Date.now() + OTP_EXPIRY_MS,
    attempts: 0,
  });

  // Send via WhatsApp or Email
  if (method === "whatsapp") {
    // In production: call WhatsApp Business API
    // For now: log to console (development mode)
    if (process.env.NODE_ENV !== "production") {
      console.log(`[OTP] WhatsApp to ${identifier}: Your OMDC verification code is ${code}`);
    }

    // TODO: Real WhatsApp API integration
    // await sendWhatsAppMessage(identifier, `Kode verifikasi OMDC Anda: ${code}. Berlaku 5 menit.`)

    return {
      ok: true,
      method: "whatsapp",
      message: `Kode verifikasi telah dikirim ke WhatsApp ${identifier}`,
      debugCode: process.env.NODE_ENV !== "production" ? code : undefined,
    };
  } else {
    // Email
    if (process.env.NODE_ENV !== "production") {
      console.log(`[OTP] Email to ${identifier}: Your OMDC verification code is ${code}`);
    }

    // TODO: Real email integration
    // await sendEmail(identifier, "Kode Verifikasi OMDC", `Kode verifikasi Anda: ${code}`)

    return {
      ok: true,
      method: "email",
      message: `Kode verifikasi telah dikirim ke email ${identifier}`,
      debugCode: process.env.NODE_ENV !== "production" ? code : undefined,
    };
  }
}

// ============ Verify OTP ============

export interface VerifyOTPResult {
  ok: boolean;
  message: string;
}

export function verifyOTP(
  identifier: string,
  method: "whatsapp" | "email",
  inputCode: string,
): VerifyOTPResult {
  const key = `${method}:${identifier}`;
  const stored = otpStore.get(key);

  if (!stored) {
    return { ok: false, message: "Kode belum dikirim atau sudah kedaluwarsa. Silakan kirim ulang." };
  }

  // Check expiry
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(key);
    return { ok: false, message: "Kode telah kedaluwarsa. Silakan kirim ulang." };
  }

  // Check attempts
  if (stored.attempts >= OTP_MAX_ATTEMPTS) {
    otpStore.delete(key);
    return { ok: false, message: "Terlalu banyak percobaan salah. Silakan kirim ulang kode." };
  }

  // Verify code
  if (stored.code !== inputCode) {
    stored.attempts++;
    const remaining = OTP_MAX_ATTEMPTS - stored.attempts;
    return {
      ok: false,
      message: `Kode salah. Sisa percobaan: ${remaining}x.`,
    };
  }

  // Success — clean up
  otpStore.delete(key);
  return { ok: true, message: "Verifikasi berhasil!" };
}

// ============ Cleanup expired OTPs ============

// Run cleanup every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of otpStore.entries()) {
      if (now > value.expiresAt) {
        otpStore.delete(key);
      }
    }
  }, 5 * 60 * 1000).unref?.();
}
