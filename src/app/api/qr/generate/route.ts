import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateQR, generateBookingCode, QRType } from "@/lib/qr-system";
import { auditLog } from "@/lib/security";

const GenerateSchema = z.object({
  type: z.enum(["booking", "payment", "patient", "queue"]),
  id: z.string().min(1).max(100),
  code: z.string().min(1).max(50).optional(),
  data: z.object({
    service: z.string().optional(),
    doctor: z.string().optional(),
    date: z.string().optional(),
    time: z.string().optional(),
    patientName: z.string().optional(),
    amount: z.number().optional(),
    branch: z.string().optional(),
  }).optional(),
});

// POST /api/qr/generate — generate a QR code for booking/payment
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = GenerateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Validation failed", details: parsed.error.issues },
        { status: 400 },
      );
    }

    const { type, id, data } = parsed.data;
    const code = parsed.data.code ?? generateBookingCode();

    const { payload, dataUrl } = await generateQR(type as QRType, id, code, data);

    auditLog("booking.create", { qrType: type, id, code });

    return NextResponse.json({
      ok: true,
      data: {
        code,
        payload,
        qrCode: dataUrl, // PNG data URL
      },
    });
  } catch (err) {
    console.error("[api/qr/generate] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to generate QR code" },
      { status: 500 },
    );
  }
}
