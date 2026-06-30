# OMDC COMPREHENSIVE AUDIT — 30 June 2026

## 📊 FINAL SCORES (detailed)

| # | Category | Score | Evidence | Detail |
|---|----------|-------|----------|--------|
| 1 | **TypeScript** | **9.5/10** | 0 errors, 0 unused locals, 0 unused params, strict mode | ✅ Excellent |
| 2 | **Backend** | **5/10** | 15 API routes, 12 Prisma models, Zod validation | ❌ Zero auth on API routes, 3 TODOs, demo auth |
| 3 | **Frontend** | **6/10** | 0 raw img, 6 next/image, 25 lazy/suspense | ⚠️ 8 files >300 lines, 47 files import framer-motion |
| 4 | **Security** | **5/10** | CSP, rate limiting, CSRF, bot detection | ❌ Zero auth on 6 API routes, demo auth, 3 TODOs |
| 5 | **Testing** | **8/10** | 89 tests, 10 test files, component + unit tests | ⚠️ 0 E2E tests, 0 integration tests, no coverage threshold |
| 6 | **CI/CD** | **3/10** | ci.yml exists locally | ❌ NOT uploaded to GitHub (PAT lacks workflow scope) |
| 7 | **SEO** | **9/10** | 10 canonical, 4 JSON-LD, 15 sitemap, hreflang, robots | ✅ Excellent |
| 8 | **UI/UX** | **9/10** | Gojek+MIKA style, white bg, dark mode, responsive | ✅ Excellent |
| 9 | **Accessibility** | **8/10** | 46 aria-labels, focus trap, skip link, reduced motion | ⚠️ Only 1 focus trap (navbar), ARIA live not used in components |
| 10 | **Code Quality** | **8/10** | 0 dead code, 0 unused imports/params | ⚠️ 1 console.log, 3 TODOs, 8 large files |
| 11 | **Documentation** | **9/10** | README, ARCHITECTURE, API, DEPLOYMENT, AUDIT | ✅ Excellent |
| 12 | **Performance** | **6/10** | 60 deps, lazy loading, next/image | ⚠️ 47 files import framer-motion (not LazyMotion), no bundle analysis |

**Current Average: 7.5/10**

---

## 🔴 CRITICAL ISSUES (blocking 9/10)

### 1. ZERO AUTH ON API ROUTES (Backend 5/10, Security 5/10)
**Problem:** 6 API routes (`/api/booking`, `/api/queue`, `/api/patients`, `/api/payments`, `/api/doctors`, `/api/branches`) have ZERO authentication checks. Anyone can:
- Create bookings without auth
- View all patient data (GDPR violation)
- Create payments
- Modify doctor status

**Fix:**
```typescript
// Add to each API route:
import { verifySession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  // ... rest of handler
}
```

**Impact:** Backend 5→8, Security 5→8 (+6 points total)

### 2. CI/CD NOT ON GITHUB (CI/CD 3/10)
**Problem:** `ci.yml` exists locally but cannot be pushed (PAT lacks `workflow` scope).

**Fix:** User must either:
- Upload via GitHub UI (2 min), OR
- Generate new PAT with `repo` + `workflow` scope

**Impact:** CI/CD 3→9 (+6 points)

### 3. 47 FILES IMPORT FRAMER-MOTION (Performance 6/10)
**Problem:** Every component imports `motion` from `framer-motion` directly. This bundles the ENTIRE framer-motion library (~50KB gzipped) instead of tree-shaking.

**Fix:**
```typescript
// Instead of:
import { motion } from "framer-motion";

// Use:
import { LazyMotion, domAnimation } from "framer-motion";
// Wrap app in <LazyMotion features={domAnimation}>
// Use `m.div` instead of `motion.div`
```

**Impact:** Performance 6→9 (+3 points)

### 4. 3 UNIMPLEMENTED TODOs (Backend 5/10, Code Quality 8/10)
**Problem:**
- `auth/login/route.ts:36` — "TODO: Implement verifyPassword"
- `auth/me/route.ts:9` — "TODO: Implement JWT session verification"
- `security.ts:193` — "TODO: Replace with Sentry/Datadog"

