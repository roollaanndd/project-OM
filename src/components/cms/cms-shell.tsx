"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import type { CmsRole } from "@/lib/app-store";
import { useFocusTrap, useEscapeKey } from "@/lib/hooks/use-a11y";
import {
  LayoutDashboard,
  Users,
  Calendar,
  ListOrdered,
  Stethoscope,
  Building2,
  Wallet,
  Globe,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  Menu,
  X,

} from "lucide-react";
import { cn } from "@/lib/utils";

export type CmsPage =
  | "dashboard"
  | "patients"
  | "appointments"
  | "queue"
  | "doctors"
  | "branches"
  | "finance"
  | "website"
  | "settings";

const ROLE_PAGES: Record<CmsRole, { id: CmsPage; label: string; icon: typeof Users }[]> = {
  admin: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "patients", label: "Pasien", icon: Users },
    { id: "appointments", label: "Janji Temu", icon: Calendar },
    { id: "queue", label: "Antrian Live", icon: ListOrdered },
    { id: "doctors", label: "Dokter", icon: Stethoscope },
    { id: "branches", label: "Cabang", icon: Building2 },
    { id: "finance", label: "Keuangan", icon: Wallet },
    { id: "website", label: "Website Editor", icon: Globe },
    { id: "settings", label: "Pengaturan", icon: Settings },
  ],
  doctor: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "queue", label: "Antrian Pasien", icon: ListOrdered },
    { id: "patients", label: "Pasien Saya", icon: Users },
    { id: "appointments", label: "Jadwal Praktik", icon: Calendar },
  ],
  receptionist: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "queue", label: "Antrian", icon: ListOrdered },
    { id: "appointments", label: "Booking", icon: Calendar },
    { id: "patients", label: "Pasien", icon: Users },
  ],
  finance: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "finance", label: "Keuangan", icon: Wallet },
    { id: "patients", label: "Pasien", icon: Users },
  ],
};

