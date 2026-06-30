import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

// GET /api/queue — list queue entries (with optional status filter)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const branchId = searchParams.get("branchId");

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (branchId) where.branchId = branchId;

    const entries = await db.queueEntry.findMany({
      where,
      orderBy: { checkInTime: "asc" },
      take: 100,
    });

    return NextResponse.json({ ok: true, data: entries, count: entries.length });
  } catch (err) {
    console.error("[api/queue] GET error:", err);
    return NextResponse.json({ ok: false, error: "Failed to fetch queue" }, { status: 500 });
  }
}

const QueueSchema = z.object({
  patientName: z.string().min(2).max(100),
  patientPhone: z.string().min(8).max(20).optional(),
  service: z.string().min(2).max(100),
  doctorName: z.string().max(100).optional(),
  source: z.enum(["walk-in", "booking"]).default("walk-in"),
  bookingId: z.string().optional(),
  branchId: z.string().optional(),
});

// POST /api/queue — add new queue entry
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = QueueSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Validation failed", details: parsed.error.issues }, { status: 400 });
    }

    const data = parsed.data;

    // Generate queue number
    const count = await db.queueEntry.count({ where: { branchId: data.branchId ?? null } });
    const number = `A-${String(count + 1).padStart(3, "0")}`;

    const entry = await db.queueEntry.create({
      data: {
        number,
        patientName: data.patientName,
        patientPhone: data.patientPhone,
        service: data.service,
        doctorName: data.doctorName,
        source: data.source,
        bookingId: data.bookingId,
        branchId: data.branchId,
        status: "waiting",
      },
    });

    return NextResponse.json({ ok: true, data: entry }, { status: 201 });
  } catch (err) {
    console.error("[api/queue] POST error:", err);
    return NextResponse.json({ ok: false, error: "Failed to create queue entry" }, { status: 500 });
  }
}
