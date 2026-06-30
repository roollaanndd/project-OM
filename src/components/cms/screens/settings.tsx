"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { Save, Check, Users, Shield, Bell, Globe, Database } from "lucide-react";
import { cn } from "@/lib/utils";

export function CmsSettings() {
  const { clinicSettings, updateClinicSettings, cmsUsers } = useAppStore();
  const [tab, setTab] = useState<"clinic" | "users" | "system">("clinic");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 rounded-2xl border border-pink-100 bg-white p-2 shadow-sm">
        {[
          { id: "clinic", label: "Profil Klinik", icon: Globe },
          { id: "users", label: "Manajemen User", icon: Users },
          { id: "system", label: "Sistem", icon: Database },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-colors",
              tab === t.id ? "bg-pink-600 text-white" : "text-pink-950/60 hover:bg-pink-50",
            )}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "clinic" && (
        <m.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm"
        >
          <h3 className="font-display text-base font-bold text-pink-950">Profil Klinik</h3>
          <p className="text-xs text-pink-950/55">Informasi yang tampil di seluruh platform</p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Nama Klinik" value={clinicSettings.clinicName} onChange={(v) => updateClinicSettings({ clinicName: v })} />
            <Field label="Tagline" value={clinicSettings.tagline} onChange={(v) => updateClinicSettings({ tagline: v })} />
            <Field label="Email" value={clinicSettings.email} onChange={(v) => updateClinicSettings({ email: v })} />
            <Field label="Telepon" value={clinicSettings.phone} onChange={(v) => updateClinicSettings({ phone: v })} />
            <Field label="Jam Operasional" value={clinicSettings.openHours} onChange={(v) => updateClinicSettings({ openHours: v })} />
            <Field label="Jumlah Loket" value={String(clinicSettings.totalCounter)} onChange={(v) => updateClinicSettings({ totalCounter: parseInt(v) || 1 })} type="number" />
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-pink-950">Alamat</label>
              <textarea
                value={clinicSettings.address}
                onChange={(e) => updateClinicSettings({ address: e.target.value })}
                rows={2}
                className="mt-1 w-full rounded-xl border border-pink-200 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className={cn(
              "mt-4 flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all",
              saved ? "bg-emerald-500 text-white" : "bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-sm",
            )}
          >
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saved ? "Tersimpan!" : "Simpan Perubahan"}
          </button>
        </m.div>
      )}

      {tab === "users" && (
        <m.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-pink-950">Manajemen User</h3>
              <p className="text-xs text-pink-950/55">{cmsUsers.length} user terdaftar</p>
            </div>
            <button className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-3 py-1.5 text-xs font-bold text-white">
              <Users className="h-3.5 w-3.5" /> Tambah User
            </button>
          </div>

          <div className="mt-4 space-y-2">
            {cmsUsers.map((u) => (
              <div key={u.id} className="flex items-center gap-3 rounded-xl border border-pink-100 p-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${u.gradient} text-xs font-bold text-white`}>
                  {u.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-pink-950">{u.name}</div>
                  <div className="text-xs text-pink-950/55">{u.email}</div>
                </div>
                <span className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-bold",
                  u.role === "admin" ? "bg-pink-100 text-pink-700" :
                  u.role === "doctor" ? "bg-rose-100 text-rose-700" :
                  u.role === "receptionist" ? "bg-amber-100 text-amber-700" :
                  "bg-emerald-100 text-emerald-700",
                )}>
                  {u.role}
                </span>
                <span className="text-[10px] text-pink-950/45">{u.lastActive}</span>
              </div>
            ))}
          </div>

          {/* Role permissions matrix */}
          <div className="mt-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-950/55">Matriks Hak Akses</h4>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-pink-100 text-[10px] uppercase tracking-wider text-pink-950/55">
                    <th className="py-2 pr-3">Modul</th>
                    <th className="py-2 px-2 text-center">Admin</th>
                    <th className="py-2 px-2 text-center">Dokter</th>
                    <th className="py-2 px-2 text-center">Resepsionis</th>
                    <th className="py-2 px-2 text-center">Finance</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { mod: "Dashboard", a: true, b: true, c: true, d: true },
                    { mod: "Pasien", a: true, b: true, c: true, d: true },
                    { mod: "Janji Temu", a: true, b: true, c: true, d: false },
                    { mod: "Antrian", a: true, b: true, c: true, d: false },
                    { mod: "Dokter", a: true, b: false, c: false, d: false },
                    { mod: "Keuangan", a: true, b: false, c: false, d: true },
                    { mod: "Website Editor", a: true, b: false, c: false, d: false },
                    { mod: "Settings", a: true, b: false, c: false, d: false },
                  ].map((r) => (
                    <tr key={r.mod} className="border-b border-pink-50">
                      <td className="py-2 pr-3 font-bold text-pink-950">{r.mod}</td>
                      <td className="py-2 px-2 text-center">{r.a ? <Check className="mx-auto h-3.5 w-3.5 text-emerald-600" /> : <span className="text-pink-950/30">-</span>}</td>
                      <td className="py-2 px-2 text-center">{r.b ? <Check className="mx-auto h-3.5 w-3.5 text-emerald-600" /> : <span className="text-pink-950/30">-</span>}</td>
                      <td className="py-2 px-2 text-center">{r.c ? <Check className="mx-auto h-3.5 w-3.5 text-emerald-600" /> : <span className="text-pink-950/30">-</span>}</td>
                      <td className="py-2 px-2 text-center">{r.d ? <Check className="mx-auto h-3.5 w-3.5 text-emerald-600" /> : <span className="text-pink-950/30">-</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </m.div>
      )}

      {tab === "system" && (
        <m.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-pink-500" />
              <h3 className="font-display text-base font-bold text-pink-950">Integrasi Sistem</h3>
            </div>

            <div className="mt-4 space-y-2">
              {[
                { name: "Website OMDC", status: "Terhubung", desc: "Sync otomatis konten & layanan", color: "bg-emerald-50 text-emerald-700" },
                { name: "Mobile App Pasien", status: "Terhubung", desc: "Booking & rekam medis real-time", color: "bg-emerald-50 text-emerald-700" },
                { name: "e-Kiosk Self-Service", status: "Terhubung", desc: "Walk-in & queue sync", color: "bg-emerald-50 text-emerald-700" },
                { name: "Payment Gateway", status: "Terhubung", desc: "Midtrans - GoPay, OVO, QRIS", color: "bg-emerald-50 text-emerald-700" },
                { name: "WhatsApp Business", status: "Aktif", desc: "Notifikasi & customer service", color: "bg-emerald-50 text-emerald-700" },
                { name: "Email Service", status: "Aktif", desc: "SMTP - pengingat janji", color: "bg-emerald-50 text-emerald-700" },
              ].map((s) => (
                <div key={s.name} className="flex items-center justify-between rounded-xl border border-pink-100 p-3">
                  <div>
                    <div className="text-sm font-bold text-pink-950">{s.name}</div>
                    <div className="text-xs text-pink-950/55">{s.desc}</div>
                  </div>
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", s.color)}>
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-pink-500" />
              <h3 className="font-display text-base font-bold text-pink-950">Keamanan</h3>
            </div>

            <div className="mt-4 space-y-3">
              {[
                { label: "Two-Factor Authentication", desc: "Verifikasi 2-langkah untuk admin", on: true },
                { label: "Audit Log", desc: "Catat semua aksi sensitif", on: true },
                { label: "Auto Backup Database", desc: "Backup harian otomatis", on: true },
                { label: "SSL Encryption", desc: "Enkripsi data transmisi", on: true },
                { label: "Session Timeout", desc: "Auto logout setelah 30 menit idle", on: false },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between rounded-xl border border-pink-100 p-3">
                  <div>
                    <div className="text-sm font-bold text-pink-950">{s.label}</div>
                    <div className="text-xs text-pink-950/55">{s.desc}</div>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" defaultChecked={s.on} className="peer sr-only" />
                    <div className="peer h-5 w-9 rounded-full bg-pink-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-pink-600 peer-checked:after:translate-x-4" />
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-pink-500" />
              <h3 className="font-display text-base font-bold text-pink-950">Notifikasi Sistem</h3>
            </div>

            <div className="mt-4 space-y-3">
              {[
                { label: "Notifikasi Pasien Baru", desc: "Alert saat pasien baru terdaftar via kiosk", on: true },
                { label: "Notifikasi Pembayaran", desc: "Alert saat pembayaran masuk", on: true },
                { label: "Notifikasi Antrian Panjang", desc: "Alert jika antrian > 10 pasien", on: true },
                { label: "Laporan Harian Email", desc: "Kirim laporan harian jam 21:00", on: false },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between rounded-xl border border-pink-100 p-3">
                  <div>
                    <div className="text-sm font-bold text-pink-950">{s.label}</div>
                    <div className="text-xs text-pink-950/55">{s.desc}</div>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" defaultChecked={s.on} className="peer sr-only" />
                    <div className="peer h-5 w-9 rounded-full bg-pink-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-pink-600 peer-checked:after:translate-x-4" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </m.div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-bold text-pink-950">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-pink-200 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
      />
    </div>
  );
}
