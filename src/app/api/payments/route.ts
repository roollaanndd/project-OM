import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

// GET /api/payments — list transactions
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "20");

    const where: Record<string, unknown> = {};
    if (status) where.status = status;

    const [payments, total] = await Promise.all([
      db.payment.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: { date: "desc" } }),
      db.payment.count({ where }),
    ]);

    return NextResponse.json({ ok: true, data: payments, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (err) {
    console.error("[api/payments] GET error:", err);
    return NextResponse.json({ ok: false, error: "Failed to fetch payments" }, { status: 500 });
  }
}

const PaymentSchema = z.object({
  description: z.string().min(2).max(200),
  amount: z.number().positive(),
  method: z.enum(["cash", "card", "qris", "ewallet"]).default("cash"),
  patientId: z.string().optional(),
  bookingId: z.string().optional(),
});

// POST /api/payments — create payment
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = PaymentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Validation failed", details: parsed.error.issues }, { status: 400 });
    }

    const invoiceId = `INV/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, "0")}/${String(Date.now()).slice(-6)}`;

    const payment = await db.payment.create({
      data: { ...parsed.data, invoiceId, status: "success", date: new Date() },
    });

    return NextResponse.json({ ok: true, data: payment }, { status: 201 });
  } catch (err) {
    console.error("[api/payments] POST error:", err);
    return NextResponse.json({ ok: false, error: "Failed to create payment" }, { status: 500 });
  }
}
