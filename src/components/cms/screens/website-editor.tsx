"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import {
  Upload,
  Image as ImageIcon,
  Save,
  Eye,
  Sparkles,
  Type,
  Palette,
  Layout,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function CmsWebsiteEditor() {
  const { clinicSettings, updateClinicSettings } = useAppStore();
  const [tab, setTab] = useState<"branding" | "content" | "services" | "preview">("branding");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const colorOptions = [
    { id: "from-pink-600 via-rose-500 to-fuchsia-600", label: "Pink Rose", colors: ["#DB2777", "#F43F5E", "#C026D3"] },
    { id: "from-rose-600 via-pink-500 to-fuchsia-600", label: "Pink Vibrant", colors: ["#E11D48", "#EC4899", "#C026D3"] },
    { id: "from-fuchsia-600 via-purple-500 to-pink-600", label: "Fuchsia Purple", colors: ["#C026D3", "#A855F7", "#DB2777"] },
    { id: "from-pink-500 via-rose-400 to-amber-400", label: "Pink Sunset", colors: ["#EC4899", "#FB7185", "#FBBF24"] },
  ];

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between rounded-2xl border border-pink-100 bg-white p-3 shadow-sm">
        <div className="flex gap-2">
          {[
            { id: "branding", label: "Branding", icon: Palette },
            { id: "content", label: "Konten", icon: Type },
            { id: "services", label: "Layanan", icon: Layout },
            { id: "preview", label: "Preview", icon: Eye },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
                tab === t.id ? "bg-pink-600 text-white" : "bg-pink-50 text-pink-700",
              )}
            >
              <t.icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleSave}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all",
            saved
              ? "bg-emerald-500 text-white"
              : "bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-sm",
          )}
        >
          {saved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
          {saved ? "Tersimpan!" : "Simpan"}
        </button>
      </div>

      {tab === "branding" && (
        <m.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-4 lg:grid-cols-2"
        >
          {/* Logo upload */}
          <div className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm">
            <h3 className="font-display text-base font-bold text-pink-950">Logo Klinik</h3>
            <p className="text-xs text-pink-950/55">Logo akan tampil di website, app, kiosk, dan CMS</p>

            <div className="mt-4 flex items-center gap-4">
              <div className={`flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br ${clinicSettings.logoGradient} shadow-md`}>
                <svg viewBox="0 0 48 48" className="h-14 w-14">
                  <path d="M24 2l18 6v14c0 12-8 20-18 24C14 42 6 34 6 22V8l18-6z" fill="white" />
                  <path d="M24 12c-3.5 0-5 1.4-7.5 1.4-2 0-4 1-4 4.6 0 4 1.4 6 2.5 9.4 0.8 2.6 1.4 7.4 3 7.4 1.5 0 1.6-3.4 2.4-6 0.6-1.8 1.1-2.8 3.6-2.8s3 1 3.6 2.8c0.8 2.6 0.9 6 2.4 6 1.6 0 2.2-4.8 3-7.4 1.1-3.4 2.5-5.4 2.5-9.4 0-3.6-2-4.6-4-4.6C29 13.4 27.5 12 24 12z" fill={clinicSettings.primaryColor} />
                </svg>
              </div>
              <div className="flex-1 space-y-2">
                <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-pink-200 bg-pink-50/40 py-3 text-xs font-bold text-pink-700 hover:bg-pink-100">
                  <Upload className="h-4 w-4" />
                  Upload Logo (SVG/PNG)
                </button>
                <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-pink-200 py-2 text-xs font-bold text-pink-700 hover:bg-pink-50">
                  <ImageIcon className="h-3.5 w-3.5" />
                  Ganti dari Library
                </button>
              </div>
            </div>

            {/* Primary color picker */}
            <div className="mt-5">
              <label className="text-xs font-bold text-pink-950">Warna Utama</label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="color"
                  value={clinicSettings.primaryColor}
                  onChange={(e) => updateClinicSettings({ primaryColor: e.target.value })}
                  className="h-10 w-16 rounded-lg border border-pink-200"
                />
                <input
                  type="text"
                  value={clinicSettings.primaryColor}
                  onChange={(e) => updateClinicSettings({ primaryColor: e.target.value })}
                  className="flex-1 rounded-lg border border-pink-200 px-3 py-2 text-sm font-mono"
                />
              </div>
            </div>

            {/* Gradient presets */}
            <div className="mt-5">
              <label className="text-xs font-bold text-pink-950">Preset Gradient Logo</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {colorOptions.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => updateClinicSettings({ logoGradient: c.id })}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border-2 p-2 transition-all",
                      clinicSettings.logoGradient === c.id ? "border-pink-500 ring-2 ring-pink-200" : "border-pink-100",
                    )}
                  >
                    <div className="flex gap-0.5">
                      {c.colors.map((col) => (
                        <div key={col} className="h-6 w-6 rounded-full" style={{ background: col }} />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-pink-950">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Brand name & tagline */}
          <div className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm">
            <h3 className="font-display text-base font-bold text-pink-950">Identitas Klinik</h3>
            <p className="text-xs text-pink-950/55">Informasi dasar klinik</p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-bold text-pink-950">Nama Klinik</label>
                <input
                  value={clinicSettings.clinicName}
                  onChange={(e) => updateClinicSettings({ clinicName: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-pink-200 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-pink-950">Tagline</label>
                <input
                  value={clinicSettings.tagline}
                  onChange={(e) => updateClinicSettings({ tagline: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-pink-200 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-pink-950">Jam Operasional</label>
                <input
                  value={clinicSettings.openHours}
                  onChange={(e) => updateClinicSettings({ openHours: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-pink-200 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-pink-950">Alamat</label>
                <textarea
                  value={clinicSettings.address}
                  onChange={(e) => updateClinicSettings({ address: e.target.value })}
                  rows={2}
                  className="mt-1 w-full rounded-xl border border-pink-200 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
            </div>
          </div>
        </m.div>
      )}

      {tab === "content" && (
        <m.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm"
        >
          <h3 className="font-display text-base font-bold text-pink-950">Konten Website</h3>
          <p className="text-xs text-pink-950/55">Edit section hero, tentang, dll</p>

          <div className="mt-4 space-y-4">
            <div>
              <label className="text-xs font-bold text-pink-950">Headline Hero</label>
              <input
                defaultValue="Your Smile, Our Passion"
                className="mt-1 w-full rounded-xl border border-pink-200 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-pink-950">Subheadline Hero</label>
              <textarea
                defaultValue="Oktri Manessa Dental Clinic menghadirkan perawatan gigi modern dengan teknologi terkini, tim dokter gigi berpengalaman, dan lingkungan yang nyaman."
                rows={3}
                className="mt-1 w-full rounded-xl border border-pink-200 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-pink-950">Tentang Klinik</label>
              <textarea
                defaultValue="Oktri Manessa Dental Clinic (OMDC) didirikan pada tahun 2015 oleh drg. Oktri Manessa dengan visi memberikan layanan kesehatan gigi yang ramah, profesional, dan terjangkau bagi seluruh keluarga Indonesia."
                rows={4}
                className="mt-1 w-full rounded-xl border border-pink-200 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>
          </div>
        </m.div>
      )}

      {tab === "services" && (
        <m.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-pink-950">Daftar Layanan</h3>
              <p className="text-xs text-pink-950/55">Layanan yang tampil di website, app, dan kiosk</p>
            </div>
            <button className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-3 py-1.5 text-xs font-bold text-white">
              <Sparkles className="h-3.5 w-3.5" /> Tambah Layanan
            </button>
          </div>

          <div className="mt-4 space-y-2">
            {[
              { name: "Scaling & Polishing", price: "Mulai 250rb", icon: "sparkles", active: true },
              { name: "Pemutihan Gigi", price: "Mulai 1.2jt", icon: "smile", active: true },
              { name: "Kawat Gigi / Behel", price: "Mulai 4.5jt", icon: "wrench", active: true },
              { name: "Mahkota & Gigi Palsu", price: "Mulai 1.8jt", icon: "crown", active: true },
              { name: "Root Canal", price: "Mulai 1.5jt", icon: "activity", active: true },
              { name: "Dental Kids", price: "Mulai 200rb", icon: "baby", active: true },
              { name: "Tambal Gigi Estetik", price: "Mulai 350rb", icon: "stethoscope", active: true },
              { name: "Implant Gigi", price: "Mulai 18jt", icon: "shield-plus", active: true },
            ].map((s) => (
              <div key={s.name} className="flex items-center gap-3 rounded-xl border border-pink-100 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-pink-950">{s.name}</div>
                  <div className="text-xs text-pink-950/55">{s.price}</div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" defaultChecked={s.active} className="peer sr-only" />
                  <div className="peer h-5 w-9 rounded-full bg-pink-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-pink-600 peer-checked:after:translate-x-4" />
                </label>
              </div>
            ))}
          </div>
        </m.div>
      )}

      {tab === "preview" && (
        <m.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm"
        >
          <h3 className="font-display text-base font-bold text-pink-950">Preview Website</h3>
          <p className="text-xs text-pink-950/55">Preview perubahan branding & konten</p>

          <div className="mt-4 overflow-hidden rounded-2xl border-2 border-pink-200">
            {/* Mock browser chrome */}
            <div className="flex items-center gap-1.5 bg-pink-50 px-3 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <div className="ml-3 flex-1 rounded-md bg-white px-2 py-0.5 text-[10px] text-pink-950/50">
                omdc-dental.id
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 text-center">
              <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${clinicSettings.logoGradient} shadow-md`}>
                <svg viewBox="0 0 48 48" className="h-10 w-10">
                  <path d="M24 2l18 6v14c0 12-8 20-18 24C14 42 6 34 6 22V8l18-6z" fill="white" />
                  <path d="M24 12c-3.5 0-5 1.4-7.5 1.4-2 0-4 1-4 4.6 0 4 1.4 6 2.5 9.4 0.8 2.6 1.4 7.4 3 7.4 1.5 0 1.6-3.4 2.4-6 0.6-1.8 1.1-2.8 3.6-2.8s3 1 3.6 2.8c0.8 2.6 0.9 6 2.4 6 1.6 0 2.2-4.8 3-7.4 1.1-3.4 2.5-5.4 2.5-9.4 0-3.6-2-4.6-4-4.6C29 13.4 27.5 12 24 12z" fill={clinicSettings.primaryColor} />
                </svg>
              </div>
              <div className="mt-4 font-display text-3xl font-extrabold" style={{ color: clinicSettings.primaryColor }}>
                {clinicSettings.clinicName}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-pink-950/55">
                {clinicSettings.tagline}
              </div>
              <div className="mt-6 font-display text-2xl font-bold text-pink-950">
                Your Smile, Our Passion
              </div>
              <button
                className="mt-4 rounded-full px-6 py-2 text-sm font-bold text-white shadow-md"
                style={{ background: `linear-gradient(to right, ${clinicSettings.primaryColor}, #F43F5E)` }}
              >
                Buat Janji Temu
              </button>
            </div>
          </div>
        </m.div>
      )}
    </div>
  );
}
