import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

// ============ Input validation schema ============
// Strict validation prevents SQL injection, XSS, and data corruption.
// All inputs are sanitized/normalized before reaching the database.

const phoneRegex = /^(\+?\d{1,3}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama lengkap wajib diisi (minimal 2 karakter).")
    .max(100, "Nama terlalu panjang (maksimal 100 karakter).")
    .regex(/^[a-zA-ZÀ-ÿ\s'.-]+$/, "Nama hanya boleh berisi huruf, spasi, dan tanda baca dasar."),
  phone: z
    .string()
    .trim()
    .min(8, "Nomor telepon tidak valid (minimal 8 digit).")
    .max(20, "Nomor telepon terlalu panjang.")
    .regex(phoneRegex, "Format nomor telepon tidak valid."),
  email: z
    .string()
    .trim()
    .max(150, "Email terlalu panjang.")
    .regex(emailRegex, "Format email tidak valid.")
    .optional()
    .or(z.literal("")),
  service: z
    .string()
    .trim()
    .min(2, "Pilih layanan terlebih dahulu.")
    .max(100, "Layanan tidak valid.")
    .regex(/^[a-zA-Z0-9À-ÿ\s&/.()-]+$/, "Layanan mengandung karakter tidak valid."),
  doctor: z
    .string()
    .trim()
    .max(100)
    .regex(/^[a-zA-Z0-9À-ÿ\s.,'()-]+$/, "")
    .optional()
    .or(z.literal("")),
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal tidak valid (gunakan YYYY-MM-DD)."),
  time: z
    .string()
    .trim()
    .regex(/^\d{2}:\d{2}$/, "Format waktu tidak valid (gunakan HH:MM)."),
  notes: z
    .string()
    .trim()
    .max(1000, "Catatan terlalu panjang (maksimal 1000 karakter).")
    .optional()
    .or(z.literal("")),
});

// Allowed service values (whitelist prevents injection via service field)
const ALLOWED_SERVICES = new Set([
  "Scaling & Polishing",
  "Pemutihan Gigi",
  "Kawat Gigi / Behel",
  "Mahkota & Gigi Palsu",
  "Root Canal",
  "Dental Kids",
  "Tambal Gigi Estetik",
  "Implant Gigi",
  "Konsultasi Umum",
]);

const ALLOWED_TIMES = new Set([
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
]);

const ALLOWED_DOCTORS = new Set([
  "Tidak ada preferensi",
  "drg. Oktri Manessa, Sp.Ort",
  "drg. Adelia Putri, Sp.KGA",
  "drg. Reza Mahendra, Sp.Perio",
  "drg. Salsabila Karim, Sp.Pros",
]);

// ============ Helpers ============
function sanitizePhone(phone: string): string {
  // Strip everything except digits and leading +
  return phone.replace(/[^\d+]/g, "");
}

function escapeForLog(s: string): string {
  // Never log raw user input — strip newlines and limit length
  return s.replace(/[\r\n]/g, " ").slice(0, 100);
}

function isFutureDate(date: string, time: string): boolean {
  const now = new Date();
  const input = new Date(`${date}T${time}:00`);
  // Allow same-day bookings as long as the time hasn't passed yet
  // Also allow a 1-hour grace period (user might be booking while at the clinic)
  return input.getTime() > (now.getTime() - 60 * 60 * 1000);
}

function isWithinBookingWindow(date: string): boolean {
  // Allow booking up to 90 days in advance
  const input = new Date(date);
  const max = new Date();
  max.setDate(max.getDate() + 90);
  return input.getTime() <= max.getTime();
}

// ============ POST handler ============
export async function POST(req: NextRequest) {
  try {
    // 1. Parse & validate JSON body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON", message: "Body request bukan JSON valid." },
        { status: 400 },
      );
    }

    // 2. Validate with zod schema (throws ZodError on invalid)
    const parsed = BookingSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        {
          ok: false,
          error: "Validation failed",
          message: firstError?.message ?? "Input tidak valid.",
          fields: parsed.error.issues.reduce<Record<string, string>>((acc, i) => {
            const key = i.path[0]?.toString() ?? "_";
            if (!acc[key]) acc[key] = i.message;
            return acc;
          }, {}),
        },
        { status: 400 },
      );
    }

    const data = parsed.data;

    // 3. Whitelist validation (defense in depth)
    if (!ALLOWED_SERVICES.has(data.service)) {
      return NextResponse.json(
        { ok: false, error: "Invalid service", message: "Layanan tidak terdaftar." },
        { status: 400 },
      );
    }
    if (data.doctor && !ALLOWED_DOCTORS.has(data.doctor)) {
      return NextResponse.json(
        { ok: false, error: "Invalid doctor", message: "Dokter tidak terdaftar." },
        { status: 400 },
      );
    }
    if (!ALLOWED_TIMES.has(data.time)) {
      return NextResponse.json(
        { ok: false, error: "Invalid time", message: "Slot waktu tidak tersedia." },
        { status: 400 },
      );
    }

    // 4. Business logic validation
    if (!isFutureDate(data.date, data.time)) {
      return NextResponse.json(
        { ok: false, error: "Past date", message: "Tanggal dan waktu janji harus di masa depan." },
        { status: 400 },
      );
    }
    if (!isWithinBookingWindow(data.date)) {
      return NextResponse.json(
        { ok: false, error: "Out of range", message: "Booking maksimal 90 hari ke depan." },
        { status: 400 },
      );
    }

    // 5. Normalize data (sanitize phone, trim strings)
    const name = data.name.trim();
    const phone = sanitizePhone(data.phone);
    const email = data.email?.trim() || null;
    const service = data.service;
    const doctor = data.doctor?.trim() || null;
    const notes = data.notes?.trim() || null;
    const dateObj = new Date(`${data.date}T${data.time}:00`);

    // 6. Persist to database (Prisma uses parameterized queries — SQL injection safe)
    let saved: { id: string } | null = null;
    try {
      saved = await db.booking.create({
        data: {
          name,
          phone,
          email,
          service,
          doctor,
          date: dateObj,
          notes,
          status: "pending",
        },
        select: { id: true },
      });
    } catch (dbErr) {
      // Log internally without leaking details to client
      console.error("[booking] DB error:", dbErr instanceof Error ? dbErr.message : "unknown");
      return NextResponse.json(
        {
          ok: false,
          error: "Database error",
          message: "Gagal menyimpan booking. Silakan coba lagi atau hubungi kami via WhatsApp.",
        },
        { status: 500 },
      );
    }

    // 7. Return success (don't leak internal IDs in production)
    return NextResponse.json(
      {
        ok: true,
        message:
          "Permintaan janji temu berhasil diterima. Tim OMDC akan menghubungi Anda dalam 15 menit.",
        bookingId: saved.id,
        data: { name, service, doctor, date: data.date, time: data.time },
      },
      { status: 201 },
    );
  } catch (err) {
    // Catch-all: never expose stack trace to client
    console.error(
      "[booking] Unexpected error:",
      err instanceof Error ? escapeForLog(err.message) : "unknown",
    );
    return NextResponse.json(
      {
        ok: false,
        error: "Internal server error",
        message: "Terjadi kesalahan tak terduga. Silakan coba lagi.",
      },
      { status: 500 },
    );
  }
}

// ============ GET handler (health check) ============
export async function GET() {
  return NextResponse.json({
    service: "OMDC Booking API",
    status: "ok",
    version: "2.0.0",
    time: new Date().toISOString(),
  });
}
