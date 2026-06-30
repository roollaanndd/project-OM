import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { auditLog } from "@/lib/security";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

/**
 * POST /api/auth/login
 * Attempts real authentication against database.
 * Falls back to demo mode if no users with passwordHash exist.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Email dan password wajib diisi" },
        { status: 400 },
      );
    }

    const { email, password } = parsed.data;

    // Try real auth: find user by email
    const cmsUser = await db.cmsUser.findUnique({
      where: { email },
    });

    if (cmsUser?.passwordHash) {
      // Real auth: verify password hash
      // TODO: Implement verifyPassword from security.ts when auth is fully set up
      // For now, check if password matches a known dev password
      if (password === "admin123" || password === cmsUser.passwordHash) {
        auditLog("auth.login", { userId: cmsUser.id, email });
        return NextResponse.json({
          ok: true,
          user: {
            id: cmsUser.id,
            name: cmsUser.name,
            email: cmsUser.email,
            role: cmsUser.role,
            initials: cmsUser.initials,
            gradient: cmsUser.gradient,
            lastActive: "Sekarang",
          },
        });
      }
      auditLog("auth.failed", { email });
      return NextResponse.json(
        { ok: false, error: "Email atau password salah" },
        { status: 401 },
      );
    }

    // Demo mode: no password hashes in DB, accept known emails
    if (cmsUser) {
      auditLog("auth.login", { userId: cmsUser.id, email, mode: "demo" });
      return NextResponse.json({
        ok: true,
        user: {
          id: cmsUser.id,
          name: cmsUser.name,
          email: cmsUser.email,
          role: cmsUser.role,
          initials: cmsUser.initials,
          gradient: cmsUser.gradient,
          lastActive: "Sekarang",
        },
      });
    }

    auditLog("auth.failed", { email });
    return NextResponse.json(
      { ok: false, error: "User tidak ditemukan" },
      { status: 401 },
    );
  } catch (err) {
    console.error("[api/auth/login] error:", err);
    return NextResponse.json(
      { ok: false, error: "Gagal login" },
      { status: 500 },
    );
  }
}
