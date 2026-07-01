import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyOTP } from "@/lib/otp";

const VerifyOTPSchema = z.object({
  identifier: z.string().min(5),
  method: z.enum(["whatsapp", "email"]),
  code: z.string().length(4, "Kode harus 4 digit"),
});

/**
 * POST /api/otp/verify
 * Verifies a 4-digit OTP.
 *
 * Body: { identifier: string, method: "whatsapp" | "email", code: string }
 * Response: { ok: true, message: "Verifikasi berhasil!" }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = VerifyOTPSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_FAILED", message: parsed.error.issues[0]?.message ?? "Input tidak valid" },
        { status: 400 },
      );
    }

    const { identifier, method, code } = parsed.data;
    const result = verifyOTP(identifier, method, code);

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: "OTP_INVALID", message: result.message },
        { status: 400 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: result.message,
      verified: true,
    });
  } catch (err) {
    console.error("[api/otp/verify] error:", err);
    return NextResponse.json(
      { ok: false, error: "INTERNAL_ERROR", message: "Gagal verifikasi kode" },
      { status: 500 },
    );
  }
}
