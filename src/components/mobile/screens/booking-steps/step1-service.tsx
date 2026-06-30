"use client";

import { m } from "framer-motion";
import { BranchSelector } from "@/components/shared/branch-selector";
import { SERVICES, DOCTORS, TIME_SLOTS } from "../../mock-data";
import { ServiceIcon } from "../../icons";
import { Users, Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/app-store";

interface Step1Props {
  serviceId: string;
  setServiceId: (id: string) => void;
  patientId: string;
  setPatientId: (id: string) => void;
}

export function BookingStep1({ serviceId, setServiceId, patientId, setPatientId }: Step1Props) {
  const { user } = useAppStore();

  return (
    <m.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      <h2 className="font-display text-xl font-bold text-gray-900">Pilih Layanan</h2>
      <p className="mt-1 text-xs text-gray-500">Pilih layanan yang sesuai dengan kebutuhan gigi Anda</p>

      <div className="mt-4">
        <BranchSelector variant="compact" />
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-gray-900">
          <Users className="h-3.5 w-3.5" />
          Pasien
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button onClick={() => setPatientId("u-001")} className={cn("flex shrink-0 items-center gap-2 rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition-colors", patientId === "u-001" ? "border-pink-500 bg-pink-50 text-pink-700" : "border-pink-100 bg-white text-gray-600")}>
            <div className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br ${user?.gradient ?? "from-pink-500 to-rose-500"} text-[10px] font-bold text-white`}>{user?.initials ?? "U"}</div>
            Saya
          </button>
          {user?.familyMembers.map((fam) => (
            <button key={fam.id} onClick={() => setPatientId(fam.id)} className={cn("flex shrink-0 items-center gap-2 rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition-colors", patientId === fam.id ? "border-pink-500 bg-pink-50 text-pink-700" : "border-pink-100 bg-white text-gray-600")}>
              <div className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br ${fam.gradient} text-[10px] font-bold text-white`}>{fam.initials}</div>
              {fam.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {SERVICES.map((s, i) => (
          <m.button key={s.id} onClick={() => setServiceId(s.id)} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} whileTap={{ scale: 0.97 }} className={cn("relative overflow-hidden rounded-2xl border-2 bg-white p-4 text-left transition-all", serviceId === s.id ? "border-pink-500 shadow-soft-pink" : "border-pink-100")}>
            {serviceId === s.id && <m.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-white"><Check className="h-3 w-3" strokeWidth={3} /></m.div>}
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-sm`}><ServiceIcon name={s.icon} className="h-5 w-5" /></div>
            <div className="mt-3 text-sm font-bold leading-tight text-gray-900">{s.name}</div>
            <div className="mt-1 text-[11px] text-gray-500">{s.price}</div>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-400"><Clock className="h-2.5 w-2.5" />{s.duration}</div>
          </m.button>
        ))}
      </div>
    </m.div>
  );
}
