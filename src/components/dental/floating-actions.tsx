"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle, X } from "lucide-react";

/**
 * Floating action buttons:
 * - WhatsApp quick chat (always visible)
 * - Scroll-to-top (appears after scrolling past hero)
 */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <m.button
            key="scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Kembali ke atas"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-700 shadow-soft-pink ring-1 ring-gray-200 transition-colors hover:bg-gray-50"
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.92 }}
          >
            <ArrowUp className="h-5 w-5" />
          </m.button>
        )}
      </AnimatePresence>

      {/* WhatsApp expandable */}
      <div className="relative">
        <AnimatePresence>
          {expanded && (
            <m.div
              key="wa-card"
              className="absolute bottom-16 right-0 w-64 origin-bottom-right overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft-pink"
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 10 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
            >
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-3 text-white">
                <div className="text-sm font-bold">Chat dengan OMDC</div>
                <div className="text-xs text-white/85">Biasanya membalas dalam 5 menit</div>
              </div>
              <div className="p-4">
                <p className="text-xs text-foreground/70">
                  Halo! 👋 Ada yang bisa kami bantu seputar perawatan gigi Anda? Tim kami siap
                  membantu menjawab pertanyaan dan menjadwalkan janji temu.
                </p>
                <a
                  href="https://wa.me/6281234567890?text=Halo%20OMDC%2C%20saya%20ingin%20konsultasi%20perawatan%20gigi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
                >
                  <MessageCircle className="h-4 w-4" />
                  Mulai Chat
                </a>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        <m.button
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? "Tutup chat WhatsApp" : "Buka chat WhatsApp"}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-soft-pink ring-4 ring-emerald-500/15"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          animate={{ boxShadow: ["0 0 0 0 rgba(16,185,129,0.45)", "0 0 0 14px rgba(16,185,129,0)"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {expanded ? (
              <m.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </m.span>
            ) : (
              <m.span
                key="msg"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-6 w-6" />
              </m.span>
            )}
          </AnimatePresence>
        </m.button>
      </div>
    </div>
  );
}
