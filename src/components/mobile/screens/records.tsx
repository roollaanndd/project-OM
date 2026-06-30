"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { formatCurrency, formatDateShort, formatDate } from "../mock-data";
import { ServiceIcon } from "../icons";
import {
  ChevronLeft,
  Search,
  Filter,
  ChevronRight,
  Download,
  Share2,
  Pill,
  FileHeart,
  Sparkles as ToothIcon,
  Clock,
  Stethoscope,
  Check,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { MedicalRecord } from "../types";

export function RecordsScreen() {
  const { records, user } = useAppStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "mine" | "family">("all");
  const [search, setSearch] = useState("");

  const selected = records.find((r) => r.id === selectedId);

  if (selected) {
    return <RecordDetail record={selected} onBack={() => setSelectedId(null)} />;
  }

  const filtered = records.filter((r) => {
    // In real app, would filter by patient. For demo, show all.
    if (search) {
      const q = search.toLowerCase();
      return (
        r.service.toLowerCase().includes(q) ||
        r.doctor.toLowerCase().includes(q) ||
        r.diagnosis.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 px-5 py-4 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-xl font-extrabold text-pink-950">Rekam Medis</h1>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-pink-700 shadow-sm" aria-label="Filter">
            <Filter className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mt-3">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-950/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari perawatan atau dokter..."
            className="w-full rounded-full border border-pink-200 bg-white py-2.5 pl-11 pr-4 text-sm text-pink-950 placeholder:text-pink-950/40 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          />
        </div>

        {/* Filter pills */}
        <div className="mt-3 flex gap-2">
          {([
            { id: "all", label: "Semua" },
            { id: "mine", label: "Saya" },
            { id: "family", label: "Keluarga" },
          ] as const).map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-bold transition-colors",
                filter === f.id
                  ? "bg-pink-600 text-white"
                  : "bg-white text-pink-950/60 border border-pink-100",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary card */}
      <div className="px-5 pt-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
            <div className="font-display text-xl font-bold text-pink-700">{records.length}</div>
            <div className="text-[10px] font-medium text-pink-950/55">Total Kunjungan</div>
          </div>
          <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
            <div className="font-display text-xl font-bold text-emerald-600">92</div>
            <div className="text-[10px] font-medium text-pink-950/55">Skor Gigi</div>
          </div>
          <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
            <div className="font-display text-xl font-bold text-amber-600">{user?.points ?? 0}</div>
            <div className="text-[10px] font-medium text-pink-950/55">Poin</div>
          </div>
        </div>
      </div>

      {/* Records list */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((rec, i) => (
              <motion.button
                key={rec.id}
                onClick={() => setSelectedId(rec.id)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.99 }}
                className="flex w-full items-start gap-3 rounded-2xl border border-pink-100 bg-white p-4 text-left shadow-sm transition-all hover:border-pink-200"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${rec.doctorGradient} text-sm font-bold text-white shadow-sm`}>
                  {rec.doctorInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-display text-sm font-bold leading-tight text-pink-950">
                      {rec.service}
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-pink-950/30" />
                  </div>
                  <div className="mt-0.5 text-xs text-pink-600">{rec.doctorSpecialty}</div>
                  <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-pink-950/55">
                    <Calendar className="h-3 w-3" />
                    {formatDateShort(rec.date)}
                    <span className="text-pink-950/30">·</span>
                    <span>{formatCurrency(rec.cost)}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 w-fit">
                    <Check className="h-2.5 w-2.5" />
                    Selesai
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-5xl">🦷</div>
              <div className="mt-4 text-sm font-semibold text-pink-950">Tidak ada rekam medis</div>
              <div className="mt-1 text-xs text-pink-950/55">Coba kata kunci lain</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RecordDetail({ record, onBack }: { record: MedicalRecord; onBack: () => void }) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 px-5 py-4 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-pink-700 shadow-sm"
            aria-label="Kembali"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="font-display text-base font-bold text-pink-950">Detail Rekam Medis</h1>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-pink-700 shadow-sm" aria-label="Bagikan">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm"
        >
          <div className={`flex items-center gap-3 bg-gradient-to-br ${record.doctorGradient} p-5 text-white`}>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <ServiceIcon name={record.serviceIcon} className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <div className="font-display text-lg font-bold leading-tight">{record.service}</div>
              <div className="mt-0.5 text-xs text-white/80">{formatDate(record.date)}</div>
            </div>
          </div>

          <div className="p-5">
            {/* Doctor info */}
            <div className="flex items-center gap-3 rounded-2xl bg-pink-50/60 p-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${record.doctorGradient} text-xs font-bold text-white`}>
                {record.doctorInitials}
              </div>
              <div>
                <div className="text-xs font-semibold text-pink-950/60">Dokter Penanggung Jawab</div>
                <div className="text-sm font-bold text-pink-950">{record.doctor}</div>
                <div className="text-xs text-pink-600">{record.doctorSpecialty}</div>
              </div>
            </div>

            {/* Sections */}
            <Section icon={<Stethoscope className="h-4 w-4" />} title="Diagnosis">
              <p className="text-sm leading-relaxed text-pink-950/75">{record.diagnosis}</p>
            </Section>

            <Section icon={<FileHeart className="h-4 w-4" />} title="Tindakan Perawatan">
              <p className="text-sm leading-relaxed text-pink-950/75">{record.treatment}</p>
            </Section>

            {/* Tooth chart */}
            {record.affectedTeeth.upper.length > 0 || record.affectedTeeth.lower.length > 0 ? (
              <Section icon={<ToothIcon className="h-4 w-4" />} title="Gigi yang Diperlakukan">
                <ToothChart affected={record.affectedTeeth} />
              </Section>
            ) : null}

            {/* Prescription */}
            <Section icon={<Pill className="h-4 w-4" />} title="Resep Obat">
              <div className="space-y-2">
                {record.prescription.map((p, i) => (
                  <div key={i} className="rounded-xl border border-pink-100 bg-pink-50/40 p-3">
                    <div className="text-sm font-bold text-pink-950">{p.name}</div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-pink-950/60">
                      <span className="rounded-full bg-white px-2 py-0.5 font-semibold text-pink-700">{p.dosage}</span>
                      <span>·</span>
                      <span>{p.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section icon={<Clock className="h-4 w-4" />} title="Catatan Dokter">
              <p className="text-sm leading-relaxed text-pink-950/75">{record.notes}</p>
            </Section>

            {/* Cost */}
            <div className="mt-6 flex items-center justify-between rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 p-4">
              <div>
                <div className="text-xs font-semibold text-pink-950/55">Biaya Perawatan</div>
                <div className="font-display text-xl font-extrabold text-pink-950">
                  {formatCurrency(record.cost)}
                </div>
              </div>
              <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                Lunas
              </span>
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex gap-2">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-pink-200 bg-white py-3 text-sm font-bold text-pink-700">
                <Download className="h-4 w-4" />
                Unduh PDF
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 py-3 text-sm font-bold text-white shadow-soft-pink">
                <Calendar className="h-4 w-4" />
                Booking Ulang
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5 border-t border-pink-50 pt-5">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-100 text-pink-700">
          {icon}
        </div>
        <h3 className="font-display text-sm font-bold text-pink-950">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ToothChart({ affected }: { affected: { upper: number[]; lower: number[] } }) {
  // Standard dental notation (FDI): upper 11-28, lower 31-48
  // For simplicity, show simplified 16-tooth layout (8 upper, 8 lower)
  const upperTeeth = [11, 12, 13, 14, 15, 16, 21, 22, 23, 24, 25, 26];
  const lowerTeeth = [31, 32, 33, 34, 35, 36, 41, 42, 43, 44, 45, 46];

  const renderTooth = (num: number, isUpper: boolean) => {
    const isAffected = isUpper
      ? affected.upper.includes(num)
      : affected.lower.includes(num);
    return (
      <div key={num} className="flex flex-col items-center gap-1">
        <div
          className={cn(
            "flex h-7 w-5 items-center justify-center rounded text-[9px] font-bold transition-all",
            isAffected
              ? "bg-gradient-to-b from-pink-500 to-rose-500 text-white shadow-sm"
              : "bg-pink-50 text-pink-950/40",
          )}
          style={{ borderRadius: isUpper ? "40% 40% 30% 30%" : "30% 30% 40% 40%" }}
        >
          {num}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-2xl bg-pink-50/40 p-4">
      <div className="flex justify-center gap-0.5 border-b-2 border-pink-200/60 pb-2">
        {upperTeeth.map((t) => renderTooth(t, true))}
      </div>
      <div className="mt-2 flex justify-center gap-0.5">
        {lowerTeeth.map((t) => renderTooth(t, false))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-3 text-[10px] text-pink-950/60">
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded bg-gradient-to-b from-pink-500 to-rose-500" />
          Gigiterperlakukan
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded bg-pink-50" />
          Sehat
        </span>
      </div>
    </div>
  );
}
