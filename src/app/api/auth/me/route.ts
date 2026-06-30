import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";

/**
 * GET /api/auth/me
 * Returns current authenticated user.
 * Uses checkAuth helper which verifies JWT/session in production.
 */
export async function GET(req: NextRequest) {
  const auth = await checkAuth(req);
  if (!auth.ok || !auth.user) {
    return NextResponse.json(
      { ok: false, error: "Not authenticated" },
      { status: 401 },
    );
  }

  return NextResponse.json({
    ok: true,
    user: auth.user,
  });
}