export function CmsShell({
  page,
  onPageChange,
  children,
}: {
  page: CmsPage;
  onPageChange: (p: CmsPage) => void;
  children: ReactNode;
}) {
  const { cmsUser, setCmsAuth, clinicSettings } = useAppStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Accessibility: focus trap + escape for mobile sidebar
  useFocusTrap(sidebarRef, sidebarOpen);
  useEscapeKey(() => setSidebarOpen(false), sidebarOpen);

  // Session timeout: auto-logout after 30 minutes of inactivity
  useEffect(() => {
    if (!cmsUser) return;
    const TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
    let timeoutId: ReturnType<typeof setTimeout>;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // Auto-logout on timeout
        setCmsAuth(false);
        window.location.href = "/";
        alert("Sesi Anda telah berakhir karena tidak ada aktivitas selama 30 menit. Silakan login kembali.");
      }, TIMEOUT_MS);
    };

    // Activity events that reset the timer
    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimeout, { passive: true }));
    resetTimeout();

    return () => {
      clearTimeout(timeoutId);
      events.forEach((e) => window.removeEventListener(e, resetTimeout));
    };
  }, [cmsUser, setCmsAuth]);

  if (!cmsUser) return null;

  const roleLabel = {
    admin: "Administrator",
    doctor: "Dokter",
    receptionist: "Resepsionis",
    finance: "Finance",
  }[cmsUser.role];

  const pages = ROLE_PAGES[cmsUser.role];
  const currentPage = pages.find((p) => p.id === page) ?? pages[0];

  return (
    <div className="flex min-h-screen bg-pink-50/40">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        role="navigation"
        aria-label="Sidebar navigasi CMS"
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-pink-100 bg-white transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-pink-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 48 48" className="h-9 w-9">
              <defs>
                <linearGradient id="cms-logo" x1="0" y1="0" x2="48" y2="48">
                  <stop stopColor="#9D174D" />
                  <stop offset="0.5" stopColor="#DB2777" />
                  <stop offset="1" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              <path d="M24 2l18 6v14c0 12-8 20-18 24C14 42 6 34 6 22V8l18-6z" fill="url(#cms-logo)" />
              <path d="M24 12c-3.5 0-5 1.4-7.5 1.4-2 0-4 1-4 4.6 0 4 1.4 6 2.5 9.4 0.8 2.6 1.4 7.4 3 7.4 1.5 0 1.6-3.4 2.4-6 0.6-1.8 1.1-2.8 3.6-2.8s3 1 3.6 2.8c0.8 2.6 0.9 6 2.4 6 1.6 0 2.2-4.8 3-7.4 1.1-3.4 2.5-5.4 2.5-9.4 0-3.6-2-4.6-4-4.6C29 13.4 27.5 12 24 12z" fill="#FFFFFF" />
            </svg>
            <div>
              <div className="font-display text-base font-extrabold text-pink-950">
                {clinicSettings.clinicName}
              </div>
              <div className="text-[9px] font-semibold uppercase tracking-wider text-pink-700/70">
                Admin Panel
              </div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
            aria-label="Tutup sidebar"
          >
            <X className="h-5 w-5 text-pink-950/50" />
          </button>
        </div>

        {/* Role badge */}
        <div className="mx-4 mt-4 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 p-3">
          <div className="flex items-center gap-2.5">
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${cmsUser.gradient} text-xs font-bold text-white`}>
              {cmsUser.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="truncate text-xs font-bold text-pink-950">{cmsUser.name}</div>
              <div className="text-[10px] text-pink-700">{roleLabel}</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="mt-4 px-3 pb-4">
          <div className="space-y-0.5">
            {pages.map((p) => {
              const active = p.id === page;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    onPageChange(p.id);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all",
                    active
                      ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-md"
                      : "text-pink-950/65 hover:bg-pink-50 hover:text-pink-950",
                  )}
                >
                  <p.icon className={cn("h-4 w-4", active ? "text-white" : "text-pink-950/50 group-hover:text-pink-700")} />
                  {p.label}
                  {active && (
                    <motion.div
                      layoutId="cms-active"
                      className="absolute right-2 h-1.5 w-1.5 rounded-full bg-white"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute inset-x-0 bottom-0 border-t border-pink-100 p-3">
          <button
            onClick={() => {
              setCmsAuth(false);
              window.location.href = "/";
            }}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-pink-950/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-pink-100 bg-white/90 px-4 py-3 backdrop-blur-md lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
              aria-label="Buka sidebar"
            >
              <Menu className="h-5 w-5 text-pink-950" />
            </button>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-pink-700/60">
                <span>OMDC Admin</span>
                <span>/</span>
                <span className="text-pink-950/80">{roleLabel}</span>
              </div>
              <h1 className="font-display text-base font-bold text-pink-950 lg:text-lg">
                {currentPage.label}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-950/40" />
              <input
                placeholder="Cari pasien, booking..."
                className="w-56 rounded-full border border-pink-200 bg-pink-50/40 py-2 pl-9 pr-3 text-xs text-pink-950 placeholder:text-pink-950/40 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>

            <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-pink-50 text-pink-700 hover:bg-pink-100">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu((v) => !v)}
                className="flex items-center gap-2 rounded-full bg-pink-50 py-1 pl-1 pr-2 hover:bg-pink-100"
              >
                <div className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${cmsUser.gradient} text-[10px] font-bold text-white`}>
                  {cmsUser.initials}
                </div>
                <span className="hidden text-xs font-bold text-pink-950 sm:inline">{cmsUser.name.split(" ")[0]}</span>
                <ChevronDown className="h-3 w-3 text-pink-950/50" />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 top-full z-20 mt-2 w-56 overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-lg"
                    >
                      <div className="border-b border-pink-100 p-3">
                        <div className="text-sm font-bold text-pink-950">{cmsUser.name}</div>
                        <div className="text-xs text-pink-950/55">{cmsUser.email}</div>
                        <span className="mt-2 inline-block rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-bold text-pink-700">
                          {roleLabel}
                        </span>
                      </div>
                      <div className="p-2">
                        <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-pink-950/65 hover:bg-pink-50">
                          <Settings className="h-4 w-4" /> Pengaturan Akun
                        </button>
                        <button
                          onClick={() => {
                            setCmsAuth(false);
                            window.location.href = "/";
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" /> Keluar
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
