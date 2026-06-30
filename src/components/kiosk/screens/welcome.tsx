"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import {
  UserPlus,
  QrCode,
  CreditCard,
  Sparkles,
  Users,
  Clock,
  ChevronRight,
} from "lucide-react";

type KioskMode = "welcome" | "walk-in" | "check-in" | "payment" | "ticket";

export function KioskWelcome({ onSelect }: { onSelect: (mode: KioskMode) => void }) {
  const { queue, clinicSettings } = useAppStore();
  const waitingCount = queue.filter((q) => q.status === "waiting").length;
  const servingCount = queue.filter((q) => q.status === "serving").length;

  const options = [
    {
      id: "walk-in" as const,
      title: "Pendaftaran Walk-In",
      subtitle: "Pasien baru atau tanpa booking",
      desc: "Daftar langsung di kiosk dan ambil nomor antrian",
      icon: UserPlus,
      color: "from-pink-500 to-rose-500",
      bg: "from-pink-50 to-rose-50",
      ring: "ring-pink-200",
    },
    {
      id: "check-in" as const,
      title: "Check-in Booking",
      subtitle: "Sudah punya janji temu",
      desc: "Scan QR atau masukkan kode booking",
      icon: QrCode,
      color: "from-fuchsia-500 to-pink-600",
      bg: "from-fuchsia-50 to-pink-50",
      ring: "ring-fuchsia-200",
    },
    {
      id: "payment" as const,
      title: "Pembayaran",
      subtitle: "Bayar tagihan perawatan",
      desc: "Bayar tunai, kartu, atau QRIS",
      icon: CreditCard,
      color: "from-rose-500 to-pink-700",
      bg: "from-rose-50 to-pink-50",
      ring: "ring-rose-200",
    },
  ];

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* Hero header */}
      <div className="flex items-center justify-between px-10 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 text-pink-600">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Selamat Datang</span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-extrabold text-pink-950 lg:text-4xl">
            Senyum sehat dimulai dari sini
          </h1>
          <p className="mt-1 text-sm text-pink-950/60">
            Sentuh salah satu opsi di bawah untuk memulai
          </p>
        </motion.div>

        {/* Live queue indicator */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-3"
        >
          <div className="rounded-2xl bg-white px-5 py-3 text-center shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-pink-950/55">
              <Clock className="h-3 w-3" />
              Antrian Sekarang
            </div>
            <div className="mt-1 font-display text-2xl font-extrabold text-pink-700">{servingCount}</div>
            <div className="text-[10px] text-pink-950/50">sedang dilayani</div>
          </div>
          <div className="rounded-2xl bg-white px-5 py-3 text-center shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-pink-950/55">
              <Users className="h-3 w-3" />
              Menunggu
            </div>
            <div className="mt-1 font-display text-2xl font-extrabold text-amber-600">{waitingCount}</div>
            <div className="text-[10px] text-pink-950/50">dalam antrian</div>
          </div>
        </motion.div>
      </div>

      {/* Main options — MIKA-style clean cards */}
      <div className="grid flex-1 grid-cols-3 gap-5 px-10 pb-8">
        {options.map((opt, i) => (
          <motion.button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 220, damping: 22 }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 text-left shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative flex-1">
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${opt.color} text-white shadow-sm`}>
                <opt.icon className="h-8 w-8" strokeWidth={2.2} />
              </div>
              <div className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                {opt.subtitle}
              </div>
              <h2 className="mt-1 font-display text-2xl font-extrabold text-gray-900">
                {opt.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {opt.desc}
              </p>
            </div>

            <div className={`relative mt-4 inline-flex items-center gap-2 self-start rounded-xl bg-gradient-to-r ${opt.color} px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-transform group-hover:gap-3`}>
              Mulai
              <ChevronRight className="h-4 w-4" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Footer info bar */}
      <div className="border-t border-pink-200/50 bg-white/70 px-10 py-3 backdrop-blur">
        <div className="flex items-center justify-between text-xs text-pink-950/60">
          <div className="flex items-center gap-4">
            <span>📍 {clinicSettings.address}</span>
            <span>📞 {clinicSettings.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span>Sistem aktif · {clinicSettings.openHours}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
