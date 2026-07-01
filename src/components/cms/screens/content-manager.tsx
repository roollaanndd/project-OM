"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText, Image as ImageIcon, Settings, Upload, Save,
  Plus, Trash2, Edit3, Eye, Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/app-store";

type ContentTab = "tips" | "blog" | "services" | "banners";

export function CmsContentManager() {
  const [tab, setTab] = useState<ContentTab>("tips");

  const TABS: { id: ContentTab; label: string; icon: typeof FileText }[] = [
    { id: "tips", label: "Tips Kesehatan", icon: FileText },
    { id: "blog", label: "Blog Posts", icon: FileText },
    { id: "services", label: "Layanan", icon: Settings },
    { id: "banners", label: "Banners", icon: ImageIcon },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base font-bold text-gray-900">Content Manager</h2>
        <button className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-3 py-1.5 text-xs font-bold text-white">
          <Upload className="h-3.5 w-3.5" /> Import Data
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 rounded-2xl bg-white p-1.5 shadow-sm">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors",
              tab === t.id ? "bg-pink-600 text-white" : "text-gray-500 hover:bg-gray-50",
            )}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "tips" && <TipsManager />}
      {tab === "blog" && <BlogManager />}
      {tab === "services" && <ServicesManager />}
      {tab === "banners" && <BannerManager />}
    </div>
  );
}

function TipsManager() {
  const tips = [
    { id: 1, title: "Sikat Gigi Benar", desc: "2x sehari, 2 menit", img: "/tips/tip-brush.jpg", active: true },
    { id: 2, title: "Benang Gigi", desc: "Setiap hari, sebelum tidur", img: "/tips/tip-floss.jpg", active: true },
    { id: 3, title: "Makanan Sehat", desc: "Kurangi gula & asam", img: "/tips/tip-food.jpg", active: true },
    { id: 4, title: "Air Putih", desc: "Bilas sisa makanan", img: "/tips/tip-water.jpg", active: true },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">Tips yang tampil di mobile app home screen</p>
        <button className="flex items-center gap-1 text-xs font-bold text-pink-600">
          <Plus className="h-3.5 w-3.5" /> Tambah Tip
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {tips.map((tip, i) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
          >
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
              <img src={tip.img} alt={tip.title} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-gray-900">{tip.title}</div>
              <div className="text-xs text-gray-500">{tip.desc}</div>
              <div className="mt-2 flex gap-1.5">
                <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100">
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100">
                  <Eye className="h-3.5 w-3.5" />
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" defaultChecked={tip.active} className="peer sr-only" />
              <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-pink-600 peer-checked:after:translate-x-4" />
            </label>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BlogManager() {
  const { records } = useAppStore();
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">Kelola artikel blog yang tampil di website</p>
        <button className="flex items-center gap-1 text-xs font-bold text-pink-600">
          <Plus className="h-3.5 w-3.5" /> Tambah Artikel
        </button>
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/40 text-[10px] uppercase tracking-wider text-gray-500">
              <th className="px-4 py-3">Judul</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {[
              { title: "Panduan Lengkap Scaling Gigi", cat: "Perawatan", date: "15 Jun 2025", status: "Published" },
              { title: "Behel Keramik vs Metal", cat: "Orthodontic", date: "10 Jun 2025", status: "Published" },
              { title: "Pemutihan Gigi Whitening", cat: "Estetik", date: "5 Jun 2025", status: "Published" },
              { title: "Tips Merawat Gigi Anak", cat: "Gigi Anak", date: "28 May 2025", status: "Published" },
              { title: "Panduan Implant Gigi", cat: "Implant", date: "20 May 2025", status: "Published" },
              { title: "7 Kebiasaan Gigi Sehat", cat: "Tips", date: "15 May 2025", status: "Published" },
            ].map((post, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/40">
                <td className="px-4 py-3 font-bold text-gray-900">{post.title}</td>
                <td className="px-4 py-3"><span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-700">{post.cat}</span></td>
                <td className="px-4 py-3 text-gray-500">{post.date}</td>
                <td className="px-4 py-3"><span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">{post.status}</span></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100"><Edit3 className="h-3.5 w-3.5" /></button>
                    <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100"><Eye className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ServicesManager() {
  const services = [
    { name: "Scaling & Polishing", price: "Mulai 250rb", active: true },
    { name: "Pemutihan Gigi", price: "Mulai 1.2jt", active: true },
    { name: "Kawat Gigi / Behel", price: "Mulai 4.5jt", active: true },
    { name: "Mahkota & Gigi Palsu", price: "Mulai 1.8jt", active: true },
    { name: "Root Canal", price: "Mulai 1.5jt", active: true },
    { name: "Dental Kids", price: "Mulai 200rb", active: true },
    { name: "Tambal Gigi Estetik", price: "Mulai 350rb", active: true },
    { name: "Implant Gigi", price: "Mulai 18jt", active: true },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">Layanan yang tampil di website, app, dan kiosk</p>
        <button className="flex items-center gap-1 text-xs font-bold text-pink-600">
          <Plus className="h-3.5 w-3.5" /> Tambah Layanan
        </button>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {services.map((s, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
            <div>
              <div className="text-sm font-bold text-gray-900">{s.name}</div>
              <div className="text-xs text-gray-500">{s.price}</div>
            </div>
            <div className="flex items-center gap-2">
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" defaultChecked={s.active} className="peer sr-only" />
                <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-pink-600 peer-checked:after:translate-x-4" />
              </label>
              <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-600"><Edit3 className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BannerManager() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500">Banner promosi yang tampil di home app & website</p>
      <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/40 p-8 text-center">
        <Upload className="mx-auto h-8 w-8 text-gray-400" />
        <p className="mt-2 text-sm font-semibold text-gray-700">Upload Banner</p>
        <p className="text-xs text-gray-400">PNG/JPG, max 2MB, rekomendasi 1200x400px</p>
        <button className="mt-3 rounded-full bg-pink-600 px-4 py-2 text-xs font-bold text-white">Pilih File</button>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-gray-900">Banner Aktif</div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Published</span>
        </div>
        <div className="mt-2 h-32 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white">
          <div className="text-center">
            <div className="font-display text-lg font-bold">Your Smile, Our Passion</div>
            <div className="text-xs text-white/80">Promo Scaling 20% off Juli 2025</div>
          </div>
        </div>
        <div className="mt-2 flex gap-2">
          <button className="flex-1 rounded-lg bg-gray-50 py-2 text-xs font-bold text-gray-600"><Edit3 className="mx-auto h-3.5 w-3.5" /></button>
          <button className="flex-1 rounded-lg bg-gray-50 py-2 text-xs font-bold text-gray-600"><Eye className="mx-auto h-3.5 w-3.5" /></button>
          <button className="flex-1 rounded-lg bg-red-50 py-2 text-xs font-bold text-red-600"><Trash2 className="mx-auto h-3.5 w-3.5" /></button>
        </div>
      </div>
    </div>
  );
}
