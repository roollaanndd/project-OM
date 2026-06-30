"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import {
  Search,

  Clock,

  ChevronRight,
  Calendar,
  Sparkles,
  TrendingUp,
  Heart,
  Award,
  Gift,
  Wallet,
  Zap,

} from "lucide-react";
import {
  formatCurrency,
  formatDate,
  getGreeting,
} from "../mock-data";
import { ServiceIcon } from "../icons";
import { SERVICES } from "../mock-data";

export function HomeScreen() {
  const { user, appointments, bills } = useAppStore();
  if (!user) return null;

  const greeting = getGreeting();
  const upcoming = appointments.find((a) => a.status === "upcoming");
  const unpaidBills = bills.filter((b) => b.status !== "paid");
  const totalUnpaid = unpaidBills.reduce((sum, b) => sum + b.amount, 0);

  // Quick actions (Gojek-style grid)
  const QUICK_ACTIONS = [
    { id: "booking", label: "Booking", icon: Calendar, color: "from-pink-500 to-rose-500", tab: "booking" as const },
    { id: "records", label: "Rekam Medis", icon: Sparkles, color: "from-rose-500 to-fuchsia-600", tab: "records" as const },
    { id: "payments", label: "Bayar", icon: Wallet, color: "from-fuchsia-500 to-pink-600", tab: "payments" as const },
    { id: "chat", label: "Chat Dokter", icon: Heart, color: "from-pink-400 to-rose-400", tab: "home" as const },
  ];

  // Dental services grid (Gojek-style 4 columns)
  const SERVICE_GRID = SERVICES.slice(0, 8);

  return (
    <div className="bg-white pb-4">
      {/* === Gojek-style top bar === */}
      <div className="sticky top-0 z-20 bg-white/95 px-4 pb-3 pt-2 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Cari layanan, dokter..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-pink-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-100"
            />
          </div>
          {/* Profile avatar */}
          <button className="relative shrink-0" aria-label="Profil">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${user.gradient} text-xs font-bold text-white shadow-sm`}>
              {user.initials}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
          </button>
        </div>
      </div>

      {/* === Greeting (compact, Gojek-style) === */}
      <div className="px-4 pt-3">
        <p className="text-xs text-gray-500">{greeting.emoji} {greeting.text},</p>
        <h1 className="font-display text-xl font-extrabold text-gray-900">{user.name.split(" ")[0]}! 👋</h1>
      </div>

      {/* === Wallet bar (Gojek-style slim bar) === */}
      <div className="px-4 pt-3">
        <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 text-white">
              <Gift className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="text-[10px] font-medium text-gray-500">OMDC Points</div>
              <div className="font-display text-base font-extrabold text-gray-900">
                {user.points.toLocaleString("id-ID")}
              </div>
            </div>
          </div>
          <div className="h-8 w-px bg-gray-100" />
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Award className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="text-[10px] font-medium text-gray-500">Tier</div>
              <div className="text-sm font-bold text-gray-900">{user.memberTier}</div>
            </div>
          </div>
          <button className="rounded-lg bg-pink-50 px-3 py-1.5 text-[11px] font-bold text-pink-700">
            Tukar
          </button>
        </div>
      </div>

      {/* === Quick actions grid (Gojek-style 4 columns) === */}
      <div className="px-4 pt-4">
        <div className="grid grid-cols-4 gap-2">
          {QUICK_ACTIONS.map((action, i) => (
            <motion.button
              key={action.id}
              onClick={() => useAppStore.getState().setActiveTab(action.tab)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-1.5"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color} text-white shadow-sm`}>
                <action.icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-semibold text-gray-700">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* === Unpaid bills alert (if any) === */}
      {unpaidBills.length > 0 && (
        <div className="px-4 pt-4">
          <button
            onClick={() => useAppStore.getState().setActiveTab("payments")}
            className="flex w-full items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-3 text-left"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white">
              <Wallet className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-red-700">{unpaidBills.length} tagihan menunggu</div>
              <div className="text-sm font-bold text-red-900">{formatCurrency(totalUnpaid)}</div>
            </div>
            <ChevronRight className="h-4 w-4 text-red-400" />
          </button>
        </div>
      )}

      {/* === Next appointment card (Gojek-style quick booking) === */}
      {upcoming && (
        <div className="px-4 pt-4">
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center justify-between bg-gradient-to-r from-pink-600 to-rose-500 px-4 py-2 text-white">
              <span className="flex items-center gap-1.5 text-xs font-bold">
                <Clock className="h-3.5 w-3.5" />
                Janji Temu Berikutnya
              </span>
              <span className="text-[10px] text-white/80">
                {Math.ceil((new Date(upcoming.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} hari lagi
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${upcoming.doctorGradient} text-xs font-bold text-white`}>
                  {upcoming.doctorInitials}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900">{upcoming.service}</div>
                  <div className="mt-0.5 text-xs text-gray-500">{upcoming.doctor}</div>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(upcoming.date, { weekday: "short", day: "numeric", month: "short" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {upcoming.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === Services grid (Gojek-style 4 columns, scrollable) === */}
      <div className="pt-5">
        <div className="flex items-center justify-between px-4 pb-3">
          <h2 className="text-sm font-bold text-gray-900">Layanan Klinik</h2>
          <button className="text-xs font-semibold text-pink-600">Lihat Semua</button>
        </div>
        <div className="grid grid-cols-4 gap-2 px-4">
          {SERVICE_GRID.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() => useAppStore.getState().setActiveTab("booking")}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-1.5"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-sm`}>
                <ServiceIcon name={s.icon} className="h-5 w-5" />
              </div>
              <span className="text-center text-[9px] font-medium leading-tight text-gray-700 line-clamp-2">
                {s.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* === Health tips (Gojek-style "Pilihan buat kamu") === */}
      <div className="pt-5">
        <div className="flex items-center justify-between px-4 pb-3">
          <h2 className="text-sm font-bold text-gray-900">Tips Gigi Sehat</h2>
          <button className="text-xs font-semibold text-pink-600">Lihat Semua</button>
        </div>
        <div className="-mx-0 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            { icon: "🪥", title: "Sikat Gigi Benar", desc: "2x sehari, 2 menit", color: "from-pink-400 to-rose-500" },
            { icon: "🦷", title: "Benang Gigi", desc: "Setiap hari, sebelum tidur", color: "from-rose-400 to-fuchsia-500" },
            { icon: "🥗", title: "Makanan Sehat", desc: "Kurangi gula & asam", color: "from-amber-400 to-pink-500" },
            { icon: "💧", title: "Air Putih", desc: "Bilas sisa makanan", color: "from-cyan-400 to-blue-500" },
          ].map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="min-w-[160px] max-w-[160px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              <div className={`flex h-20 items-center justify-center bg-gradient-to-br ${tip.color} text-4xl`}>
                {tip.icon}
              </div>
              <div className="p-3">
                <div className="text-xs font-bold text-gray-900">{tip.title}</div>
                <div className="mt-0.5 text-[10px] text-gray-500">{tip.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* === Stats row (compact, Gojek-style) === */}
      <div className="px-4 pt-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-gray-100 bg-white p-3 text-center shadow-sm">
            <TrendingUp className="mx-auto h-4 w-4 text-pink-500" />
            <div className="mt-1.5 font-display text-lg font-extrabold text-gray-900">12</div>
            <div className="text-[9px] text-gray-500">Kunjungan</div>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-3 text-center shadow-sm">
            <Zap className="mx-auto h-4 w-4 text-emerald-500" />
            <div className="mt-1.5 font-display text-lg font-extrabold text-emerald-600">92</div>
            <div className="text-[9px] text-gray-500">Skor Gigi</div>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-3 text-center shadow-sm">
            <Award className="mx-auto h-4 w-4 text-amber-500" />
            <div className="mt-1.5 font-display text-lg font-extrabold text-gray-900">{user.points}</div>
            <div className="text-[9px] text-gray-500">Poin</div>
          </div>
        </div>
      </div>
    </div>
  );
}
