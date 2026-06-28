"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import {
  Bell,
  Search,
  CalendarPlus,
  FileText,
  CreditCard,
  MessageCircle,
  Clock,
  MapPin,
  ChevronRight,
  Award,
  TrendingUp,
  Gift,
  Zap,
  Sparkles,
} from "lucide-react";
import {
  formatCurrency,
  formatDate,
  getGreeting,
  HEALTH_TIPS,
} from "../mock-data";

export function HomeScreen() {
  const { user, appointments, setActiveTab, bills } = useAppStore();
  if (!user) return null;

  const greeting = getGreeting();
  const upcoming = appointments.find((a) => a.status === "upcoming");
  const unpaidBills = bills.filter((b) => b.status !== "paid");
  const totalUnpaid = unpaidBills.reduce((sum, b) => sum + b.amount, 0);

  // Days until next appointment
  const daysLeft = upcoming
    ? Math.ceil((new Date(upcoming.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  const QUICK_ACTIONS = [
    { id: "booking", label: "Booking", icon: CalendarPlus, color: "from-pink-500 to-rose-500", tab: "booking" as const },
    { id: "records", label: "Rekam Medis", icon: FileText, color: "from-rose-500 to-fuchsia-600", tab: "records" as const },
    { id: "payments", label: "Bayar", icon: CreditCard, color: "from-fuchsia-500 to-pink-600", tab: "payments" as const },
    { id: "chat", label: "Chat Dokter", icon: MessageCircle, color: "from-pink-400 to-rose-400", tab: "home" as const },
  ];

  return (
    <div className="px-5 pt-4 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${user.gradient} text-sm font-bold text-white shadow-md`}>
            {user.initials}
            <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-pink-950/55">
              {greeting.emoji} {greeting.text}
            </div>
            <div className="text-sm font-bold text-pink-950">{user.name.split(" ")[0]}!</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-pink-700 shadow-sm" aria-label="Cari">
            <Search className="h-5 w-5" />
          </button>
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-pink-700 shadow-sm" aria-label="Notifikasi">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </div>
      </div>

      {/* Loyalty card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mt-5 overflow-hidden rounded-3xl bg-gradient-to-br from-pink-600 via-rose-500 to-fuchsia-600 p-5 text-white shadow-soft-pink"
      >
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-12 -left-6 h-32 w-32 rounded-full bg-white/10" />

        <div className="relative flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/80">
              <Award className="h-3.5 w-3.5" />
              Member {user.memberTier}
            </div>
            <div className="mt-1 font-display text-3xl font-extrabold">
              {user.points.toLocaleString("id-ID")}
              <span className="ml-1 text-sm font-medium text-white/80">poin</span>
            </div>
            <div className="mt-1 text-xs text-white/70">
              {user.pointsToNextTier} poin lagi ke Platinum 🎉
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <Gift className="h-6 w-6" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative mt-4 h-2 w-full overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full rounded-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${(user.points / (user.points + user.pointsToNextTier)) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          />
        </div>

        <button
          onClick={() => setActiveTab("profile")}
          className="relative mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/30"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Tukar Poin
        </button>
      </motion.div>

      {/* Quick actions */}
      <div className="mt-6 grid grid-cols-4 gap-2">
        {QUICK_ACTIONS.map((action, i) => (
          <motion.button
            key={action.id}
            onClick={() => setActiveTab(action.tab)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-1.5"
          >
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color} text-white shadow-md`}>
              <action.icon className="h-6 w-6" />
            </div>
            <span className="text-[11px] font-semibold text-pink-950">{action.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Outstanding bill alert */}
      {unpaidBills.length > 0 && (
        <motion.button
          onClick={() => setActiveTab("payments")}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          whileTap={{ scale: 0.99 }}
          className="mt-5 flex w-full items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-left"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white">
            <CreditCard className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-semibold text-red-700">
              {unpaidBills.length} tagihan menunggu
            </div>
            <div className="text-sm font-bold text-red-900">
              {formatCurrency(totalUnpaid)}
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white">
            Bayar
            <ChevronRight className="h-3.5 w-3.5" />
          </div>
        </motion.button>
      )}

      {/* Next appointment */}
      {upcoming && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-5"
        >
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-pink-950">
              Janji Temu Berikutnya
            </h2>
            <button
              onClick={() => setActiveTab("records")}
              className="text-xs font-semibold text-pink-600"
            >
              Lihat Semua
            </button>
          </div>

          <div className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm">
            {/* Top strip with countdown */}
            <div className="flex items-center justify-between bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-2 text-white">
              <span className="flex items-center gap-1.5 text-xs font-bold">
                <Clock className="h-3.5 w-3.5" />
                {daysLeft === 0 ? "Hari ini!" : daysLeft === 1 ? "Besok!" : `${daysLeft} hari lagi`}
              </span>
              <span className="text-xs font-medium text-white/80">
                {formatDate(upcoming.date, { weekday: "long", day: "numeric", month: "short" })} · {upcoming.time}
              </span>
            </div>

            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${upcoming.doctorGradient} text-sm font-bold text-white shadow-md`}>
                  {upcoming.doctorInitials}
                </div>
                <div className="flex-1">
                  <div className="font-display text-base font-bold text-pink-950">
                    {upcoming.service}
                  </div>
                  <div className="mt-0.5 text-xs text-pink-950/60">
                    {upcoming.doctor}
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2 border-t border-pink-100 pt-4 text-xs text-pink-950/70">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-pink-500" />
                  <span>{upcoming.time} WIB · {upcoming.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-pink-500" />
                  <span className="flex-1">{upcoming.clinic}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-full bg-pink-50 py-2.5 text-xs font-bold text-pink-700 transition-colors hover:bg-pink-100">
                  Reschedule
                </button>
                <button className="flex-1 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 py-2.5 text-xs font-bold text-white shadow-sm">
                  Lihat Detail
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Health tips carousel */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-pink-950">
            Tips Gigi Sehat
          </h2>
          <button className="text-xs font-semibold text-pink-600">Lihat Semua</button>
        </div>

        <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {HEALTH_TIPS.map((tip, i) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="min-w-[240px] max-w-[240px] flex-1 overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm"
            >
              <div className={`flex h-24 items-center justify-center bg-gradient-to-br ${tip.color} text-5xl`}>
                {tip.icon}
              </div>
              <div className="p-4">
                <div className="font-display text-sm font-bold text-pink-950">{tip.title}</div>
                <p className="mt-1 text-xs leading-relaxed text-pink-950/65">{tip.desc}</p>
                <button className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-pink-600">
                  Baca selengkapnya
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-pink-100 bg-white p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
              <TrendingUp className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold text-pink-950/60">Total Kunjungan</span>
          </div>
          <div className="mt-2 font-display text-2xl font-bold text-pink-950">12</div>
          <div className="text-[11px] text-pink-950/50">Sepanjang 2025</div>
        </div>

        <div className="rounded-2xl border border-pink-100 bg-white p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <Zap className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold text-pink-950/60">Skor Kesehatan</span>
          </div>
          <div className="mt-2 font-display text-2xl font-bold text-emerald-600">92<span className="text-base text-pink-950/50">/100</span></div>
          <div className="text-[11px] text-pink-950/50">Sangat Baik ↑</div>
        </div>
      </div>
    </div>
  );
}
