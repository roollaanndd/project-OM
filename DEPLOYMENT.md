# OMDC Production Deployment Guide

Comprehensive guide for deploying all 4 OMDC platforms to production.

## 📋 Pre-Deployment Checklist

### ✅ Code Quality
- [x] ESLint: 0 errors
- [x] TypeScript: strict mode enabled
- [x] No console.log in production code (except audit logs)
- [x] Error boundaries on all routes
- [x] Loading states (skeletons) on all async sections

### ✅ Security
- [x] CSP headers (Content Security Policy)
- [x] HSTS (HTTP Strict Transport Security)
- [x] X-Frame-Options: DENY
- [x] Rate limiting (5 req/min booking, 60 req/min API)
- [x] CSRF protection (same-origin + Capacitor origins)
- [x] SQL injection prevention (Prisma parameterized queries)
- [x] XSS prevention (sanitizeText, escapeHtml)
- [x] Input validation (Zod schemas + whitelist)
- [x] Bot detection (block sqlmap, nikto, nmap)
- [x] Session timeout (CMS: 30 min idle)
- [x] Password hashing (PBKDF2)
- [x] Audit logging

### ✅ Performance
- [x] Lazy loading (React.lazy + Suspense)
- [x] Code splitting per route
- [x] Image optimization (next/image, AVIF/WebP)
- [x] Font optimization (display: swap, variable fonts)
- [x] Compression (gzip/brotli via nginx)
- [x] Cache-Control immutable for static assets
- [x] Bundle analyzer available (`bun run analyze`)

### ✅ SEO
- [x] Dynamic metadata per page
- [x] JSON-LD structured data
- [x] sitemap.xml auto-generated
- [x] robots.txt auto-generated
- [x] OpenGraph + Twitter cards
- [x] Internal linking
- [x] Breadcrumbs

### ✅ Accessibility
- [x] Skip-to-content link
- [x] Focus management (keyboard vs mouse)
- [x] Reduced motion support
- [x] ARIA labels
- [x] Semantic HTML
- [x] Alt text on images

### ✅ PWA
- [x] Service Worker (v1.2.0)
- [x] Manifest.webmanifest
- [x] PWA icons (192, 512, maskable, apple-touch)
- [x] Offline fallback page
- [x] Install prompt
- [x] Push notification ready

### ✅ Offline Support (for Kiosk & Mobile App)
- [x] IndexedDB local database
- [x] API request queue (sync when online)
- [x] Auto-retry with exponential backoff
- [x] Service Worker caching

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended — Easiest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Or connect GitHub repo to Vercel dashboard
# https://vercel.com/new
```

**Environment variables to set in Vercel:**
- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — random 32-char string
- `NEXT_PUBLIC_APP_URL` — your domain
- `NEXT_PUBLIC_API_URL` — API URL (same as APP_URL for monolith)

**Vercel config**: `vercel.json` already included.

### Option 2: Docker + Nginx (Self-hosted)

```bash
# 1. Set environment variables
cp .env.example .env
# Edit .env with production values

# 2. Generate secrets
openssl rand -base64 32  # → NEXTAUTH_SECRET
openssl rand -base64 16  # → DB_PASSWORD
openssl rand -base64 16  # → REDIS_PASSWORD

# 3. Get SSL certificates (Let's Encrypt)
mkdir ssl
certbot certonly --standalone -d omdc.id -d www.omdc.id -d app.omdc.id -d kiosk.omdc.id -d admin.omdc.id
cp /etc/letsencrypt/live/omdc.id/fullchain.pem ssl/
cp /etc/letsencrypt/live/omdc.id/privkey.pem ssl/

# 4. Build and start
docker-compose up -d

# 5. Run database migration
docker exec omdc-app npx prisma db push
```

### Option 3: VPS with PM2

```bash
# 1. Clone repo
git clone https://github.com/roollaanndd/project-OM.git
cd project-OM

# 2. Install dependencies
bun install

# 3. Build
bun run build

