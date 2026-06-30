"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Smartphone, RefreshCw, WifiOff, Bell } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

interface PermissionStatus extends EventTarget {
  state: "granted" | "denied" | "prompt" | "default";
}

/**
 * PWA controller component.
 * - Registers service worker on mount
 * - Listens for `beforeinstallprompt` and shows an install banner
 * - Detects when app is running standalone (installed) and hides banner
 * - Shows "Update available" banner when a new SW version is waiting
 * - Prompts user to enable notifications (permission-based)
 * - Shows offline banner when network drops
 */
export function PwaController() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [updateWaiting, setUpdateWaiting] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [notifPerm, setNotifPerm] = useState<PermissionStatus["state"] | "unsupported">("unsupported");
  const [showOffline, setShowOffline] = useState(false);

  // 1. Register service worker with proper cache-busting strategy.
  //    PWA is now safe to enable because:
  //    - SW version is bumped on every deploy
  //    - Old caches are aggressively cleaned
  //    - updateViaCache: 'none' ensures fresh SW script
  //    - Auto-reload on controller change
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const setup = async () => {
      try {
        // Clean up any stale caches from previous SW versions
        const cacheKeys = await caches.keys();
        await Promise.all(
          cacheKeys
            .filter((k) => k.startsWith("omdc-") && !k.includes("v1.2.0"))
            .map((k) => caches.delete(k)),
        );

        // Register SW with aggressive update settings
        const reg = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });

        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              // Auto-apply update immediately
              newWorker.postMessage("SKIP_WAITING");
              setUpdateWaiting(true);
            }
          });
        });

        // Check for updates every 10 minutes
        setInterval(() => reg.update(), 10 * 60 * 1000);
      } catch (err) {
        console.warn("[PWA] SW registration failed:", err);
      }
    };

    setup();

    // Auto-reload when new SW takes over
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });
  }, []);

  // 2. Detect standalone mode (deferred to avoid synchronous setState in effect)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    // Defer setState to a microtask to avoid cascading renders warning
    Promise.resolve().then(() => setIsStandalone(standalone));
  }, []);

  // 3. Install prompt capture
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
      const dismissed = sessionStorage.getItem("omdc-install-dismissed");
      if (!dismissed && !isStandalone) {
        setTimeout(() => setShowInstall(true), 3000);
      }
    };
    const onInstalled = () => {
      setShowInstall(false);
      setInstallEvent(null);
      setIsStandalone(true);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, [isStandalone]);

  // 4. Notification permission status (deferred setState)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) {
      Promise.resolve().then(() => setNotifPerm("unsupported"));
      return;
    }
    const perm = Notification.permission as PermissionStatus["state"];
    Promise.resolve().then(() => setNotifPerm(perm));
  }, []);

  // 5. Online/offline detection (deferred setState for initial value)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setShowOffline(!navigator.onLine);
    Promise.resolve().then(update);
    const onOnline = () => setShowOffline(false);
    const onOffline = () => setShowOffline(true);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  const handleInstall = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === "accepted") {
      setIsStandalone(true);
    }
    setInstallEvent(null);
    setShowInstall(false);
  };

  const dismissInstall = () => {
    setShowInstall(false);
    sessionStorage.setItem("omdc-install-dismissed", "1");
  };

  const applyUpdate = () => {
    navigator.serviceWorker.controller?.postMessage("SKIP_WAITING");
    setUpdateWaiting(false);
  };

  const enableNotifications = async () => {
    if (!("Notification" in window)) return;
    const perm = await Notification.requestPermission();
    setNotifPerm(perm as PermissionStatus["state"]);
    if (perm === "granted" && "serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.ready;
      reg.showNotification("OMDC 🦷", {
        body: "Notifikasi aktif! Anda akan menerima pengingat janji & promo.",
        icon: "/icons/icon-192.png",
        badge: "/icons/icon-192-maskable.png",
      });
    }
  };

  return (
    <>
      {/* Offline banner */}
      <AnimatePresence>
        {showOffline && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            className="fixed inset-x-0 top-0 z-[100] bg-amber-500 px-4 py-2 text-center text-xs font-bold text-white shadow-md"
          >
            <span className="inline-flex items-center gap-1.5">
              <WifiOff className="h-3.5 w-3.5" />
              Anda sedang offline. Beberapa fitur mungkin tidak tersedia.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Update available banner */}
      <AnimatePresence>
        {updateWaiting && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            className="fixed inset-x-0 top-0 z-[100] bg-emerald-600 px-4 py-2 text-center text-xs font-bold text-white shadow-md"
          >
            <span className="inline-flex items-center gap-1.5">
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              Versi baru tersedia.
            </span>
            <button
              onClick={applyUpdate}
              className="ml-2 rounded-full bg-white px-3 py-0.5 text-[10px] font-bold text-emerald-700"
            >
              Update sekarang
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Install prompt */}
      <AnimatePresence>
        {showInstall && installEvent && !isStandalone && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="fixed bottom-4 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 overflow-hidden rounded-2xl border border-pink-200 bg-white p-4 shadow-soft-pink"
          >
            <button
              onClick={dismissInstall}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-pink-50 text-pink-700"
              aria-label="Tutup"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-start gap-3 pr-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 text-white">
                <Smartphone className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-pink-950">Pasang OMDC App</div>
                <p className="mt-0.5 text-xs leading-relaxed text-pink-950/65">
                  Akses lebih cepat, notifikasi pengingat, dan bisa dipakai offline. Tanpa perlu Play Store.
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={handleInstall}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-4 py-1.5 text-xs font-bold text-white shadow-sm"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Pasang
                  </button>
                  <button
                    onClick={dismissInstall}
                    className="rounded-full bg-pink-50 px-4 py-1.5 text-xs font-bold text-pink-700"
                  >
                    Nanti saja
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification opt-in prompt (only when standalone) */}
      <AnimatePresence>
        {notifPerm === "default" &&
          !sessionStorage.getItem("omdc-notif-dismissed") &&
          isStandalone && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="fixed bottom-4 left-1/2 z-[90] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 overflow-hidden rounded-2xl border border-pink-200 bg-white p-4 shadow-soft-pink"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white">
                  <Bell className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-pink-950">Aktifkan Notifikasi</div>
                  <p className="mt-0.5 text-xs leading-relaxed text-pink-950/65">
                    Pengingat janji temu, status antrian, dan promo eksklusif langsung ke perangkat Anda.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={enableNotifications}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm"
                    >
                      <Bell className="h-3.5 w-3.5" />
                      Aktifkan
                    </button>
                    <button
                      onClick={() => {
                        sessionStorage.setItem("omdc-notif-dismissed", "1");
                        setNotifPerm("denied");
                      }}
                      className="rounded-full bg-pink-50 px-4 py-1.5 text-xs font-bold text-pink-700"
                    >
                      Nanti
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
      </AnimatePresence>
    </>
  );
}
