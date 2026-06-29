import { NextRequest, NextResponse } from "next/server";

/**
 * OMDC Security Middleware
 *
 * Implements:
 * - Content Security Policy (CSP) header
 * - Rate limiting (in-memory per-IP)
 * - CSRF protection for mutations
 * - Bot/scanner detection
 * - HTTPS enforcement
 * - Clickjacking prevention
 * - MIME-type sniffing prevention
 */

// ============ Rate Limiting ============
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = {
  booking: 5, // 5 bookings per minute per IP
  payment: 10,
  api: 60,
  default: 120,
};

type RateBucket = { count: number; resetAt: number };
const buckets = new Map<string, RateBucket>();

function rateLimit(key: string, max: number): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: max - 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
  }

  if (bucket.count >= max) {
    return { allowed: false, remaining: 0, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  return { allowed: true, remaining: max - bucket.count, resetAt: bucket.resetAt };
}

// Cleanup expired buckets periodically (every 5 minutes)
if (typeof globalThis !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets.entries()) {
      if (bucket.resetAt < now) buckets.delete(key);
    }
  }, 5 * 60 * 1000).unref?.();
}

// ============ Security headers ============
function buildSecurityHeaders(req: NextRequest) {
  const isProd = process.env.NODE_ENV === "production";
  const cspDirectives = [
    `default-src 'self'`,
    // Production: remove 'unsafe-eval' (Next.js prod doesn't need it)
    // Dev: keep 'unsafe-eval' for HMR
    `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"} 'unsafe-hashes'`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `font-src 'self' https://fonts.gstatic.com data:`,
    `img-src 'self' data: blob: https:`,
    `media-src 'self' data: blob:`,
    `connect-src 'self' https: wss:`,
    `frame-ancestors 'none'`,
    `form-action 'self'`,
    `base-uri 'self'`,
    `object-src 'none'`,
    `upgrade-insecure-requests`,
    // Production only: additional restrictions
    ...(isProd ? [`block-all-mixed-content`] : []),
  ]
    .filter(Boolean)
    .join("; ");

  return {
    "Content-Security-Policy": cspDirectives,
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(self), microphone=(), geolocation=(self), payment=(self)",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
    "X-DNS-Prefetch-Control": "on",
  };
}

// ============ Bot detection (basic) ============
const BOT_PATTERNS = [
  /sqlmap/i,
  /nikto/i,
  /nmap/i,
  /masscan/i,
  /acunetix/i,
  /nessus/i,
  /burpsuite/i,
  /zap/i,
  /hydra/i,
  /wpscan/i,
  /dirbuster/i,
  /gobuster/i,
];

function isMaliciousBot(userAgent: string): boolean {
  return BOT_PATTERNS.some((p) => p.test(userAgent));
}

// ============ Main middleware ============
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userAgent = req.headers.get("user-agent") ?? "";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  // 1. Block malicious bots/scanners
  if (isMaliciousBot(userAgent)) {
    return new NextResponse("Forbidden", {
      status: 403,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // 2. Rate limit API endpoints
  if (pathname.startsWith("/api/")) {
    let limit = RATE_LIMIT_MAX.default;
    if (pathname.includes("/booking")) limit = RATE_LIMIT_MAX.booking;
    else if (pathname.includes("/payment")) limit = RATE_LIMIT_MAX.payment;

    const rateKey = `${ip}:${pathname}`;
    const result = rateLimit(rateKey, limit);

    if (!result.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: "Rate limit exceeded",
          message: "Terlalu banyak permintaan. Coba lagi dalam 1 menit.",
          retryAfter: Math.ceil((result.resetAt - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((result.resetAt - Date.now()) / 1000)),
            "X-RateLimit-Limit": String(limit),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(result.resetAt),
          },
        },
      );
    }
  }

  // 3. CSRF protection for mutations (POST/PUT/DELETE) to API routes
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method) && pathname.startsWith("/api/")) {
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");

    // Allowed origins for native apps (Capacitor)
    const NATIVE_ORIGINS = [
      "capacitor://", // iOS Capacitor
      "http://localhost", // Android Capacitor webview
      "ionic://", // Ionic
    ];

    // Allow if: same-origin, OR native app origin, OR no origin (mobile apps)
    const isSameOrigin = !origin || !host || origin.includes(host);
    const isNativeApp = origin
      ? NATIVE_ORIGINS.some((o) => origin.startsWith(o))
      : req.headers.get("x-omdc-platform") === "capacitor-app";

    if (!isSameOrigin && !isNativeApp) {
      return NextResponse.json(
        { ok: false, error: "CSRF check failed", message: "Origin tidak valid" },
        { status: 403 },
      );
    }
  }

  // 4. Build response with security headers
  const res = NextResponse.next();
  const securityHeaders = buildSecurityHeaders(req);

  for (const [key, value] of Object.entries(securityHeaders)) {
    res.headers.set(key, value);
  }

  // Add rate limit info header for transparency
  if (pathname.startsWith("/api/")) {
    res.headers.set("X-RateLimit-Policy", "60 req/min default, 5 req/min booking");
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sw.js, manifest (PWA files)
     * - public icons
     * - public assets
     */
    "/((?!_next/static|_next/image|favicon\\.svg|favicon-16\\.png|favicon-32\\.png|sw\\.js|manifest\\.webmanifest|icons/).*)",
  ],
};
