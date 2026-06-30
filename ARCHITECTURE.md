# OMDC Architecture

## System Overview

OMDC (Oktri Manessa Dental Clinic) is a multi-platform dental clinic management system built with Next.js 16. It consists of 4 platforms sharing a single codebase:

```
┌─────────────────────────────────────────────┐
│                Next.js 16 App                │
│                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────────┐ │
│  │ Website  │ │ Mobile   │ │ e-Kiosk      │ │
│  │ (/)      │ │ App(/app)│ │ (/kiosk)     │ │
│  └────┬─────┘ └────┬─────┘ └──────┬───────┘ │
│       │             │              │         │
│  ┌────┴─────────────┴──────────────┴───────┐ │
│  │           Shared Components             │ │
│  │  (Navbar, Footer, BranchSelector, etc)  │ │
│  └────────────────┬────────────────────────┘ │
│                   │                          │
│  ┌────────────────┴────────────────────────┐ │
│  │              API Routes                 │ │
│  │  /api/booking /api/queue /api/patients  │ │
│  │  /api/doctors /api/branches /api/payments│ │
│  │  /api/blog /api/blog/[slug]             │ │
│  └────────────────┬────────────────────────┘ │
│                   │                          │
│  ┌────────────────┴────────────────────────┐ │
│  │           Prisma ORM                    │ │
│  │  SQLite (dev) / PostgreSQL (prod)       │ │
│  └─────────────────────────────────────────┘ │
│                                              │
│  ┌──────────┐                                │
│  │ CMS      │ ← Multi-role (admin/doctor/   │
│  │ (/cms)   │   receptionist/finance)       │
│  └──────────┘                                │
└─────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Animations | Framer Motion |
| State | Zustand (with persist middleware) |
| Database | Prisma ORM + SQLite/PostgreSQL |
| Validation | Zod |
| Testing | Vitest + Testing Library |
| PWA | Service Worker + Web Manifest |
| Icons | Lucide React |
| Images | next/image (AVIF/WebP) |

## Route Structure

```
src/app/
├── (website)/           # Route group: marketing site (shared layout)
│   ├── layout.tsx       # Navbar + Footer + Splash + FloatingActions
│   ├── page.tsx         # Home (Hero + sections)
│   ├── tentang/         # About page
│   ├── layanan/         # Services list + detail
│   ├── dokter/          # Doctors page
│   ├── kontak/          # Contact page
│   ├── blog/            # Blog list + detail
│   ├── privacy-policy/  # Privacy policy
│   └── terms/           # Terms of service
├── app/                 # Mobile App (phone frame)
├── kiosk/               # e-Kiosk (landscape frame)
├── cms/                 # CMS Admin dashboard
├── api/                 # API routes
│   ├── booking/         # POST /api/booking
│   ├── queue/           # GET + POST /api/queue
│   ├── patients/        # GET + POST + [id]
│   ├── doctors/         # GET + PATCH
│   ├── branches/        # GET
│   ├── payments/        # GET + POST
│   └── blog/            # GET + [slug]
├── offline/             # PWA offline fallback
├── error.tsx            # Root error boundary
├── loading.tsx          # Root loading state
├── not-found.tsx        # 404 page
├── layout.tsx           # Root layout (metadata, PWA, theme, analytics)
├── robots.ts            # Auto-generated robots.txt
└── sitemap.ts           # Auto-generated sitemap.xml
```

## Data Flow

1. **User action** → Zustand store (client state)
2. **API call** → `apiClient` (retry, offline queue, auth)
3. **API route** → Zod validation → Prisma query → Response
4. **Real-time sync** → Zustand store shared across platforms (same session)

## Security Layers

1. **Proxy middleware** (src/proxy.ts): CSP, rate limiting, CSRF, bot detection
2. **Input validation**: Zod schemas on all API routes
3. **SQL injection prevention**: Prisma parameterized queries
4. **XSS prevention**: sanitizeText, escapeHtml utilities
5. **Session timeout**: CMS auto-logout after 30 min idle
6. **Audit logging**: All sensitive actions logged

## Testing Strategy

| Level | Framework | Coverage |
|-------|-----------|----------|
| Unit | Vitest | Security utils, config, mock-data, blog data |
| API validation | Vitest + Zod | Booking, queue, payment schemas |
| Component | Vitest + Testing Library | (planned) |
| E2E | Playwright | (planned) |
| Build | next build | CI/CD pipeline |

## Deployment

- **Vercel**: `vercel.json` configured
- **Docker**: `Dockerfile` + `docker-compose.yml` (app + PostgreSQL + Redis + Nginx)
- **Native apps**: Capacitor configs for APK (kiosk) and Play Store/App Store (mobile)
