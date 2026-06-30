import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyQR } from "@/lib/qr-system";
import { db } from "@/lib/db";

const VerifySchema = z.object({
  qr: z.string().min(1),
});

// POST /api/qr/verify — verify a scanned QR code and return associated data
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = VerifySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "QR string required" },
        { status: 400 },
      );
    }

    const result = verifyQR(parsed.data.qr);

    if (!result.valid) {
      return NextResponse.json(
        {
          ok: false,
          error: result.error,
          expired: result.expired,
        },
        { status: result.expired ? 410 : 400 },
      );
    }

    const payload = result.payload!;

    // Fetch associated data based on QR type
    let record: unknown = null;

    if (payload.type === "booking") {
      record = await db.booking.findUnique({
        where: { id: payload.id },
        select: {
          id: true,
          name: true,
          phone: true,
          service: true,
          doctor: true,
          date: true,
          status: true,
          branchId: true,
        },
      }).catch(() => null);
    } else if (payload.type === "payment") {
      record = await db.payment.findUnique({
        where: { id: payload.id },
      }).catch(() => null);
    } else if (payload.type === "patient") {
      record = await db.patient.findUnique({
        where: { id: payload.id },
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
        },
      }).catch(() => null);
    }

    return NextResponse.json({
      ok: true,
      data: {
        type: payload.type,
        code: payload.code,
        generatedAt: new Date(payload.ts).toISOString(),
        record,
        embeddedData: payload.data,
      },
    });
  } catch (err) {
    console.error("[api/qr/verify] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to verify QR code" },
      { status: 500 },
    );
  }
}
