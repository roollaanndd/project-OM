"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { formatDate } from "../mock-data";
import {
  ChevronLeft,
  ChevronRight,
  Award,
  Gift,
  Users,
  Bell,
  Settings,
  LogOut,
  Heart,
  QrCode,
  Star,
  Lock,
  Globe,
  Moon,
  HelpCircle,
  FileText,
  Shield,
  Sparkles,
  TrendingUp,
  Plus,
  Edit3,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SubView = "main" | "loyalty" | "family" | "settings" | "qr";

export function ProfileScreen() {
  const { user, setAuthenticated, setActiveTab } = useAppStore();
  const [subView, setSubView] = useState<SubView>("main");

  if (!user) return null;

  if (subView !== "main") {
    return (
      <SubProfileView
        view={subView}
        onBack={() => setSubView("main")}
      />
    );
  }

  const MENU = [
    { id: "loyalty" as const, label: "Poin & Rewards", icon: Gift, color: "from-amber-400 to-pink-500", value: `${user.points} poin` },
    { id: "family" as const, label: "Anggota Keluarga", icon: Users, color: "from-pink-500 to-rose-500", value: `${user.familyMembers.length} anggota` },
    { id: "qr" as const, label: "QR Member", icon: QrCode, color: "from-fuchsia-500 to-pink-600", value: "Scan" },
    { id: "settings" as const, label: "Pengaturan", icon: Settings, color: "from-rose-500 to-fuchsia-600" },
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {/* Header gradient */}
      <div className="relative bg-gradient-to-br from-pink-600 via-rose-500 to-fuchsia-600 px-5 pb-16 pt-6 text-white">
        <div className="absolute -right-12 -top-6 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-6 h-32 w-32 rounded-full bg-white/10" />

        <div className="relative flex items-center justify-between">
          <h1 className="font-display text-lg font-bold">Profil Saya</h1>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Bell className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mt-5 flex items-center gap-4">
          <div className="relative">
            <div className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${user.gradient} text-2xl font-extrabold ring-4 ring-white/40`}>
              {user.initials}
            </div>
            <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-pink-600 shadow-md">
              <Edit3 className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex-1">
            <div className="font-display text-xl font-extrabold">{user.name}</div>
            <div className="mt-0.5 text-xs text-white/80">{user.email}</div>
            <div className="mt-0.5 text-xs text-white/70">{user.phone}</div>
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold backdrop-blur-sm">
              <Award className="h-3 w-3" />
              Member {user.memberTier}
            </div>
          </div>
        </div>
      </div>

      {/* Loyalty card overlapping */}
      <div className="px-5 -mt-12">
        <motion.button
          onClick={() => setSubView("loyalty")}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-full overflow-hidden rounded-3xl border border-pink-100 bg-white p-4 shadow-soft-pink"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-pink-500 text-white">
              <Gift className="h-6 w-6" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-[11px] font-semibold text-pink-950/55">Poin Reward</div>
              <div className="font-display text-xl font-extrabold text-pink-950">
                {user.points.toLocaleString("id-ID")}
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-pink-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-pink-500"
                  style={{ width: `${(user.points / (user.points + user.pointsToNextTier)) * 100}%` }}
                />
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-pink-950/30" />
          </div>
        </motion.button>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-2 px-5">
        {[
          { label: "Kunjungan", value: "12", icon: TrendingUp },
          { label: "Skor Gigi", value: "92", icon: Heart },
          { label: "Tier", value: user.memberTier, icon: Award },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-pink-100 bg-white p-3 text-center shadow-sm">
            <stat.icon className="mx-auto h-4 w-4 text-pink-500" />
            <div className="mt-1.5 font-display text-base font-bold text-pink-950">{stat.value}</div>
            <div className="text-[10px] font-medium text-pink-950/55">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="mt-4 px-5">
        <h3 className="mb-2 px-1 text-xs font-bold uppercase tracking-wider text-pink-950/50">
          Akun
        </h3>
        <div className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm">
          {MENU.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setSubView(item.id)}
              className={cn(
                "flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-pink-50/40",
                i > 0 && "border-t border-pink-50",
              )}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white shadow-sm`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-pink-950">{item.label}</div>
                {item.value && (
                  <div className="text-xs text-pink-950/55">{item.value}</div>
                )}
              </div>
              <ChevronRight className="h-4 w-4 text-pink-950/30" />
            </button>
          ))}
        </div>

        <h3 className="mb-2 mt-5 px-1 text-xs font-bold uppercase tracking-wider text-pink-950/50">
          Lainnya
        </h3>
        <div className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm">
          {[
            { label: "Bahasa", icon: Globe, value: "Indonesia" },
            { label: "Mode Gelap", icon: Moon, value: "Off" },
            { label: "Bantuan & FAQ", icon: HelpCircle },
            { label: "Kebijakan Privasi", icon: Shield },
            { label: "Syarat & Ketentuan", icon: FileText },
          ].map((item, i) => (
            <button
              key={item.label}
              className={cn(
                "flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-pink-50/40",
                i > 0 && "border-t border-pink-50",
              )}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-700">
                <item.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 text-sm font-semibold text-pink-950">{item.label}</div>
              {item.value && (
                <span className="text-xs text-pink-950/55">{item.value}</span>
              )}
              <ChevronRight className="h-4 w-4 text-pink-950/30" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            setAuthenticated(false);
            setActiveTab("home");
          }}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 py-3.5 text-sm font-bold text-red-600 transition-colors hover:bg-red-100"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </button>

        <div className="py-4 text-center text-[10px] text-pink-950/40">
          OMDC Patient App v1.0.0 · Made with ❤️ in Bekasi
        </div>
      </div>
    </div>
  );
}

