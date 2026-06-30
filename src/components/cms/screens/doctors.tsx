"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useAppStore } from "@/lib/app-store";
import { Star, Plus, Settings as SettingsIcon, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export function CmsDoctors() {
  const { doctors, updateDoctorStatus } = useAppStore();

  const statusOptions: { id: "available" | "busy" | "off"; label: string; color: string }[] = [
    { id: "available", label: "Tersedia", color: "bg-emerald-100 text-emerald-700" },
    { id: "busy", label: "Sibuk", color: "bg-amber-100 text-amber-700" },
    { id: "off", label: "Libur", color: "bg-pink-100 text-pink-700" },
  ];

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Dokter", value: doctors.length, color: "from-pink-500 to-rose-500" },
          { label: "Tersedia", value: doctors.filter((d) => d.status === "available").length, color: "from-emerald-500 to-teal-600" },
          { label: "Sibuk", value: doctors.filter((d) => d.status === "busy").length, color: "from-amber-400 to-pink-500" },
          { label: "Libur", value: doctors.filter((d) => d.status === "off").length, color: "from-pink-400 to-rose-500" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-pink-100 bg-white p-3 shadow-sm">
            <div className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} text-white`}>
              <Star className="h-4 w-4" />
            </div>
            <div className="mt-2 font-display text-xl font-bold text-pink-950">{s.value}</div>
            <div className="text-[10px] text-pink-950/55">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="font-display text-base font-bold text-pink-950">Tim Dokter OMDC</h2>
        <button className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-3 py-1.5 text-xs font-bold text-white">
          <Plus className="h-3.5 w-3.5" /> Tambah Dokter
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${doc.gradient} text-base font-bold text-white`}>
                {doc.photo ? (
                  <Image src={doc.photo} alt={doc.name} fill className="object-cover" sizes="56px" />
                ) : (
                  doc.initials
                )}
                <span className={cn(
                  "absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white",
                  doc.status === "available" ? "bg-emerald-500" : doc.status === "busy" ? "bg-amber-500" : "bg-pink-400",
                )} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="truncate font-display text-sm font-bold text-pink-950">{doc.name}</div>
                <div className="text-xs text-pink-600">{doc.specialty}</div>
                <div className="mt-1 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-amber-600">{doc.rating}</span>
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-pink-50 pt-3 text-center">
              <div>
                <div className="font-display text-lg font-bold text-pink-950">{doc.patientsToday}</div>
                <div className="text-[10px] text-pink-950/55">Pasien Hari Ini</div>
              </div>
              <div>
                <div className="font-display text-lg font-bold text-pink-950">{doc.avail.length}</div>
                <div className="text-[10px] text-pink-950/55">Hari Praktik</div>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-1">
              {doc.avail.map((d) => (
                <span key={d} className="rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-bold text-pink-700">
                  {d}
                </span>
              ))}
            </div>

            {/* Status selector */}
            <div className="mt-3 flex gap-1">
              {statusOptions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => updateDoctorStatus(doc.id, s.id)}
                  className={cn(
                    "flex-1 rounded-lg py-1.5 text-[10px] font-bold transition-all",
                    doc.status === s.id ? s.color : "bg-pink-50/40 text-pink-950/40 hover:bg-pink-50",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
