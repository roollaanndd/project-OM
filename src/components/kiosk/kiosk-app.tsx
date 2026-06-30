"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { KioskShell } from "./kiosk-shell";
import { KioskWelcome } from "./screens/welcome";
import { KioskWalkIn } from "./screens/walk-in";
import { KioskCheckIn } from "./screens/check-in";
import { KioskPayment } from "./screens/payment";
import { KioskTicket } from "./screens/ticket";

type KioskMode = "welcome" | "walk-in" | "check-in" | "payment" | "ticket";

interface TicketData {
  ticketNumber: string;
  patientName: string;
  service: string;
  doctor?: string;
  doctorInitials?: string;
  doctorGradient?: string;
  queuePosition: number;
  estimatedWait: number;
  bookingId?: string;
}

// Idle timeout: 90 seconds without user interaction → reset to welcome
const IDLE_TIMEOUT_MS = 90_000;
// Show warning at 15 seconds remaining
const IDLE_WARNING_MS = 15_000;

export function KioskApp() {
  const [mode, setMode] = useState<KioskMode>("welcome");
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [showIdleWarning, setShowIdleWarning] = useState(false);

  // Idle tracking refs
  const lastActivityRef = useRef<number>(Date.now());
  const idleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetToWelcome = useCallback(() => {
    setMode("welcome");
    setTicket(null);
    setShowIdleWarning(false);
    lastActivityRef.current = Date.now();
  }, []);

  const recordActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    setShowIdleWarning(false);
  }, []);

  // Track user activity (mousemove, touch, click, keypress)
  useEffect(() => {
    const events = ["mousemove", "touchstart", "click", "keydown"];

    const handler = () => recordActivity();
    events.forEach((e) => window.addEventListener(e, handler, { passive: true }));

    // Check idle status every 2 seconds
    idleTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - lastActivityRef.current;
      if (elapsed >= IDLE_TIMEOUT_MS) {
        resetToWelcome();
      } else if (elapsed >= IDLE_TIMEOUT_MS - IDLE_WARNING_MS) {
        setShowIdleWarning(true);
      } else {
        setShowIdleWarning(false);
      }
    }, 2000);

    return () => {
      events.forEach((e) => window.removeEventListener(e, handler));
      if (idleTimerRef.current) clearInterval(idleTimerRef.current);
    };
  }, [recordActivity, resetToWelcome]);

  const handleWalkInComplete = (data: TicketData) => {
    setTicket(data);
    setMode("ticket");
    recordActivity();
  };

  const handleCheckInComplete = (data: TicketData) => {
    setTicket(data);
    setMode("ticket");
    recordActivity();
  };

  const switchMode = (m: KioskMode) => {
    setMode(m);
    recordActivity();
  };

  return (
    <KioskShell>
      {mode === "welcome" && <KioskWelcome onSelect={(m) => switchMode(m as KioskMode)} />}
      {mode === "walk-in" && (
        <KioskWalkIn onComplete={handleWalkInComplete} onBack={() => switchMode("welcome")} />
      )}
      {mode === "check-in" && (
        <KioskCheckIn onComplete={handleCheckInComplete} onBack={() => switchMode("welcome")} />
      )}
      {mode === "payment" && (
        <KioskPayment onComplete={() => switchMode("welcome")} onBack={() => switchMode("welcome")} />
      )}
      {mode === "ticket" && ticket && (
        <KioskTicket data={ticket} onDone={() => switchMode("welcome")} />
      )}

      {/* Idle warning modal */}
      <AnimatePresence>
        {showIdleWarning && mode !== "welcome" && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] flex items-center justify-center bg-gray-900/70 backdrop-blur-sm"
            onClick={recordActivity}
          >
            <m.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="mx-6 max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl"
            >
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                ⏰
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900">
                Apakah Anda masih di sini?
              </h3>
              <p className="mt-1.5 text-sm text-gray-900/65">
                Kiosk akan kembali ke beranda dalam 15 detik jika tidak ada aktivitas.
              </p>
              <button
                onClick={recordActivity}
                className="mt-4 w-full rounded-full bg-gradient-to-r from-pink-600 to-gray-500 py-2.5 text-sm font-bold text-white"
              >
                Saya masih di sini
              </button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </KioskShell>
  );
}
