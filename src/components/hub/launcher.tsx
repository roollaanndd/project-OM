"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import {
  Globe,
  Smartphone,
  ArrowRight,
  Sparkles,
  Calendar,
  FileText,
  CreditCard,
  User,
  Monitor,
  LayoutDashboard,
  Users,
  ListOrdered,
  Wallet,
  Palette,
  Shield,
  ChevronRight,
} from "lucide-react";

export function HubLauncher() {
  const { setView, queue, walkInPatients } = useAppStore();

  const waitingCount = queue.filter((q) => q.status === "waiting").length;
  const servingCount = queue.filter((q) => q.status === "serving").length;
  const kioskRegistrations = walkInPatients.length;

  const cards = [
    {
      id: "website" as const,
      title: "Website Klinik",
      subtitle: "Marketing Site",
      desc: "Landing page lengkap untuk calon pasien dengan informasi layanan, dokter, harga, dan booking form.",
      icon: Globe,
      color: "from-pink-500 to-rose-500",
      bg: "from-pink-50 to-rose-50",
      features: ["9 section animasi premium", "Hero, Layanan, FAQ", "Splash screen + scroll progress"],
      badge: "Public",
    },
    {
      id: "app" as const,
      title: "Mobile App",
      subtitle: "Patient App",
      desc: "Aplikasi pasien untuk booking online, rekam medis digital, pembayaran cashless, dan loyalty rewards.",
      icon: Smartphone,
      color: "from-rose-500 to-fuchsia-600",
      bg: "from-rose-50 to-fuchsia-50",
      features: ["Booking 5-step", "Rekam medis + tooth chart", "Multi payment methods"],
      badge: "Pasien",
      accent: <Calendar className="h-3 w-3" />,
    },
    {
      id: "kiosk" as const,
      title: "e-Kiosk",
      subtitle: "Self-Service Kiosk",
      desc: "Kiosk layar sentuh di klinik untuk walk-in registration, check-in booking, dan pembayaran.",
      icon: Monitor,
      color: "from-fuchsia-500 to-pink-600",
      bg: "from-fuchsia-50 to-pink-50",
      features: ["Walk-in registration", "Booking check-in via QR", "Pembayaran multi-method"],
      badge: `${kioskRegistrations} walk-in`,
      liveStats: [
        { label: "Antrian menunggu", value: waitingCount, color: "text-amber-600" },
        { label: "Dilayani", value: servingCount, color: "text-emerald-600" },
      ],
    },
    {
      id: "cms" as const,
      title: "CMS Admin",
      subtitle: "Control Panel",
      desc: "Dashboard manajemen dengan multi-roles: admin, dokter, resepsionis, dan finance.",
      icon: LayoutDashboard,
      color: "from-pink-600 to-rose-700",
      bg: "from-pink-50 to-rose-50",
      features: ["Real-time queue monitor", "Finance & reports", "Website editor + settings"],
      badge: "Staff",
      accent: <Shield className="h-3 w-3" />,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Decorative blobs */}
      <motion.div
        className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-pink-300/30 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-rose-300/30 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-8 lg:px-8 lg:py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 48 48" className="h-12 w-12 drop-shadow-[0_4px_12px_rgba(236,72,153,0.4)]">
              <defs>
                <linearGradient id="hub-shield" x1="0" y1="0" x2="48" y2="48">
                  <stop stopColor="#9D174D" />
                  <stop offset="0.5" stopColor="#DB2777" />
                  <stop offset="1" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              <path d="M24 2l18 6v14c0 12-8 20-18 24C14 42 6 34 6 22V8l18-6z" fill="url(#hub-shield)" />
              <path d="M24 12c-3.5 0-5 1.4-7.5 1.4-2 0-4 1-4 4.6 0 4 1.4 6 2.5 9.4 0.8 2.6 1.4 7.4 3 7.4 1.5 0 1.6-3.4 2.4-6 0.6-1.8 1.1-2.8 3.6-2.8s3 1 3.6 2.8c0.8 2.6 0.9 6 2.4 6 1.6 0 2.2-4.8 3-7.4 1.1-3.4 2.5-5.4 2.5-9.4 0-3.6-2-4.6-4-4.6C29 13.4 27.5 12 24 12z" fill="#FFFFFF" />
            </svg>
            <div>
              <div className="font-display text-3xl font-extrabold tracking-tight">
                <span className="text-gradient-pink">OMDC</span>
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-700/70">
                Oktri Manessa Dental Clinic
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-pink-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-pink-700 backdrop-blur">
            <Sparkles className="h-3 w-3" />
            Project Hub · 4 Platforms
          </div>
        </motion.header>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-8 max-w-3xl text-center lg:mt-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold text-pink-700 shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-500" />
            </span>
            Sistem terintegrasi penuh · Real-time sync
          </div>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-pink-950 sm:text-5xl lg:text-6xl">
            Empat platform,
            <br />
            <span className="text-gradient-pink">satu ekosistem</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-pink-950/65 sm:text-lg">
            Website untuk calon pasien, mobile app untuk pasien existing, e-Kiosk untuk self-service
            di klinik, dan CMS untuk staff. Semua data tersinkron real-time.
          </p>
        </motion.div>

        {/* 4 cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14">
          {cards.map((card, i) => (
            <motion.button
              key={card.id}
              onClick={() => setView(card.id)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`group relative overflow-hidden rounded-3xl border border-pink-200 bg-gradient-to-br ${card.bg} p-6 text-left shadow-lg transition-all hover:shadow-2xl lg:p-7`}
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/40 transition-transform duration-500 group-hover:scale-150" />
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/30" />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-white shadow-md`}>
                    <card.icon className="h-7 w-7" strokeWidth={2.2} />
                  </div>
                  <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold text-pink-700 backdrop-blur">
                    {card.badge}
                  </span>
                </div>

                <div className="mt-4 text-xs font-bold uppercase tracking-wider text-pink-700">
                  {card.subtitle}
                </div>
                <h3 className="mt-1 font-display text-2xl font-extrabold text-pink-950">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-pink-950/65">
                  {card.desc}
                </p>

                {/* Features */}
                <ul className="mt-4 space-y-1.5">
                  {card.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-pink-950/65">
                      <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Live stats (for kiosk) */}
                {card.liveStats && (
                  <div className="mt-4 flex gap-2">
                    {card.liveStats.map((s) => (
                      <div key={s.label} className="flex-1 rounded-xl bg-white/80 p-2 text-center backdrop-blur">
                        <div className={`font-display text-xl font-extrabold ${s.color}`}>{s.value}</div>
                        <div className="text-[10px] text-pink-950/55">{s.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className={`mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${card.color} px-5 py-2.5 text-sm font-bold text-white shadow-md transition-transform group-hover:gap-3`}>
                  Buka {card.title}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Integration flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 rounded-3xl border border-pink-200 bg-white/60 p-6 backdrop-blur lg:mt-14"
        >
          <div className="text-center">
            <h3 className="font-display text-lg font-bold text-pink-950">
              Alur data terintegrasi
            </h3>
            <p className="mt-1 text-sm text-pink-950/55">
              Bagaimana data mengalir antar platform secara real-time
            </p>
          </div>

          <div className="mt-6 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:justify-between">
            <FlowStep icon={Globe} title="Website" desc="Calon pasien isi booking form" color="from-pink-500 to-rose-500" />
            <FlowArrow />
            <FlowStep icon={Smartphone} title="Mobile App" desc="Pasien booking & lihat rekam medis" color="from-rose-500 to-fuchsia-600" />
            <FlowArrow />
            <FlowStep icon={Monitor} title="e-Kiosk" desc="Check-in & ambil antrian" color="from-fuchsia-500 to-pink-600" />
            <FlowArrow />
            <FlowStep icon={LayoutDashboard} title="CMS" desc="Staff kelola antrian & data" color="from-pink-600 to-rose-700" />
          </div>
        </motion.div>

        {/* Bottom info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-auto pt-8 text-center text-xs text-pink-950/50"
        >
          OMDC · Your Smile, Our Passion · 4 platform terintegrasi · Dibuat dengan ❤️ di Bekasi
        </motion.div>
      </div>
    </div>
  );
}

function FlowStep({ icon: Icon, title, desc, color }: { icon: typeof Globe; title: string; desc: string; color: string }) {
  return (
    <div className="flex flex-1 items-center gap-3 rounded-2xl border border-pink-100 bg-white p-3 shadow-sm">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-bold text-pink-950">{title}</div>
        <div className="text-[10px] leading-tight text-pink-950/55">{desc}</div>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center">
      <ChevronRight className="hidden h-5 w-5 rotate-90 text-pink-400 lg:block lg:rotate-0" />
    </div>
  );
}
