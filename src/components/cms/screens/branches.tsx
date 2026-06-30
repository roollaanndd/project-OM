"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useAppStore } from "@/lib/app-store";
import { MapPin, Phone, Clock, Edit3, Plus, Star, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function CmsBranches() {
  const { branches, doctors } = useAppStore();

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { label: "Total Cabang", value: branches.length, color: "from-pink-500 to-rose-500" },
          { label: "Cabang Utama", value: branches.filter((b) => b.isPrimary).length, color: "from-rose-500 to-fuchsia-600" },
          { label: "Total Dokter", value: doctors.length, color: "from-fuchsia-500 to-pink-600" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-pink-100 bg-white p-3 shadow-sm">
            <div className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} text-white`}>
              <Building2 className="h-4 w-4" />
            </div>
            <div className="mt-2 font-display text-xl font-bold text-pink-950">{s.value}</div>
            <div className="text-[10px] text-pink-950/55">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="font-display text-base font-bold text-pink-950">Cabang Klinik</h2>
        <button className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-3 py-1.5 text-xs font-bold text-white">
          <Plus className="h-3.5 w-3.5" /> Tambah Cabang
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {branches.map((branch, i) => {
          const branchDoctors = doctors.filter((d) => d.branchIds?.includes(branch.id));
          return (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm"
            >
              {/* Header with gradient */}
              <div className="relative bg-gradient-to-br from-pink-500 to-rose-500 p-4 text-white">
                {branch.isPrimary && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold text-pink-700">
                    <Star className="h-3 w-3 fill-pink-500 text-pink-500" />
                    Cabang Utama
                  </span>
                )}
                <h3 className="font-display text-lg font-bold">{branch.name}</h3>
                <p className="mt-0.5 text-xs text-white/80">{branch.area}</p>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
                  <p className="text-xs text-foreground/70">{branch.address}</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-pink-500" />
                  <a href={`tel:${branch.phone}`} className="text-xs font-medium text-pink-700 hover:underline">
                    {branch.phone}
                  </a>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
                  <p className="text-xs text-foreground/70">{branch.openHours}</p>
                </div>

                {/* Doctors at this branch */}
                <div className="border-t border-pink-100 pt-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-pink-950/55">
                    Dokter di cabang ini ({branchDoctors.length})
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {branchDoctors.map((doc) => (
                      <span
                        key={doc.id}
                        className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-bold text-pink-700"
                      >
                        {doc.photo ? (
                          <span className="relative inline-block h-4 w-4 overflow-hidden rounded-full">
                            <Image src={doc.photo} alt={doc.name} fill className="object-cover" sizes="16px" />
                          </span>
                        ) : (
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-pink-200 text-[8px]">
                            {doc.initials}
                          </span>
                        )}
                        {doc.name.split(" ")[1]}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-pink-200 py-1.5 text-xs font-bold text-pink-700 hover:bg-pink-50">
                    <Edit3 className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button className="flex-1 rounded-lg bg-pink-50 py-1.5 text-xs font-bold text-pink-700 hover:bg-pink-100">
                    Lihat Antrian
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
