"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { formatCurrency } from "@/components/mobile/mock-data";
import {
  Users,
  Calendar,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  Activity,
  Sparkles,
  Stethoscope,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function CmsDashboard() {
  const { queue, appointments, transactions, doctors, walkInPatients, cmsUser } = useAppStore();

  const waitingCount = queue.filter((q) => q.status === "waiting").length;
  const servingCount = queue.filter((q) => q.status === "serving").length;
  const completedToday = queue.filter((q) => q.status === "completed").length;
  const todayRevenue = transactions
    .filter((t) => t.date === new Date().toISOString().split("T")[0])
    .reduce((s, t) => s + t.amount, 0);
  const totalRevenue = transactions.reduce((s, t) => s + t.amount, 0);
  const upcomingApts = appointments.filter((a) => a.status === "upcoming").length;

  const stats = [
    {
      label: "Pasien Hari Ini",
      value: queue.length.toString(),
      change: "+12%",
      up: true,
      icon: Users,
      color: "from-pink-500 to-rose-500",
    },
    {
      label: "Antrian Menunggu",
      value: waitingCount.toString(),
      change: `${servingCount} dilayani`,
      up: true,
      icon: Clock,
      color: "from-amber-400 to-pink-500",
    },
    {
      label: "Pendapatan Hari Ini",
      value: formatCurrency(todayRevenue || 1500000),
      change: "+8.5%",
      up: true,
      icon: Wallet,
      color: "from-emerald-500 to-teal-600",
    },
    {
      label: "Total Pasien Aktif",
      value: "10.247",
      change: "+47 minggu ini",
      up: true,
      icon: TrendingUp,
      color: "from-fuchsia-500 to-pink-600",
    },
  ];

  // Weekly chart data (mock)
  const weeklyData = [
    { day: "Sen", value: 65, patients: 32 },
    { day: "Sel", value: 78, patients: 38 },
    { day: "Rab", value: 92, patients: 45 },
    { day: "Kam", value: 71, patients: 35 },
    { day: "Jum", value: 85, patients: 42 },
    { day: "Sab", value: 95, patients: 48 },
    { day: "Min", value: 42, patients: 18 },
  ];
  const maxVal = Math.max(...weeklyData.map((d) => d.value));

  return (
    <div className="space-y-5">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-3xl bg-gradient-to-br from-pink-600 via-rose-500 to-fuchsia-600 p-6 text-white shadow-soft-pink"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white/80">
              {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </div>
            <h2 className="mt-1 font-display text-2xl font-extrabold lg:text-3xl">
              Halo, {cmsUser?.name.split(" ")[0]}! 👋
            </h2>
            <p className="mt-1 text-sm text-white/80">
              Berikut ringkasan aktivitas klinik OMDC hari ini
            </p>
          </div>
          <div className="hidden sm:block">
            <Sparkles className="h-16 w-16 text-white/40" />
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-sm`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className={cn(
                "flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold",
                stat.up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600",
              )}>
                {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </div>
            </div>
            <div className="mt-3 font-display text-2xl font-extrabold text-pink-950">
              {stat.value}
            </div>
            <div className="text-xs text-pink-950/55">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Weekly chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm lg:col-span-2"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-pink-950">Aktivitas Mingguan</h3>
              <p className="text-xs text-pink-950/55">Jumlah pasien per hari minggu ini</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-pink-700">
              <Activity className="h-3.5 w-3.5" />
              Live
            </div>
          </div>

          <div className="mt-6 flex h-48 items-end justify-between gap-2">
            {weeklyData.map((d, i) => (
              <div key={d.day} className="group flex flex-1 flex-col items-center gap-2">
                <div className="relative flex w-full flex-1 items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.value / maxVal) * 100}%` }}
                    transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 220, damping: 22 }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-pink-500 to-rose-400 transition-colors group-hover:from-pink-600 group-hover:to-rose-500"
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-md bg-pink-950 px-2 py-0.5 text-[10px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                      {d.patients}
                    </div>
                  </motion.div>
                </div>
                <div className="text-[11px] font-semibold text-pink-950/60">{d.day}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Live queue mini */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-pink-950">Antrian Live</h3>
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Real-time
            </span>
          </div>

          <div className="mt-4 space-y-2">
            {queue.filter((q) => q.status === "waiting" || q.status === "serving").slice(0, 5).map((q) => (
              <div
                key={q.id}
                className={cn(
                  "flex items-center gap-2 rounded-xl p-2",
                  q.status === "serving" ? "bg-emerald-50" : "bg-pink-50/60",
                )}
              >
                <div className={cn(
                  "flex h-9 w-12 items-center justify-center rounded-lg font-display text-sm font-extrabold",
                  q.status === "serving" ? "bg-emerald-500 text-white" : "bg-white text-pink-700",
                )}>
                  {q.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate text-xs font-bold text-pink-950">{q.patientName}</div>
                  <div className="truncate text-[10px] text-pink-950/55">{q.service}</div>
                </div>
                {q.status === "serving" ? (
                  <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-bold text-white">
                    Dilayani
                  </span>
                ) : (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-700">
                    Menunggu
                  </span>
                )}
              </div>
            ))}
            {queue.filter((q) => q.status === "waiting" || q.status === "serving").length === 0 && (
              <div className="py-6 text-center text-xs text-pink-950/50">
                <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-emerald-400" />
                Tidak ada antrian aktif
              </div>
            )}
          </div>

          <button className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg bg-pink-50 py-2 text-xs font-bold text-pink-700 hover:bg-pink-100">
            Lihat Semua Antrian
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Doctor status */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-pink-950">Status Dokter</h3>
            <Stethoscope className="h-4 w-4 text-pink-400" />
          </div>
          <div className="mt-3 space-y-2">
            {doctors.slice(0, 5).map((doc) => (
              <div key={doc.id} className="flex items-center gap-2.5">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${doc.gradient} text-[10px] font-bold text-white`}>
                  {doc.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate text-xs font-bold text-pink-950">{doc.name}</div>
                  <div className="text-[10px] text-pink-950/55">{doc.patientsToday} pasien hari ini</div>
                </div>
                <span className={cn(
                  "rounded-full px-2 py-0.5 text-[9px] font-bold",
                  doc.status === "available" ? "bg-emerald-100 text-emerald-700" :
                  doc.status === "busy" ? "bg-amber-100 text-amber-700" :
                  "bg-pink-100 text-pink-700",
                )}>
                  {doc.status === "available" ? "Tersedia" : doc.status === "busy" ? "Sibuk" : "Libur"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming appointments */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm lg:col-span-2"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-pink-950">Janji Temu Mendatang</h3>
              <p className="text-xs text-pink-950/55">{upcomingApts} janji temu aktif</p>
            </div>
            <Calendar className="h-4 w-4 text-pink-400" />
          </div>
          <div className="mt-3 space-y-2">
            {appointments.filter((a) => a.status === "upcoming").slice(0, 4).map((apt) => (
              <div key={apt.id} className="flex items-center gap-3 rounded-xl border border-pink-50 p-3 hover:bg-pink-50/40">
                <div className="flex flex-col items-center justify-center rounded-xl bg-pink-100 px-3 py-2 text-pink-700">
                  <div className="text-[9px] font-bold uppercase">{new Date(apt.date).toLocaleDateString("id-ID", { month: "short" })}</div>
                  <div className="font-display text-lg font-extrabold leading-none">{new Date(apt.date).getDate()}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate text-sm font-bold text-pink-950">{apt.service}</div>
                  <div className="truncate text-xs text-pink-950/55">{apt.doctor}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-pink-700">{apt.time}</div>
                  <div className="text-[10px] text-pink-950/45">{apt.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Walk-in registrations today */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-base font-bold text-pink-950">Pendaftaran Walk-in Hari Ini</h3>
            <p className="text-xs text-pink-950/55">{walkInPatients.length} pasien mendaftar via e-Kiosk</p>
          </div>
          <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-700">
            E-Kiosk Sync
          </span>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-pink-100 text-[10px] uppercase tracking-wider text-pink-950/50">
                <th className="py-2 pr-3">Nama</th>
                <th className="py-2 pr-3">Telepon</th>
                <th className="py-2 pr-3">Usia</th>
                <th className="py-2 pr-3">Tipe</th>
                <th className="py-2 pr-3">Waktu Daftar</th>
              </tr>
            </thead>
            <tbody>
              {walkInPatients.slice(0, 5).map((p) => (
                <tr key={p.id} className="border-b border-pink-50">
                  <td className="py-2 pr-3 font-bold text-pink-950">{p.name}</td>
                  <td className="py-2 pr-3 text-pink-950/70">{p.phone}</td>
                  <td className="py-2 pr-3 text-pink-950/70">{p.age ?? "-"}</td>
                  <td className="py-2 pr-3">
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold",
                      p.isFirstVisit ? "bg-emerald-50 text-emerald-700" : "bg-pink-50 text-pink-700",
                    )}>
                      {p.isFirstVisit ? "Baru" : "Lama"}
                    </span>
                  </td>
                  <td className="py-2 pr-3 text-pink-950/55">
                    {new Date(p.registeredAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
