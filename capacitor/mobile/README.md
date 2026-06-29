# OMDC Mobile App — Play Store & App Store Build Guide

This guide explains how to package the OMDC Patient App for Google Play Store and Apple App Store using Capacitor.

## Prerequisites

### For Android (Play Store):
- Node.js 18+
- Android Studio
- Java JDK 17
- Google Play Developer account ($25 one-time fee)

### For iOS (App Store):
- macOS (required for Xcode)
- Xcode 15+
- Apple Developer account ($99/year)
- CocoaPods

## Setup

```bash
# Install Capacitor CLI globally
npm install -g @capacitor/cli

# Install dependencies
cd capacitor/mobile
npm install @capacitor/core @capacitor/android @capacitor/ios \
  @capacitor/app @capacitor/splash-screen @capacitor/status-bar \
  @capacitor/push-notifications @capacitor/local-notifications \
  @capacitor/haptics @capacitor/share

# Add platforms
npx cap add android
npx cap add ios
```

## Build Steps

### 1. Build Next.js for Mobile App

The mobile app route (`/app`) needs to be the entry point:

```bash
# Option A: Build as PWA first, then wrap with Capacitor
NEXT_PUBLIC_PLATFORM=mobile NEXT_PUBLIC_API_URL=https://api.omdc.id \
  npx next build

# Option B: Static export (for fully offline-capable app)
# Configure next.config.ts with output: 'export' for this build
```

### 2. Copy to native projects

```bash
npx cap copy android
npx cap copy ios
```

### 3. Android (Play Store)

```bash
# Open in Android Studio
npx cap open android

# In Android Studio:
# 1. Update app version in build.gradle (app)
# 2. Generate signed APK/AAB: Build > Generate Signed Bundle / APK
# 3. Choose: Android App Bundle (.aab) — required for Play Store
# 4. Create or select keystore
# 5. Build release variant

# Or via CLI:
cd android
./gradlew bundleRelease
```

#### Play Store Upload:
1. Go to https://play.google.com/console
2. Create new app → fill store listing
3. Upload `.aab` file to Production track
4. Complete content rating questionnaire
5. Set pricing (free)
6. Submit for review (1-3 days)

### 4. iOS (App Store)

```bash
# Open in Xcode (macOS only)
npx cap open ios

# In Xcode:
# 1. Set Bundle Identifier: id.omdc.patientapp
# 2. Set version & build number
# 3. Configure signing (Apple Developer account)
# 4. Product > Archive
# 5. Window > Organizer > Distribute App > App Store Connect
```

#### App Store Upload:
1. Go to https://appstoreconnect.apple.com
2. Create new app → fill metadata
3. Wait for processing (Xcode upload)
4. Add screenshots (required sizes per device)
5. Submit for review (1-7 days)

## App Store Metadata

### App Name
```
OMDC Dental — Klinik Gigi Online
```

### Short Description (80 chars)
```
Booking gigi online, rekam medis digital, pembayaran mudah. Your Smile, Our Passion.
```

### Full Description (4000 chars)
```
OMDC (Oktri Manessa Dental Clinic) — aplikasi resmi untuk pasien klinik gigi OMDC.

FITUR UTAMA:
✅ Booking Online — Buat janji temu dengan dokter gigi pilihan Anda
✅ Rekam Medis Digital — Akses riwayat perawatan kapan saja
✅ Pembayaran Mudah — Bayar tagihan via GoPay, OVO, DANA, QRIS, kartu kredit
✅ Loyalty Rewards — Kumpulkan poin & tukar dengan perawatan gratis
✅ Multi-Cabang — Pilih cabang OMDC terdekat (Bekasi, Jakarta, Tangerang)
✅ Pengingat Janji — Notifikasi otomatis sebelum janji temu
✅ Mode Offline — Akses data bahkan tanpa internet

KENAPA OMDC?
• 10.000+ pasien bahagia sejak 2015
• 12 dokter spesialis bersertifikat
• Rating 4.9/5 dari 2.400+ ulasan
• ISO 9001:2015 tersertifikasi
• Sterilisasi standar rumah sakit
• Buka 7 hari seminggu

LAYANAN:
• Scaling & Polishing
• Pemutihan Gigi (Whitening)
• Kawat Gigi (Behel) — Metal, Keramik, Clear Aligner
• Mahkota & Gigi Palsu
• Root Canal
• Dental Kids (khusus anak)
• Tambal Gigi Estetik
• Implant Gigi

Download sekarang dan mulai perjalanan senyum sehat Anda!

Your Smile, Our Passion.
```

### Keywords
```
dokter gigi, klinik gigi, behel, scaling, implant, whitening, rekam medis, booking online
```

### Category
```
Medical
```

### Content Rating
```
Everyone (no objectionable content)
```

## Privacy Policy URL
```
https://omdc.id/privacy-policy
```

## Required Screenshots

### Android (Play Store):
- Phone: 1080 x 1920 px (min 2, max 8)
- 7-inch tablet: 1200 x 1920 px (optional)
- 10-inch tablet: 1536 x 2048 px (optional)

### iOS (App Store):
- iPhone 6.7" (1290 x 2796) — required
- iPhone 6.5" (1242 x 2688) — required
- iPad 12.9" (2048 x 2732) — required if iPad supported

## Push Notifications Setup

### Android (FCM):
1. Create Firebase project → https://console.firebase.google.com
2. Add Android app with package `id.omdc.patientapp`
3. Download `google-services.json` → put in `android/app/`
4. Get Server Key → set as `FCM_SERVER_KEY` env var

### iOS (APNs):
1. Apple Developer → Certificates → create APNs key
2. Upload to Firebase Cloud Messaging
3. Configure push capabilities in Xcode

## Offline Support

The mobile app includes:
- ✅ IndexedDB for local data persistence
- ✅ Service Worker for app shell caching
- ✅ API request queue (syncs when online)
- ✅ Cached booking history accessible offline

## Updates

### Play Store Updates:
- Bump version in `build.gradle`
- Build new `.aab`
- Upload to Play Console → new release

### App Store Updates:
- Bump version in Xcode
- Archive → upload
- App Store Connect → new version

## App Signing

### Android:
- Use Play App Signing (recommended)
- Upload your keystore to Play Console
- Google re-signs with their key

### iOS:
- Use Automatic Signing in Xcode
- Apple manages certificates
