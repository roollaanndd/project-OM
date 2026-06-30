"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { ArrowRight, Calendar, FileText, Wallet, Gift, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    icon: Calendar,
    title: "Booking Online",
    desc: "Buat janji temu dengan dokter gigi pilihan Anda dalam 5 langkah mudah. Pilih layanan, dokter, dan waktu yang sesuai.",
    color: "from-pink-500 to-rose-500",
    bg: "from-pink-50 to-rose-50",
  },
  {
    icon: FileText,
    title: "Rekam Medis Digital",
    desc: "Akses riwayat perawatan gigi Anda kapan saja, di mana saja. Termasuk diagnosis, resep, dan tooth chart interaktif.",
    color: "from-teal-500 to-cyan-500",
    bg: "from-teal-50 to-cyan-50",
  },
  {
    icon: Wallet,
    title: "Pembayaran Mudah",
    desc: "Bayar tagihan perawatan dengan GoPay, OVO, DANA, QRIS, atau kartu kredit. Cicilan 0% tersedia.",
    color: "from-violet-500 to-purple-500",
    bg: "from-violet-50 to-purple-50",
  },
  {
    icon: Gift,
    title: "Loyalty Rewards",
    desc: "Kumpulkan poin dari setiap perawatan dan tukarkan dengan scaling gratis, voucher, atau merchandise eksklusif.",
    color: "from-amber-500 to-orange-500",
    bg: "from-amber-50 to-orange-50",
  },
];

export function OnboardingScreen({ onComplete }: { onComplete: () => void }) {
  const [slide, setSlide] = useState(0);
  const current = SLIDES[slide];
  const isLast = slide === SLIDES.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setSlide((s) => s + 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-white">
      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute right-5 top-5 z-20 text-sm font-semibold text-gray-400 hover:text-gray-600"
      >
        Lewati
      </button>

      {/* Animated background */}
      <AnimatePresence mode="wait">
        <m.div
          key={slide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={cn("absolute inset-0 bg-gradient-to-b opacity-50", current.bg)}
        />
      </AnimatePresence>

      {/* Floating decorative shapes */}
      <m.div
        className="absolute right-10 top-32 h-32 w-32 rounded-full opacity-20 blur-2xl"
        animate={{
          background: ["#EC4899", "#14B8A6", "#8B5CF6", "#F59E0B"],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <m.div
            key={slide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            {/* Animated icon */}
            <m.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className={cn(
                "flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br shadow-lg mb-8",
                current.color,
              )}
            >
              <current.icon className="h-14 w-14 text-white" strokeWidth={1.8} />
            </m.div>

            {/* Floating sparkles around icon */}
            {[0, 1, 2].map((i) => (
              <m.div
                key={i}
                className="absolute text-2xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                  x: [0, (i - 1) * 60],
                  y: [0, -40 - i * 20],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut",
                }}
              >
                <Sparkles className="h-5 w-5 text-pink-400" />
              </m.div>
            ))}

            <h2 className="font-display text-2xl font-extrabold text-gray-900">
              {current.title}
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-500">
              {current.desc}
            </p>
          </m.div>
        </AnimatePresence>
      </div>

      {/* Bottom: dots + button */}
      <div className="relative z-10 px-8 pb-10">
        {/* Progress dots */}
        <div className="mb-6 flex justify-center gap-2">
          {SLIDES.map((_, i) => (
            <m.div
              key={i}
              animate={{
                width: i === slide ? 24 : 8,
                opacity: i === slide ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
              className={cn(
                "h-2 rounded-full",
                i === slide ? "bg-pink-500" : "bg-gray-300",
              )}
              style={{ width: i === slide ? 24 : 8 }}
            />
          ))}
        </div>

        {/* CTA Button */}
        <m.button
          onClick={handleNext}
          whileTap={{ scale: 0.97 }}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold text-white shadow-md transition-all",
            "bg-gradient-to-r from-pink-600 to-rose-500",
          )}
        >
          {isLast ? "Mulai Sekarang" : "Lanjut"}
          <ArrowRight className="h-5 w-5" />
        </m.button>

        {/* Trust badge */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          Data Anda aman & terenkripsi
        </div>
      </div>
    </div>
  );
}
