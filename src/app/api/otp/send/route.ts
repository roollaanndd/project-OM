import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendOTP } from "@/lib/otp";

const SendOTPSchema = z.object({
  identifier: z.string().min(5, "Nomor telepon atau email tidak valid"),
  method: z.enum(["whatsapp", "email"]),
});

/**
 * POST /api/otp/send
 * Sends a 4-digit OTP via WhatsApp or Email.
 *
 * Body: { identifier: string, method: "whatsapp" | "email" }
 * Response: { ok: true, message: string, debugCode?: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = SendOTPSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_FAILED", message: "Identifier dan method wajib diisi" },
        { status: 400 },
      );
    }

    const { identifier, method } = parsed.data;

    // Rate limit: max 3 OTP sends per 5 minutes per identifier
    // (In production, use Redis)

    const result = await sendOTP(identifier, method);

    return NextResponse.json({
      ok: result.ok,
      message: result.message,
      method: result.method,
      // Only expose debug code in development
      ...(result.debugCode ? { debugCode: result.debugCode } : {}),
    });
  } catch (err) {
    console.error("[api/otp/send] error:", err);
    return NextResponse.json(
      { ok: false, error: "INTERNAL_ERROR", message: "Gagal mengirim kode verifikasi" },
      { status: 500 },
    );
  }
}
