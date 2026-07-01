import { NextRequest, NextResponse } from "next/server";
import { verifyQR } from "@/lib/qr-system";
import { db } from "@/lib/db";

/**
 * POST /api/qr/verify
 * Body: { qr: string } OR { payload: QRPayload }
 * Verifies a scanned QR code and returns associated data.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Accept either { qr: "json string" } or { payload: {...} }
    let qrString: string;
    if (typeof body.qr === "string") {
      qrString = body.qr;
    } else if (body.payload && typeof body.payload === "object") {
      qrString = JSON.stringify(body.payload);
    } else if (typeof body === "string") {
      qrString = body;
    } else {
      return NextResponse.json(
        { ok: false, error: "QR data required (send { qr: string } or { payload: object })" },
        { status: 400 },
      );
    }

    const result = verifyQR(qrString);

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
