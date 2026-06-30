"use client";

import { m } from "framer-motion";
import { Star, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/app-store";

interface Step2Props {
  doctorId: string;
  setDoctorId: (id: string) => void;
}

export function BookingStep2({ doctorId, setDoctorId }: Step2Props) {
  const { doctors } = useAppStore();
  const availableDoctors = doctors.filter((d) => d.status !== "off");

  return (
    <m.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      <h2 className="font-display text-xl font-bold text-gray-900">Pilih Dokter</h2>
      <p className="mt-1 text-xs text-gray-500">Pilih dokter spesialis yang sesuai</p>

      <div className="mt-4 space-y-3">
        <button onClick={() => setDoctorId("any")} className={cn("flex w-full items-center gap-3 rounded-2xl border-2 bg-white p-4 text-left transition-all", doctorId === "any" ? "border-pink-500 shadow-soft-pink" : "border-pink-100")}>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 text-white"><Star className="h-6 w-6" /></div>
          <div className="flex-1"><div className="text-sm font-bold text-gray-900">Dokter Tersedia</div><div className="text-xs text-gray-500">Pilih dokter dengan slot terdekat</div></div>
        </button>

        {availableDoctors.map((doc, i) => (
          <m.button key={doc.id} onClick={() => setDoctorId(doc.id)} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileTap={{ scale: 0.99 }} className={cn("relative flex w-full items-center gap-3 rounded-2xl border-2 bg-white p-4 text-left transition-all", doctorId === doc.id ? "border-pink-500 shadow-soft-pink" : "border-pink-100")}>
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${doc.gradient} text-base font-bold text-white shadow-sm`}>{doc.initials}</div>
            <div className="flex-1">
              <div className="text-sm font-bold text-gray-900">{doc.name}</div>
              <div className="text-xs text-pink-600">{doc.specialty}</div>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-xs font-bold text-amber-600"><Star className="h-3 w-3 fill-amber-400 text-amber-400" />{doc.rating}</div>
                <span className="text-[11px] text-gray-400">·</span>
                <span className="text-[11px] text-gray-500">{doc.avail.join(", ")}</span>
              </div>
            </div>
            {doctorId === doc.id && <m.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500 text-white"><Check className="h-3.5 w-3.5" strokeWidth={3} /></m.div>}
          </m.button>
        ))}
      </div>
    </m.div>
  );
}
