# OMDC e-Kiosk — Android APK Build Guide

This guide explains how to package the e-Kiosk as a standalone Android APK using Capacitor.

## Prerequisites

- Node.js 18+
- Android Studio (latest)
- Java JDK 17

## Setup

```bash
# Install Capacitor CLI
npm install -g @capacitor/cli

# Install Capacitor dependencies
cd capacitor/kiosk
npm install @capacitor/core @capacitor/android @capacitor/app @capacitor/splash-screen @capacitor/status-bar @capacitor/keep-awake

# Initialize Android project
npx cap add android
```

## Build Steps

### 1. Build Next.js static export

The kiosk route needs to be exported as static HTML. Add to `next.config.ts`:

```ts
// For kiosk build only:
// output: 'export',
// exportPathMap: async function() {
//   return { '/kiosk': { page: '/kiosk' } }
// }
```

Or use a separate build config:

```bash
# Build kiosk as static export
NEXT_PUBLIC_PLATFORM=kiosk NEXT_PUBLIC_API_URL=https://api.omdc.id \
  npx next build --output export
```

### 2. Copy web assets to Capacitor

```bash
# Copy built files to native project
npx cap copy android
```

### 3. Open in Android Studio

```bash
npx cap open android
```

### 4. Configure Kiosk Mode

In `AndroidManifest.xml`, add kiosk-specific flags:

```xml
<activity
    android:name=".MainActivity"
    android:screenOrientation="landscape"
    android:configChanges="orientation|screenSize"
    android:launchMode="singleTask"
    android:stateNotNeeded="true"
    android:windowSoftInputMode="adjustResize">
    
    <!-- Make this a home launcher (kiosk mode) -->
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.HOME" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>
```

### 5. Generate APK

```bash
# Debug APK (for testing)
./gradlew assembleDebug

# Release APK (for production)
./gradlew assembleRelease

# Or via Android Studio: Build > Generate Signed Bundle / APK
```

### 6. Kiosk Mode Lockdown

For true kiosk mode (prevent user from leaving app):

```kotlin
// In MainActivity.kt
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Pin the app (Android 5.0+)
        startLockTask()
        
        // Set immersive mode (hide navigation)
        window.decorView.systemUiVisibility = (
            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            or View.SYSTEM_UI_FLAG_FULLSCREEN
            or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
        )
    }
}
```

## Offline Support

The e-Kiosk APK includes:
- ✅ **IndexedDB** — local data persistence (queue, bookings, patients)
- ✅ **Service Worker** — caches app shell for offline use
- ✅ **API Client** — queues requests when offline, syncs when online
- ✅ **Auto-retry** — exponential backoff on network errors

When the kiosk goes offline:
1. Walk-in registrations are saved to IndexedDB
2. Queue entries are stored locally
3. When connection returns, all data syncs to server automatically

## Configuration

Edit `capacitor.config.json`:
- `appId`: Android package name (must be unique)
- `url`: Your kiosk deployment URL (or remove for fully offline mode)
- `keepAwake`: Prevents screen from sleeping

## Deployment

### Install APK on kiosk device:
```bash
# Enable ADB debugging on the device
adb install -r android/app/build/outputs/apk/release/app-release.apk

# Set as device owner (for kiosk mode lockdown)
adb shell dpm set-device-owner id.omdc.kiosk/.DeviceAdmin
```

### MDM (Mobile Device Management):
For multi-device deployment, use:
- **Android Enterprise** — managed kiosk mode
- **Hexnode MDM** — kiosk lockdown policy
- **VMware Workspace ONE** — single-app mode
