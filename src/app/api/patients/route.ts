import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { checkAuth } from "@/lib/auth";

// GET /api/patients — list with pagination
export async function GET(req: NextRequest) {
  const auth = await checkAuth(req);
  if (!auth.ok) return auth.response;

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "20");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { phone: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const [patients, total] = await Promise.all([
      db.patient.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: { createdAt: "desc" } }),
      db.patient.count({ where }),
    ]);

    return NextResponse.json({ ok: true, data: patients, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (err) {
    console.error("[api/patients] GET error:", err);
    return NextResponse.json({ ok: false, error: "Failed to fetch patients" }, { status: 500 });
  }
}

const PatientSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(8).max(20),
  email: z.string().email().optional(),
  age: z.number().int().min(0).max(150).optional(),
  address: z.string().max(500).optional(),
  isFirstVisit: z.boolean().default(true),
  branchId: z.string().optional(),
});

// POST /api/patients — create new patient
export async function POST(req: NextRequest) {
  const auth = await checkAuth(req);
  if (!auth.ok) return auth.response;

  try {
    const body = await req.json();
    const parsed = PatientSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Validation failed", details: parsed.error.issues }, { status: 400 });
    }

    const patient = await db.patient.create({ data: parsed.data });
    return NextResponse.json({ ok: true, data: patient }, { status: 201 });
  } catch (err) {
    console.error("[api/patients] POST error:", err);
    return NextResponse.json({ ok: false, error: "Failed to create patient" }, { status: 500 });
  }
}
