import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/patients/[id] — get patient by ID with bookings & payments
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const patient = await db.patient.findUnique({
      where: { id },
      include: {
        bookings: { orderBy: { date: "desc" }, take: 10 },
        payments: { orderBy: { date: "desc" }, take: 10 },
      },
    });

    if (!patient) {
      return NextResponse.json({ ok: false, error: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: patient });
  } catch (err) {
    console.error("[api/patients/[id]] GET error:", err);
    return NextResponse.json({ ok: false, error: "Failed to fetch patient" }, { status: 500 });
  }
}

// DELETE /api/patients/[id] — delete patient
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await db.patient.delete({ where: { id } });
    return NextResponse.json({ ok: true, message: "Patient deleted" });
  } catch (err) {
    console.error("[api/patients/[id]] DELETE error:", err);
    return NextResponse.json({ ok: false, error: "Failed to delete patient" }, { status: 500 });
  }
}
