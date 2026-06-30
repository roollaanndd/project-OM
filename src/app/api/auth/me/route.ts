import { NextResponse } from "next/server";

/**
 * GET /api/auth/me
 * Returns current user (in production, reads from JWT session).
 * Currently returns 401 as we don't have server-side sessions yet.
 */
export async function GET() {
  // TODO: Implement JWT session verification
  return NextResponse.json(
    { ok: false, error: "Not authenticated" },
    { status: 401 },
  );
}