**Fix:** Implement real password verification using `verifyPassword()` from `security.ts`, create JWT session helper, or at minimum document why these are deferred.

**Impact:** Backend 5→7, Code Quality 8→9 (+2 points)

### 5. 8 FILES >300 LINES (Frontend 6/10, Code Quality 8/10)
**Problem:**
- `booking.tsx` (mobile): 617 lines — should be 5 step components
- `payments.tsx` (mobile): 540 lines — should be 4 sub-components
- `app-store.ts`: 539 lines — could split data slices
- `profile.tsx` (mobile): 482 lines — should be 4 sub-components
- `walk-in.tsx` (kiosk): 472 lines — should be 4 step components
- `booking.tsx` (dental): 450 lines — could extract form section
- `check-in.tsx` (kiosk): 389 lines
- `mock-data.ts`: 374 lines — could split by entity

**Fix:** Split into sub-components. Target: no file >300 lines (except shadcn `sidebar.tsx` 726 lines which is boilerplate).

**Impact:** Frontend 6→9, Code Quality 8→9 (+3 points)

---

## 📋 ACTION PLAN for 9.9/10

### Phase 1: Critical Fixes (target 8.5/10)
| Task | Time | Score Impact |
|------|------|-------------|
| Fix CI/CD upload (manual or new PAT) | 2 min | CI/CD 3→9 (+6) |
| Add auth middleware to 6 API routes | 1 hour | Backend+Security +4 |
| Fix 3 TODOs (implement or document) | 30 min | Backend+CodeQuality +2 |
| **Subtotal** | **1.5 hours** | **+12 points → 8.5/10** |

### Phase 2: Performance + Frontend (target 9.3/10)
| Task | Time | Score Impact |
|------|------|-------------|
| Migrate to LazyMotion (47 files) | 2 hours | Performance 6→9 (+3) |
| Refactor 4 largest files (>450 lines) | 2 hours | Frontend 6→9 (+3) |
| Run bundle analysis + document | 30 min | Performance +1 |
| **Subtotal** | **4.5 hours** | **+7 points → 9.3/10** |

### Phase 3: Polish for 9.9/10 (target 9.9/10)
| Task | Time | Score Impact |
|------|------|-------------|
| Add E2E tests (Playwright, 5 tests) | 2 hours | Testing 8→9.5 (+1.5) |
| Add more focus traps (CMS, kiosk modals) | 30 min | Accessibility 8→9.5 (+1.5) |
| Use ARIA live in toast notifications | 30 min | Accessibility +0.5 |
| Add test coverage threshold (60%) | 30 min | Testing +0.5 |
| Remove 11 raw process.env → getEnv() | 30 min | Code Quality +0.5 |
| Add noscript fallback content | 15 min | SEO 9→9.5 (+0.5) |
| Remove 1 console.log in security.ts | 5 min | Code Quality +0.3 |
| Add PR template + issue templates | 15 min | Documentation +0.3 |
| **Subtotal** | **5 hours** | **+6 points → 9.9/10** |

**Total time to 9.9/10: ~11 hours**

---

## 📊 SCORE PROGRESSION

```
Current:          7.5/10  ████████░░░░░░░░░░░
After Phase 1:    8.5/10  █████████░░░░░░░░░░
After Phase 2:    9.3/10  ██████████░░░░░░░░░
After Phase 3:    9.9/10  ████████████████████
```

---

## 🎯 IMMEDIATE ACTIONS (I can do now)

1. ✅ Fix 2 unused params (DONE)
2. ✅ Fix test setup.ts missing (DONE — 89 tests pass)
3. Add auth middleware to 6 API routes
4. Fix 3 TODOs
5. Migrate to LazyMotion
6. Refactor 4 large files
7. Add more focus traps
8. Remove console.log
9. Replace raw process.env with getEnv()

**Blocked (needs user action):**
- ❌ Upload CI/CD to GitHub (needs new PAT with `workflow` scope)
