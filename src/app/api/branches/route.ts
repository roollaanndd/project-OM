import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/branches — list all branches
export async function GET() {
  try {
    const branches = await db.branch.findMany({ orderBy: { isPrimary: "desc" } });
    return NextResponse.json({ ok: true, data: branches });
  } catch (err) {
    console.error("[api/branches] GET error:", err);
    return NextResponse.json({ ok: false, error: "Failed to fetch branches" }, { status: 500 });
  }
}
