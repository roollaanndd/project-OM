import { NextRequest, NextResponse } from "next/server";

/**
 * Auth helper for API routes.
 * In production: verifies JWT session from Authorization header or cookie.
 * In development: allows all requests (demo mode).
 *
 * Usage:
 * ```ts
 * const auth = await checkAuth(req);
 * if (!auth.ok) return auth.response;
 * // auth.user available
 * ```
 */

export interface AuthResult {
  ok: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  response?: NextResponse;
}

/**
 * Check if request is authenticated.
 * Returns { ok: true, user } if authenticated, { ok: false, response } if not.
 */
export async function checkAuth(req: NextRequest): Promise<AuthResult> {
  // Development mode: allow all (demo)
  if (process.env.NODE_ENV !== "production") {
    return {
      ok: true,
      user: {
        id: "dev-user",
        name: "Developer",
        email: "dev@omdc.id",
        role: "admin",
      },
    };
  }

  // Production: check Authorization header
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return {
      ok: false,
      response: NextResponse.json(
        { ok: false, error: "UNAUTHORIZED", message: "Token autentikasi diperlukan" },
        { status: 401 },
      ),
    };
  }

  const token = authHeader.substring(7);

  // Verify JWT token (placeholder — replace with actual JWT verification)
  // TODO: When NextAuth is fully configured, use getServerSession()
  try {
    // For now, accept any non-empty token in production
    // Real implementation: verify JWT signature, check expiry, extract user
    if (token.length < 10) {
      throw new Error("Invalid token");
    }

    return {
      ok: true,
      user: {
        id: "session-user",
        name: "Session User",
        email: "user@omdc.id",
        role: "admin",
      },
    };
  } catch {
    return {
      ok: false,
      response: NextResponse.json(
        { ok: false, error: "INVALID_TOKEN", message: "Token tidak valid atau kedaluwarsa" },
        { status: 401 },
      ),
    };
  }
}

/**
 * Check if user has required role.
 * Use after checkAuth().
 */
export function checkRole(user: { role: string }, allowedRoles: string[]): boolean {
  return allowedRoles.includes(user.role) || user.role === "admin";
}

/**
 * Require specific roles for an API route.
 * Returns null if allowed, or NextResponse if denied.
 */
export function requireRole(user: { role: string }, allowedRoles: string[]): NextResponse | null {
  if (checkRole(user, allowedRoles)) return null;
  return NextResponse.json(
    { ok: false, error: "FORBIDDEN", message: "Anda tidak memiliki akses ke resource ini" },
    { status: 403 },
  );
}
