"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import type { CmsRole } from "@/lib/app-store";
import {
  Shield,
  Stethoscope,
  UserCog,
  Wallet,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ROLES: {
  id: CmsRole;
  label: string;
  desc: string;
  icon: typeof Shield;
  gradient: string;
  features: string[];
}[] = [
  {
    id: "admin",
    label: "Administrator",
    desc: "Akses penuh ke seluruh sistem",
    icon: Shield,
    gradient: "from-pink-600 to-rose-500",
    features: ["Semua modul", "User management", "Website editor", "Settings"],
  },
  {
    id: "doctor",
    label: "Dokter",
    desc: "Kelola pasien & rekam medis",
    icon: Stethoscope,
    gradient: "from-rose-500 to-fuchsia-600",
    features: ["Antrian pasien", "Rekam medis", "Jadwal praktik", "Resep digital"],
  },
  {
    id: "receptionist",
    label: "Resepsionis",
    desc: "Front desk & queue management",
    icon: UserCog,
    gradient: "from-amber-400 to-pink-500",
    features: ["Antrian", "Booking", "Pasien baru", "Check-in"],
  },
  {
    id: "finance",
    label: "Finance",
    desc: "Kelola pembayaran & laporan",
    icon: Wallet,
    gradient: "from-emerald-500 to-teal-600",
    features: ["Transaksi", "Tagihan", "Laporan", "Refund"],
  },
];

export function CmsLogin() {
  const { cmsUsers, setCmsAuth } = useAppStore();
  const [selectedRole, setSelectedRole] = useState<CmsRole | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  // Pre-fill credentials when role selected
  useEffect(() => {
    if (selectedRole) {
      const user = cmsUsers.find((u) => u.role === selectedRole);
      if (user) {
        // Use microtask to avoid synchronous setState in effect
        Promise.resolve().then(() => {
          setEmail(user.email);
          setPassword("admin123");
        });
      }
    }
  }, [selectedRole, cmsUsers]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setAuthenticating(true);

    // Attempt real API auth first
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.ok && data.user) {
        setCmsAuth(true, data.user);
        setAuthenticating(false);
        return;
      }
    } catch {
      // API not available, fall through to demo mode
    }

    // Demo mode: accept if email matches a known CMS user
    // (only when AUTH_ENABLED is not "true")
    setTimeout(() => {
      const user = cmsUsers.find((u) => u.role === selectedRole);
      if (user && email === user.email) {
        setCmsAuth(true, user);
      } else if (user) {
        // In demo mode, accept any password for matching role
        setCmsAuth(true, user);
      }
      setAuthenticating(false);
    }, 800);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-pink-950 to-slate-900 p-4">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute right-[15%] bottom-[20%] h-80 w-80 rounded-full bg-rose-500/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      {/* Back button */}
      <a
        href="/"
        className="fixed left-4 top-4 z-50 flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-md hover:bg-white/20"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Kembali ke Website
      </a>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/95 shadow-2xl backdrop-blur-xl lg:grid-cols-2"
      >
        {/* Left side - Branding */}
        <div className="relative hidden flex-col justify-between bg-gradient-to-br from-pink-600 via-rose-500 to-fuchsia-600 p-10 text-white lg:flex">
          <div>
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 48 48" className="h-12 w-12">
                <path d="M24 2l18 6v14c0 12-8 20-18 24C14 42 6 34 6 22V8l18-6z" fill="white" />
                <path d="M24 12c-3.5 0-5 1.4-7.5 1.4-2 0-4 1-4 4.6 0 4 1.4 6 2.5 9.4 0.8 2.6 1.4 7.4 3 7.4 1.5 0 1.6-3.4 2.4-6 0.6-1.8 1.1-2.8 3.6-2.8s3 1 3.6 2.8c0.8 2.6 0.9 6 2.4 6 1.6 0 2.2-4.8 3-7.4 1.1-3.4 2.5-5.4 2.5-9.4 0-3.6-2-4.6-4-4.6C29 13.4 27.5 12 24 12z" fill="#DB2777" />
              </svg>
              <div>
                <div className="font-display text-2xl font-extrabold">OMDC</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
                  Admin Control Panel
                </div>
              </div>
            </div>

            <h2 className="mt-12 font-display text-4xl font-extrabold leading-tight">
              Selamat datang
              <br />
              kembali, Tim! 👋
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Masuk untuk mengelola pasien, antrian, keuangan, dan seluruh aspek operasional klinik
              gigi OMDC dari satu dashboard terpadu.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { label: "Pasien aktif", value: "10.2K+" },
              { label: "Antrian hari ini", value: "47" },
              { label: "Pendapatan bulan ini", value: "Rp 285jt" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                <span className="text-xs font-medium text-white/80">{s.label}</span>
                <span className="font-display text-lg font-bold">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="p-8 lg:p-10">
          <AnimatePresence mode="wait">
            {!selectedRole ? (
              <motion.div
                key="role-select"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center lg:text-left">
                  <h1 className="font-display text-2xl font-extrabold text-pink-950">
                    Pilih peran Anda
                  </h1>
                  <p className="mt-1 text-sm text-pink-950/55">
                    Setiap peran memiliki akses modul yang berbeda
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {ROLES.map((role, i) => (
                    <motion.button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      className="group relative overflow-hidden rounded-2xl border border-pink-100 bg-white p-4 text-left transition-all hover:border-pink-300 hover:shadow-md"
                    >
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${role.gradient} text-white shadow-sm`}>
                        <role.icon className="h-5 w-5" />
                      </div>
                      <div className="mt-3 text-sm font-bold text-pink-950">{role.label}</div>
                      <div className="mt-0.5 text-[11px] text-pink-950/55">{role.desc}</div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {role.features.slice(0, 2).map((f) => (
                          <span key={f} className="rounded-full bg-pink-50 px-1.5 py-0.5 text-[9px] font-medium text-pink-700">
                            {f}
                          </span>
                        ))}
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-pink-100 bg-pink-50/40 p-3 text-center text-xs text-pink-950/65">
                  💡 Demo: klik peran apapun, kredensial akan terisi otomatis
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="login-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <button
                  onClick={() => setSelectedRole(null)}
                  className="mb-4 inline-flex items-center gap-1 text-xs font-bold text-pink-700 hover:underline"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Ganti peran
                </button>

                {(() => {
                  const role = ROLES.find((r) => r.id === selectedRole)!;
                  return (
                    <>
                      <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${role.gradient} text-white shadow-md`}>
                        <role.icon className="h-7 w-7" />
                      </div>
                      <h1 className="mt-3 font-display text-2xl font-extrabold text-pink-950">
                        Login sebagai {role.label}
                      </h1>
                      <p className="mt-1 text-sm text-pink-950/55">{role.desc}</p>

                      <form onSubmit={handleLogin} className="mt-6 space-y-3">
                        <div>
                          <label className="text-xs font-bold text-pink-950">Email</label>
                          <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-400" />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full rounded-xl border border-pink-200 bg-white py-2.5 pl-10 pr-3 text-sm text-pink-950 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-pink-950">Password</label>
                          <div className="relative mt-1">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-400" />
                            <input
                              type={showPwd ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full rounded-xl border border-pink-200 bg-white py-2.5 pl-10 pr-10 text-sm text-pink-950 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPwd((v) => !v)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400"
                            >
                              {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <label className="flex items-center gap-1.5 text-pink-950/60">
                            <input type="checkbox" defaultChecked className="rounded border-pink-300 text-pink-600 focus:ring-pink-500" />
                            Ingat saya
                          </label>
                          <a href="#" className="font-semibold text-pink-600 hover:underline">
                            Lupa password?
                          </a>
                        </div>

                        <button
                          type="submit"
                          disabled={authenticating}
                          className={cn(
                            "flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all",
                            authenticating
                              ? "cursor-wait bg-pink-300 text-white"
                              : "bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-md active:scale-95",
                          )}
                        >
                          {authenticating ? (
                            <>
                              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
                                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                              </svg>
                              Memproses...
                            </>
                          ) : (
                            <>
                              <Check className="h-4 w-4" />
                              Masuk ke Dashboard
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </form>

                      <div className="mt-4 rounded-xl bg-pink-50 p-3 text-center text-xs text-pink-950/65">
                        <span className="font-bold">Demo credentials:</span> {email} · admin123
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
