"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { formatCurrency } from "@/components/mobile/mock-data";
import { Search, Plus, Filter, ChevronRight, Phone, Mail, Activity, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function CmsPatients() {
  const { walkInPatients, user, records } = useAppStore();
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  // Combine all patient sources
  const allPatients = [
    { id: user?.id ?? "u-001", name: user?.name ?? "", phone: user?.phone ?? "", email: user?.email ?? "", type: "member", source: "Mobile App" },
    ...(user?.familyMembers.map((f) => ({ id: f.id, name: f.name, phone: "-", email: "-", type: "family", source: "Mobile App" })) ?? []),
    ...walkInPatients.map((w) => ({ id: w.id, name: w.name, phone: w.phone, email: w.email ?? "-", type: w.isFirstVisit ? "new" : "returning", source: "E-Kiosk" })),
  ];

  const filtered = allPatients.filter((p) =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search)
  );

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Pasien", value: "10.247", color: "from-pink-500 to-rose-500" },
          { label: "Pasien Baru (Bulan ini)", value: "247", color: "from-rose-500 to-fuchsia-600" },
          { label: "Pasien Aktif", value: "8.124", color: "from-fuchsia-500 to-pink-600" },
          { label: "Via E-Kiosk Hari Ini", value: walkInPatients.length, color: "from-amber-400 to-pink-500" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-pink-100 bg-white p-3 shadow-sm">
            <div className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} text-white`}>
              <Activity className="h-4 w-4" />
            </div>
            <div className="mt-2 font-display text-xl font-bold text-pink-950">{s.value}</div>
            <div className="text-[10px] text-pink-950/55">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-pink-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-950/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau telepon pasien..."
            className="w-full rounded-xl border border-pink-200 bg-pink-50/40 py-2 pl-9 pr-3 text-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 rounded-xl border border-pink-200 px-3 py-2 text-xs font-bold text-pink-700 hover:bg-pink-50">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
          <button className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 px-3 py-2 text-xs font-bold text-white shadow-sm">
            <Plus className="h-3.5 w-3.5" /> Tambah Pasien
          </button>
        </div>
      </div>

      {/* Patient list */}
      <div className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-pink-100 bg-pink-50/40 text-[11px] uppercase tracking-wider text-pink-950/55">
                <th className="px-4 py-3">Pasien</th>
                <th className="px-4 py-3">Kontak</th>
                <th className="px-4 py-3">Sumber</th>
                <th className="px-4 py-3">Tipe</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <m.tr
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-pink-50 hover:bg-pink-50/40"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-xs font-bold text-white">
                        {p.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-pink-950">{p.name}</div>
                        <div className="text-[10px] text-pink-950/45">ID: {p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-xs text-pink-950/70">
                      <Phone className="h-3 w-3" /> {p.phone}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-pink-950/45">
                      <Mail className="h-2.5 w-2.5" /> {p.email}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold",
                      p.source === "E-Kiosk" ? "bg-amber-50 text-amber-700" : "bg-pink-50 text-pink-700",
                    )}>
                      {p.source}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold",
                      p.type === "new" ? "bg-emerald-50 text-emerald-700" :
                      p.type === "member" ? "bg-fuchsia-50 text-fuchsia-700" :
                      p.type === "family" ? "bg-blue-50 text-blue-700" :
                      "bg-pink-50 text-pink-700",
                    )}>
                      {p.type === "new" ? "Baru" : p.type === "member" ? "Member" : p.type === "family" ? "Keluarga" : "Lama"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedPatient(p)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-50 text-pink-700 hover:bg-pink-100"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </td>
                </m.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient detail drawer */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-pink-950/30 backdrop-blur-sm" onClick={() => setSelectedPatient(null)} />
          <m.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="relative h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-pink-100 bg-white px-5 py-4">
              <h3 className="font-display text-base font-bold text-pink-950">Detail Pasien</h3>
              <button onClick={() => setSelectedPatient(null)} className="rounded-full bg-pink-50 p-2 text-pink-700">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-xl font-bold text-white">
                  {selectedPatient.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-pink-950">{selectedPatient.name}</div>
                  <div className="text-xs text-pink-950/55">ID: {selectedPatient.id}</div>
                  <span className="mt-1 inline-block rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-bold text-pink-700">
                    {selectedPatient.source}
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl bg-pink-50/60 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-pink-950/45">Telepon</div>
                  <div className="text-sm font-bold text-pink-950">{selectedPatient.phone}</div>
                </div>
                <div className="rounded-xl bg-pink-50/60 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-pink-950/45">Email</div>
                  <div className="text-sm font-bold text-pink-950">{selectedPatient.email}</div>
                </div>
              </div>

              <div className="mt-5">
                <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-pink-950/55">Riwayat Perawatan</h4>
                <div className="space-y-2">
                  {records.slice(0, 3).map((r) => (
                    <div key={r.id} className="rounded-xl border border-pink-100 p-3">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-pink-950">{r.service}</div>
                        <div className="text-[10px] text-pink-950/45">{new Date(r.date).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</div>
                      </div>
                      <div className="text-[10px] text-pink-600">{r.doctorSpecialty}</div>
                      <div className="mt-1 text-[10px] font-bold text-pink-950/70">{formatCurrency(r.cost)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <button className="rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 py-2.5 text-xs font-bold text-white shadow-sm">
                  Buat Janji Baru
                </button>
                <button className="rounded-xl border border-pink-200 py-2.5 text-xs font-bold text-pink-700">
                  Lihat Rekam Medis
                </button>
              </div>
            </div>
          </m.div>
        </div>
      )}
    </div>
  );
}
