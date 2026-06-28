# OMDC — Oktri Manessa Dental Clinic

> **Your Smile, Our Passion** — Ekosistem digital klinik gigi modern dengan 4 platform terintegrasi.

[![PWA](https://img.shields.io/badge/PWA-installable-pink)](https://omdc-dental.id)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com)

## 📋 Overview

OMDC adalah ekosistem digital lengkap untuk klinik gigi modern yang terdiri dari **4 platform terintegrasi** dengan sinkronisasi data real-time:

| Platform | Audience | Deskripsi |
|----------|----------|-----------|
| 🌐 **Website** | Calon pasien | Landing page marketing dengan SEO lengkap |
| 📱 **Mobile App** | Pasien existing | Booking, rekam medis, pembayaran, loyalty (PWA) |
| 🖥️ **e-Kiosk** | Walk-in visitors | Self-service registration, check-in, payment |
| ⚙️ **CMS Admin** | Staff (4 roles) | Dashboard manajemen penuh |

## ✨ Fitur Utama

### Website (Public)
- 9 section animated (Hero, About, Services, Features, Gallery, Doctors, Testimonials, Pricing, FAQ, Booking)
- Welcome splash screen + scroll progress bar
- SEO pages: `/layanan`, `/layanan/[service]`, `/dokter`, `/tentang`, `/kontak`
- JSON-LD structured data (Dentist schema)
- Floating WhatsApp + scroll-to-top buttons

### Mobile App (PWA)
- **Onboarding** dengan login/register/guest mode
- **Home Dashboard**: greeting, loyalty card, quick actions, next appointment, health tips
- **Booking Flow** 5-step: service → doctor → date/time → confirm → success
- **Rekam Medis**: list + detail dengan tooth chart interaktif, prescription, doctor notes
- **Payments**: bills, history, 5 payment methods (GoPay, OVO, DANA, Card, QRIS)
- **Profile**: loyalty rewards, family members, QR member, settings
- **Persistence**: data tersimpan di localStorage (Zustand persist)

### e-Kiosk (Self-Service)
- **Walk-in Registration** 4-step dengan queue ticket
- **Booking Check-in** via QR code atau kode booking
- **Payment Flow** dengan cash/card/QRIS/e-wallet
- **Idle timeout** otomatis reset ke welcome (90 detik)
- Live queue indicator real-time

### CMS Admin (Multi-roles)
- **4 roles**: Admin (full), Dokter, Resepsionis, Finance
- **8 halaman**: Dashboard, Pasien, Janji Temu, Antrian Live, Dokter, Keuangan, Website Editor, Settings
- **Real-time Queue Monitor**: 3 loket dengan panggilan antrian
- **Website Editor**: upload logo, color picker, edit konten, toggle layanan
- **Audit logging** untuk tracking aksi sensitif

## 🔒 Security

- ✅ **SQL Injection Prevention**: Prisma parameterized queries + zod input validation
- ✅ **XSS Protection**: input sanitization, output encoding, CSP headers
- ✅ **Rate Limiting**: 5 req/min booking, 60 req/min API default
- ✅ **CSRF Protection**: same-origin check untuk mutations
- ✅ **CSP Headers**: strict Content Security Policy
- ✅ **Bot Detection**: block sqlmap, nikto, nmap, dll
- ✅ **Security Headers**: HSTS, X-Frame-Options DENY, Permissions-Policy, Referrer-Policy
- ✅ **Input Validation**: whitelist validation (defense in depth)
- ✅ **Password Hashing**: PBKDF2 via Web Crypto API (untuk auth future)
- ✅ **Audit Logging**: tracking aksi sensitif

## 🔍 SEO

- ✅ **Dynamic Metadata**: per-page title, description, canonical
- ✅ **JSON-LD Structured Data**: Dentist schema, MedicalProcedure, WebSite, WebApplication
- ✅ **Sitemap.xml** auto-generated (`/sitemap.xml`)
- ✅ **Robots.txt** auto-generated (`/robots.txt`)
- ✅ **OpenGraph + Twitter Cards** dengan OG image 1200x630
- ✅ **Internal Linking**: navbar & footer dengan struktur hierarki
- ✅ **Breadcrumbs** di setiap halaman inner
- ✅ **Semantic HTML**: `<main>`, `<nav>`, `<article>`, `<section>`
- ✅ **Image Optimization**: next/image dengan AVIF/WebP

## 📱 PWA

- ✅ **Installable** di Android, iOS, Desktop
- ✅ **Service Worker** dengan strategi caching cerdas:
  - App shell: cache-first
  - Static assets: cache-first + network fallback
  - API: stale-while-revalidate
  - Navigation: network-first + offline fallback
- ✅ **Offline Mode** dengan halaman fallback
- ✅ **App Shortcuts**: Booking, Rekam Medis, Pembayaran
- ✅ **Push Notifications** ready (FCM)
- ✅ **Auto-Update** saat versi baru tersedia

## ⚡ Performance

- ✅ **Lazy Loading** below-fold sections (React.lazy + Suspense)
- ✅ **Code Splitting** otomatis per route
- ✅ **Bundle Analysis** via `@next/bundle-analyzer`
- ✅ **Image Optimization** (AVIF, WebP, responsive)
- ✅ **Font Optimization** (display: swap, variable fonts)
- ✅ **Cache-Control** immutable untuk static assets

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ / Bun 1.0+
- PostgreSQL (production) atau SQLite (development)

### Installation

```bash
# Clone repo
git clone https://github.com/roollaanndd/project-OM.git
cd project-OM

# Install dependencies
bun install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your values

# Setup database
bun run db:push

# Start dev server
bun run dev
```

Buka `http://localhost:3000` di browser.

### Build untuk Production

```bash
bun run build
bun run start
```

## 📂 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (website)/                # Route group untuk public pages
│   │   ├── layanan/              # /layanan & /layanan/[service]
│   │   ├── dokter/               # /dokter
│   │   ├── tentang/              # /tentang
│   │   └── kontak/               # /kontak
│   ├── api/                      # API routes
│   │   └── booking/              # POST /api/booking
│   ├── offline/                  # /offline fallback page
│   ├── error.tsx                 # Error boundary
│   ├── loading.tsx               # Loading UI
│   ├── not-found.tsx             # 404 page
│   ├── layout.tsx                # Root layout (PWA metadata, JSON-LD)
│   ├── page.tsx                  # Hub launcher
│   ├── robots.ts                 # robots.txt
│   └── sitemap.ts                # sitemap.xml
├── components/
│   ├── dental/                   # Website components
│   ├── mobile/                   # Mobile App components
│   ├── kiosk/                    # e-Kiosk components
│   ├── cms/                      # CMS Admin components
│   ├── hub/                      # Hub launcher & view routers
│   └── pwa/                      # PWA controller
├── lib/
│   ├── app-store.ts              # Zustand store (persisted)
│   ├── security.ts               # Security utilities
│   ├── env.ts                    # Env validation
│   ├── db.ts                     # Prisma client
│   └── utils.ts                  # Utils
├── proxy.ts                      # Next.js proxy (rate limit, security headers)
└── prisma/
    └── schema.prisma             # Database schema

public/
├── icons/                        # PWA icons (192, 512, maskable, apple-touch)
├── manifest.webmanifest          # PWA manifest
├── sw.js                         # Service Worker
├── favicon.svg
└── og-image.png                  # OpenGraph image
```

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui (New York) |
| Animations | Framer Motion |
| State Management | Zustand (with persist middleware) |
| Database | Prisma ORM + SQLite/PostgreSQL |
| Validation | Zod |
| Icons | Lucide React |
| Image Processing | Sharp (PWA icon generation) |

## 📊 Database Schema

```prisma
model Booking {
  id        String   @id @default(cuid())
  name      String
  phone     String
  email     String?
  service   String
  doctor    String?
  date      DateTime
  notes     String?
  status    String   @default("pending")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🔐 Environment Variables

Lihat [`.env.example`](./.env.example) untuk detail lengkap.

## 📝 Scripts

```bash
bun run dev        # Development server
bun run build      # Production build
bun run start      # Production server
bun run lint       # ESLint
bun run db:push    # Push Prisma schema
bun run db:generate # Generate Prisma client
```

## 🚢 Deployment

### Vercel (Recommended)
1. Push ke GitHub
2. Import repo di [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy

### Docker / Self-hosted
```bash
bun run build
bun run start
```

## 📄 License

© 2026 Oktri Manessa Dental Clinic. All rights reserved.

## 🆘 Support

- 📧 Email: halo@omdc-dental.id
- 📱 WhatsApp: +62 812-3456-7890
- 🌐 Website: https://omdc-dental.id

---

Made with ❤️ in Bekasi, Indonesia
