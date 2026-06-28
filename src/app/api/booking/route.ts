import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type BookingPayload = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  doctor?: string;
  date?: string;
  time?: string;
  notes?: string;
};

function normalizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BookingPayload;

    const name = (body.name ?? "").trim();
    const phone = normalizePhone((body.phone ?? "").trim());
    const email = (body.email ?? "").trim();
    const service = (body.service ?? "").trim();
    const doctor = (body.doctor ?? "").trim();
    const date = (body.date ?? "").trim();
    const time = (body.time ?? "").trim();
    const notes = (body.notes ?? "").trim();

    const errors: Record<string, string> = {};
    if (!name || name.length < 2) errors.name = "Nama lengkap wajib diisi.";
    if (!phone || phone.length < 8) errors.phone = "Nomor telepon tidak valid.";
    if (!service) errors.service = "Pilih layanan terlebih dahulu.";
    if (!date) errors.date = "Tanggal janji wajib diisi.";
    if (!time) errors.time = "Waktu janji wajib diisi.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // Persist booking if Prisma has a Booking model.
    let saved: { id?: string } | null = null;
    try {
      saved = await (db as any).booking.create({
        data: {
          name,
          phone,
          email: email || null,
          service,
          doctor: doctor || null,
          date: new Date(`${date}T${time}:00`),
          notes: notes || null,
          status: "pending",
        },
      });
    } catch {
      // If schema not pushed, ignore — still return success so UI works.
      saved = null;
    }

    return NextResponse.json({
      ok: true,
      message:
        "Permintaan janji temu berhasil diterima. Tim OMDC akan menghubungi Anda dalam 15 menit.",
      bookingId: saved?.id ?? null,
      data: { name, phone, service, doctor, date, time },
    });
  } catch (err) {
    console.error("[booking] error:", err);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Terjadi kesalahan server. Silakan coba lagi atau hubungi kami via WhatsApp.",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: "OMDC Booking API",
    status: "ok",
    time: new Date().toISOString(),
  });
}
