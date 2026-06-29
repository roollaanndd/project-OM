/* OMDC Service Worker
 * Version: 1.0.0
 *
 * Caching strategies:
 * - App shell: cache-first (HTML, JS, CSS)
 * - Static assets (icons, images): cache-first with network fallback
 * - API calls: network-first with cache fallback (stale-while-revalidate)
 * - Fonts: cache-first (long-lived)
 */

const VERSION = "v1.2.0";
const APP_SHELL_CACHE = `omdc-shell-${VERSION}`;
const ASSETS_CACHE = `omdc-assets-${VERSION}`;
const API_CACHE = `omdc-api-${VERSION}`;
const FONT_CACHE = `omdc-fonts-${VERSION}`;

const APP_SHELL = [
  "/",
  "/offline",
  "/manifest.webmanifest",
  "/favicon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/apple-touch-icon.png",
];

const PRECACHE_URLS = [
  ...APP_SHELL,
  "/icons/icon-192-maskable.png",
  "/icons/icon-512-maskable.png",
  "/icons/og-image.png",
];

// ============ INSTALL: pre-cache app shell ============
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(APP_SHELL_CACHE);
      await Promise.all(
        PRECACHE_URLS.map(async (url) => {
          try {
            await cache.add(new Request(url, { cache: "reload" }));
          } catch (e) {
            console.warn(`[SW] Precache miss: ${url}`, e.message);
          }
        }),
      );
    })(),
  );
});

// ============ ACTIVATE: cleanup old caches ============
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter(
            (key) =>
              key.startsWith("omdc-") &&
              ![APP_SHELL_CACHE, ASSETS_CACHE, API_CACHE, FONT_CACHE].includes(key),
          )
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
      console.log(`[SW] Activated ${VERSION}`);
    })(),
  );
});

// ============ FETCH: routing per resource type ============
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET
  if (request.method !== "GET") return;

  // Skip cross-origin requests (except fonts.googleapis.com & fonts.gstatic.com)
  const isSameOrigin = url.origin === self.location.origin;
  const isFont =
    url.origin === "https://fonts.googleapis.com" ||
    url.origin === "https://fonts.gstatic.com";

  if (!isSameOrigin && !isFont) return;

  // Skip Next.js HMR & dev requests
  if (url.pathname.startsWith("/_next/webpack-hmr")) return;

  // ====== Navigation requests: network-first, fallback to cached "/" or offline ======
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(APP_SHELL_CACHE);
          cache.put(request, fresh.clone());
          return fresh;
        } catch (err) {
          const cached = await caches.match(request);
          if (cached) return cached;
          const fallback = await caches.match("/");
          if (fallback) return fallback;
          return caches.match("/offline");
        }
      })(),
    );
    return;
  }

  // ====== Fonts: cache-first long-lived ======
  if (isFont || url.pathname.includes("font")) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        try {
          const fresh = await fetch(request);
          if (fresh && fresh.ok) {
            const cache = await caches.open(FONT_CACHE);
            cache.put(request, fresh.clone());
          }
          return fresh;
        } catch (err) {
          return cached || Response.error();
        }
      })(),
    );
    return;
  }

  // ====== API calls: stale-while-revalidate ======
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(API_CACHE);
        const cached = await cache.match(request);
        const networkFetch = fetch(request)
          .then((fresh) => {
            if (fresh && fresh.ok) {
              cache.put(request, fresh.clone());
            }
            return fresh;
          })
          .catch(() => cached);
        return cached || networkFetch;
      })(),
    );
    return;
  }

  // =====_ Static assets (icons, images, _next/static): cache-first ======
  if (
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/_next/image") ||
    /\.(?:png|jpg|jpeg|svg|webp|gif|ico|woff2?)$/i.test(url.pathname)
  ) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        try {
          const fresh = await fetch(request);
          if (fresh && (fresh.ok || fresh.type === "opaque")) {
            const cache = await caches.open(ASSETS_CACHE);
            cache.put(request, fresh.clone());
          }
          return fresh;
        } catch (err) {
          return cached || Response.error();
        }
      })(),
    );
    return;
  }

  // Default: try network, fallback to cache
  event.respondWith(
    (async () => {
      try {
        return await fetch(request);
      } catch (err) {
        const cached = await caches.match(request);
        return cached || Response.error();
      }
    })(),
  );
});

// ============ MESSAGE: skipWaiting trigger from page ============
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// ============ PUSH: notification handler (basic) ============
self.addEventListener("push", (event) => {
  let payload = { title: "OMDC", body: "Anda memiliki notifikasi baru" };
  try {
    if (event.data) payload = { ...payload, ...event.data.json() };
  } catch (e) {
    if (event.data) payload.body = event.data.text();
  }

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192-maskable.png",
      vibrate: [100, 50, 100],
      data: { url: payload.url || "/" },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    (async () => {
      const allClients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });
      const targetUrl = event.notification.data?.url || "/";
      for (const client of allClients) {
        if (client.url === targetUrl && "focus" in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })(),
  );
});
