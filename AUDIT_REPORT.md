# OMDC HONEST AUDIT REPORT — v2.1.0

**Date**: 2026-06-30
**Auditor**: CTO (self-audit, no sugar-coating)
**Previous external score**: 3/10 (Codex)

## 📊 HONEST SCORING

| Category | Score | Reason |
|----------|-------|--------|
| **TypeScript** | 7/10 | ✅ 0 errors now, but was hiding errors with ignoreBuildErrors |
| **Backend** | 3/10 | ❌ Only 2 API routes, mock data, no real auth, no real DB ops |
| **Frontend** | 5/10 | ⚠️ 9 files >300 lines, dead code (HubLauncher/view state), raw `<img>` |
| **Security** | 6/10 | ⚠️ CSP exists but CMS login is fake, no real session management |
| **SEO** | 7/10 | ✅ Sitemap/robots/JSON-LD exist, but only 2 API routes to index |
| **UI/UX** | 7/10 | ✅ Good design, but inconsistent (some pages refined, others plain) |
| **Performance** | 6/10 | ⚠️ 66 deps (many unused), no bundle analysis done, raw img tags |
| **Accessibility** | 6/10 | ⚠️ Has skip link + ARIA, but only 1 error boundary, missing focus traps |
| **Testing** | 0/10 | ❌ ZERO test files. Zero. This alone justifies 3/10. |
| **CI/CD** | 0/10 | ❌ No GitHub Actions, no automated checks |
| **Code Quality** | 4/10 | ❌ Dead code, console.log in prod, 500+ line components, no docs |
| **Documentation** | 5/10 | ⚠️ Has README + DEPLOYMENT.md, but no API docs, no component docs |

**Average**: 4.6/10

**Why Codex gave 3/10**: The combination of zero tests + hidden TS errors + dead code + fake auth + no CI/CD = legitimately bad code quality despite nice UI.

---

## 🔴 CRITICAL ISSUES (must fix for 9/10)

### 1. ZERO TESTS (Score: 0/10)
- No unit tests, no integration tests, no E2E tests
- No test framework installed
- **Fix**: Setup Vitest + React Testing Library, write tests for critical paths

### 2. NO CI/CD (Score: 0/10)
- No GitHub Actions
- No automated lint/test/build on push
- **Fix**: Create GitHub Actions workflow

### 3. DEAD CODE (Score: 2/10)
- `HubLauncher` component: 287 lines, imported nowhere
- `WebsiteView` component: 85 lines, imported nowhere
- `view` state in Zustand store: still exists but routing uses next/navigation
- `ViewMode` type: includes "hub" which is never used
- **Fix**: Delete dead code, clean store

### 4. RAW `<img>` TAGS (Score: 4/10)
- CMS doctors page: raw `<img>` instead of `next/image`
- CMS branches page: raw `<img>` instead of `next/image`
- **Fix**: Migrate to next/image

### 5. 66 DEPENDENCIES (MANY UNUSED) (Score: 4/10)
- `@dnd-kit/*` — not used
- `@mdxeditor/editor` — not used
- `@tanstack/react-table` — not used
- `react-syntax-highlighter` — not used
- Many Radix UI packages may be unused
- **Fix**: Audit and remove unused deps

### 6. LARGE COMPONENTS (Score: 4/10)
- `sidebar.tsx`: 726 lines (shadcn boilerplate, OK)
- `booking.tsx` (mobile): 585 lines — needs splitting
- `payments.tsx` (mobile): 540 lines — needs splitting
- `profile.tsx` (mobile): 482 lines — needs splitting
- `walk-in.tsx` (kiosk): 472 lines — needs splitting
- `booking.tsx` (dental): 450 lines — needs splitting
- **Fix**: Split into sub-components

### 7. FAKE AUTHENTICATION (Score: 2/10)
- CMS login accepts ANY credentials
- No real session management
- No password verification
- **Fix**: At minimum, document clearly + add env-based auth check

### 8. CONSOLE.LOG IN PRODUCTION (Score: 5/10)
- `security.ts` uses console.log for audit logging
- Should use proper logger
- **Fix**: Replace with structured logger

### 9. ONLY 2 API ROUTES (Score: 3/10)
- `/api` — health check
- `/api/booking` — booking creation
- Missing: queue, payment, patients, doctors, branches APIs
- **Fix**: Add API stubs with proper validation

### 10. NO NESTED ERROR BOUNDARIES (Score: 5/10)
- Only root `error.tsx`
- Blog, services, app, kiosk, cms — no error boundaries
- **Fix**: Add error.tsx to route groups