function SubProfileView({ view, onBack }: { view: SubView; onBack: () => void }) {
  const { user, setAuthenticated, setActiveTab } = useAppStore();

  if (!user) return null;

  const titles: Record<SubView, string> = {
    main: "",
    loyalty: "Poin & Rewards",
    family: "Anggota Keluarga",
    settings: "Pengaturan",
    qr: "QR Member",
  };

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 z-20 bg-pink-50/95 px-5 py-4 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-pink-700 shadow-sm"
            aria-label="Kembali"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="font-display text-base font-bold text-pink-950">{titles[view]}</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <AnimatePresence mode="wait">
          {view === "loyalty" && (
            <motion.div key="loyalty" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              {/* Tier progress */}
              <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-pink-600 via-rose-500 to-fuchsia-600 p-5 text-white shadow-soft-pink">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    Member {user.memberTier}
                  </div>
                  <Award className="h-5 w-5" />
                </div>
                <div className="mt-2 font-display text-4xl font-extrabold">
                  {user.points.toLocaleString("id-ID")}
                  <span className="ml-1 text-base font-medium text-white/70">poin</span>
                </div>
                <div className="mt-3 text-xs text-white/80">
                  {user.pointsToNextTier} poin lagi untuk naik ke Platinum
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/20">
                  <motion.div
                    className="h-full rounded-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${(user.points / (user.points + user.pointsToNextTier)) * 100}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>

              {/* Tier benefits */}
              <h3 className="mt-6 mb-3 font-display text-base font-bold text-pink-950">
                Benefit {user.memberTier}
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Diskon perawatan", value: "10%" },
                  { label: "Free scaling tahunan", value: "1x" },
                  { label: "Prioritas booking", value: "Aktif" },
                  { label: "Konsultasi spesialis gratis", value: "4x / tahun" },
                  { label: "Dental goodie bag", value: "Tahunan" },
                ].map((b) => (
                  <div key={b.label} className="flex items-center justify-between rounded-2xl border border-pink-100 bg-white p-3 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-semibold text-pink-950">{b.label}</span>
                    </div>
                    <span className="text-sm font-bold text-pink-600">{b.value}</span>
                  </div>
                ))}
              </div>

              {/* Reward options */}
              <h3 className="mt-6 mb-3 font-display text-base font-bold text-pink-950">
                Tukar Poin
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Free Scaling", points: 1500, emoji: "🦷", color: "from-pink-100 to-rose-100" },
                  { name: "Voucher 100rb", points: 800, emoji: "💰", color: "from-amber-100 to-yellow-100" },
                  { name: "Whitening Diskon 50%", points: 2000, emoji: "✨", color: "from-fuchsia-100 to-pink-100" },
                  { name: "Sikat Gigi Electric", points: 3500, emoji: "🪥", color: "from-cyan-100 to-blue-100" },
                ].map((r) => {
                  const can = user.points >= r.points;
                  return (
                    <button
                      key={r.name}
                      disabled={!can}
                      className={cn(
                        "overflow-hidden rounded-2xl border-2 bg-white p-3 text-left transition-all",
                        can ? "border-pink-200 hover:border-pink-400" : "border-pink-50 opacity-60",
                      )}
                    >
                      <div className={`mb-2 flex h-16 items-center justify-center rounded-xl bg-gradient-to-br ${r.color} text-3xl`}>
                        {r.emoji}
                      </div>
                      <div className="text-xs font-bold text-pink-950">{r.name}</div>
                      <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-pink-600">
                        <Gift className="h-3 w-3" />
                        {r.points.toLocaleString("id-ID")} poin
                      </div>
                      {!can && (
                        <div className="mt-1 text-[10px] text-pink-950/40">Kurang {(r.points - user.points).toLocaleString("id-ID")} poin</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {view === "family" && (
            <motion.div key="family" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="space-y-3">
                {/* Main user */}
                <div className="flex items-center gap-3 rounded-2xl border-2 border-pink-200 bg-white p-4 shadow-sm">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${user.gradient} text-base font-bold text-white shadow-sm`}>
                    {user.initials}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-pink-950">{user.name}</div>
                    <div className="text-xs text-pink-600">Pemilik Akun</div>
                    <div className="mt-0.5 text-[11px] text-pink-950/55">
                      Member sejak {formatDate(user.joinedDate, { month: "long", year: "numeric" })}
                    </div>
                  </div>
                </div>

                {user.familyMembers.map((fam, i) => (
                  <motion.div
                    key={fam.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 rounded-2xl border border-pink-100 bg-white p-4 shadow-sm"
                  >
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${fam.gradient} text-base font-bold text-white shadow-sm`}>
                      {fam.initials}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-pink-950">{fam.name}</div>
                      <div className="text-xs text-pink-600">{fam.relation} · {fam.age} tahun</div>
                    </div>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-50 text-pink-700">
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                  </motion.div>
                ))}

                <button className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-pink-200 bg-pink-50/40 py-4 text-sm font-bold text-pink-700 transition-colors hover:bg-pink-100/60">
                  <Plus className="h-4 w-4" />
                  Tambah Anggota Keluarga
                </button>

                <div className="mt-4 rounded-2xl bg-pink-50/60 p-4 text-xs leading-relaxed text-pink-950/65">
                  <Users className="mb-1 h-4 w-4 text-pink-500" />
                  Tambahkan anggota keluarga untuk memudahkan booking dan akses rekam medis
                  mereka. Maksimal 5 anggota per akun.
                </div>
              </div>
            </motion.div>
          )}

          {view === "qr" && (
            <motion.div
              key="qr"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <div className="w-full max-w-xs overflow-hidden rounded-3xl border border-pink-100 bg-white p-6 shadow-soft-pink">
                <div className="text-center">
                  <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${user.gradient} text-base font-bold text-white`}>
                    {user.initials}
                  </div>
                  <div className="mt-3 font-display text-base font-bold text-pink-950">{user.name}</div>
                  <div className="text-xs text-pink-950/55">Member {user.memberTier} · {user.points.toLocaleString("id-ID")} poin</div>
                </div>

                {/* Mock QR code */}
                <div className="my-5 rounded-2xl bg-white p-4 shadow-inner">
                  <svg viewBox="0 0 100 100" className="mx-auto h-44 w-44">
                    {/* Generate a fake QR pattern */}
                    {Array.from({ length: 10 }).map((_, r) =>
                      Array.from({ length: 10 }).map((_, c) => {
                        // Pseudo-random pattern
                        const v = (r * 13 + c * 7 + r * c) % 3;
                        if (v === 0) return null;
                        // Position markers (corners)
                        const isMarker = (r < 3 && c < 3) || (r < 3 && c > 6) || (r > 6 && c < 3);
                        if (isMarker) {
                          if ((r === 0 || r === 2) && c < 3) return <rect key={`${r}-${c}`} x={c * 10} y={r * 10} width="10" height="10" fill="#9D174D" />;
                          if ((r === 0 || r === 2) && c > 6) return <rect key={`${r}-${c}`} x={c * 10} y={r * 10} width="10" height="10" fill="#9D174D" />;
                          if (r === 1 && c === 1) return <rect key={`${r}-${c}`} x={c * 10} y={r * 10} width="10" height="10" fill="#9D174D" />;
                          if (r === 1 && c === 8) return <rect key={`${r}-${c}`} x={c * 10} y={r * 10} width="10" height="10" fill="#9D174D" />;
                          if (r === 7 && c === 1) return <rect key={`${r}-${c}`} x={c * 10} y={r * 10} width="10" height="10" fill="#9D174D" />;
                          return null;
                        }
                        return <rect key={`${r}-${c}`} x={c * 10} y={r * 10} width="10" height="10" fill="#9D174D" opacity={v === 1 ? 1 : 0.4} />;
                      }),
                    )}
                  </svg>
                </div>

                <div className="text-center text-xs text-pink-950/55">
                  Tunjukkan QR ini ke resepsionis OMDC untuk poin & check-in
                </div>

                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-pink-50 py-2.5 text-sm font-bold text-pink-700">
                  <Share2 className="h-4 w-4" />
                  Bagikan QR
                </button>
              </div>
            </motion.div>
          )}

          {view === "settings" && (
            <motion.div key="settings" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="space-y-2">
                {[
                  { label: "Notifikasi Push", value: "On", icon: Bell },
                  { label: "Email Pengingat", value: "On", icon: Bell },
                  { label: "SMS Booking", value: "Off", icon: Bell },
                  { label: "Bahasa", value: "Indonesia", icon: Globe },
                  { label: "Mode Gelap", value: "Off", icon: Moon },
                  { label: "Ubah Kata Sandi", value: "", icon: Lock },
                  { label: "Autentikasi 2-Langkah", value: "Off", icon: Shield },
                ].map((s, i) => (
                  <button
                    key={s.label}
                    className="flex w-full items-center gap-3 rounded-2xl border border-pink-100 bg-white p-3.5 shadow-sm"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-100 text-pink-700">
                      <s.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 text-left text-sm font-semibold text-pink-950">{s.label}</div>
                    {s.value && <span className="text-xs text-pink-950/55">{s.value}</span>}
                    <ChevronRight className="h-4 w-4 text-pink-950/30" />
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setAuthenticated(false);
                  setActiveTab("home");
                }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 py-3.5 text-sm font-bold text-red-600"
              >
                <LogOut className="h-4 w-4" />
                Keluar dari Akun
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
