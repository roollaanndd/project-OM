"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
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
import { SubProfileView, type SubView } from "./profile-parts/sub-profile-view";


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
        <m.button
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
        </m.button>
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
