import { NextResponse } from "next/server";
import { auditLog } from "@/lib/security";

/**
 * POST /api/auth/logout
 * Clears session (in production, would invalidate JWT).
 */
export async function POST() {
  auditLog("auth.logout", {});
  return NextResponse.json({ ok: true, message: "Logged out" });
}