# 4. Start with PM2
npm i -g pm2
pm2 start "bun run start" --name omdc
pm2 save
pm2 startup
```

---

## 📱 Native App Builds

### e-Kiosk APK (Android)

See: [`capacitor/kiosk/README.md`](./capacitor/kiosk/README.md)

```bash
cd capacitor/kiosk
npm install
npx cap add android
npx cap copy android
npx cap open android
# In Android Studio: Build > Generate Signed APK
```

**Kiosk-specific features:**
- ✅ Offline-first (IndexedDB + request queue)
- ✅ Kiosk mode lockdown (prevent exit)
- ✅ Keep screen awake
- ✅ Auto-sync when online

### Mobile App (Play Store + App Store)

See: [`capacitor/mobile/README.md`](./capacitor/mobile/README.md)

```bash
cd capacitor/mobile
npm install
npx cap add android
npx cap add ios
npx cap copy
```

**Store listing metadata**: already prepared in `capacitor/mobile/README.md`

---

## 🌐 Domain Setup

### DNS Records (Cloudflare recommended):

| Type | Name | Value |
|------|------|-------|
| A | `@` | Server IP |
| A | `app` | Server IP |
| A | `kiosk` | Server IP |
| A | `admin` | Server IP |
| CNAME | `www` | `omdc.id` |

### SSL: Let's Encrypt (free)
```bash
certbot certonly --standalone \
  -d omdc.id -d www.omdc.id \
  -d app.omdc.id -d kiosk.omdc.id -d admin.omdc.id
```

---

## 🗄️ Database Migration (SQLite → PostgreSQL)

```bash
# 1. Update DATABASE_URL in .env
DATABASE_URL="postgresql://omdc:password@localhost:5432/omdc?schema=public"

# 2. Push schema to PostgreSQL
bun run db:push

# 3. (Optional) Migrate existing data
# Use pgloader or custom script to transfer SQLite data
```

---

## 📊 Monitoring (Recommended)

### Error Tracking: Sentry
1. Create project at https://sentry.io
2. Set `SENTRY_DSN` environment variable
3. Install: `bun add @sentry/nextjs`

### Analytics: Plausible (privacy-friendly)
1. Self-host or use https://plausible.io
2. Add script to layout.tsx

### Uptime: UptimeRobot
1. Monitor `https://omdc.id/api/booking` (health check endpoint)
2. Alert on downtime

---

## 🔄 CI/CD (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install -g bun
      - run: bun install
      - run: bun run lint
      - run: bun run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## ✅ Post-Deployment Verification

After deployment, verify:

1. **Website**: https://omdc.id — loads with all sections
2. **Mobile App**: https://app.omdc.id — onboarding screen visible
3. **Kiosk**: https://kiosk.omdc.id — welcome screen with 3 options
4. **CMS**: https://admin.omdc.id — login screen with role selection
5. **API Health**: https://omdc.id/api/booking (GET) — returns JSON
6. **PWA Install**: Chrome address bar shows install button
7. **Offline**: Disconnect internet → website still loads from cache
8. **Security Headers**: https://securityheaders.com/?q=omdc.id (score A+)
9. **Lighthouse**: Chrome DevTools → Lighthouse → score 90+
10. **SSL**: https://www.ssllabs.com/ssltest/ (grade A+)

---

## 🆘 Troubleshooting

### Build fails
```bash
# Clear Next.js cache
rm -rf .next
bun run build
```

### Service Worker not updating
```bash
# Bump version in public/sw.js
# Change: const VERSION = "v1.3.0";
```

### Database connection error
```bash
# Check DATABASE_URL format
# PostgreSQL: postgresql://user:pass@host:5432/db?schema=public
# SQLite: file:./db/custom.db
```

### CSP blocking scripts
```bash
# Check browser console for CSP violations
# Add missing domains to proxy.ts buildSecurityHeaders()
```

---

**Last updated**: 2026-06-29
**Maintained by**: OMDC CTO
