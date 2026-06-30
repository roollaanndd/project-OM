import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/doctors — list all doctors
export async function GET() {
  try {
    const doctors = await db.doctor.findMany({ orderBy: { rating: "desc" } });
    return NextResponse.json({ ok: true, data: doctors });
  } catch (err) {
    console.error("[api/doctors] GET error:", err);
    return NextResponse.json({ ok: false, error: "Failed to fetch doctors" }, { status: 500 });
  }
}

// PATCH /api/doctors — update doctor status
export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ ok: false, error: "Missing id or status" }, { status: 400 });
    }

    const validStatuses = ["available", "busy", "off"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ ok: false, error: "Invalid status" }, { status: 400 });
    }

    const doctor = await db.doctor.update({ where: { id }, data: { status } });
    return NextResponse.json({ ok: true, data: doctor });
  } catch (err) {
    console.error("[api/doctors] PATCH error:", err);
    return NextResponse.json({ ok: false, error: "Failed to update doctor" }, { status: 500 });
  }
}
