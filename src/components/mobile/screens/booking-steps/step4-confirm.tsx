"use client";

import { m } from "framer-motion";
import { Users } from "lucide-react";
import { SERVICES, formatDate } from "../../mock-data";
import { ServiceIcon } from "../../icons";
import { useAppStore } from "@/lib/app-store";

interface Step4Props {
  serviceId: string;
  doctorId: string;
  date: string;
  time: string;
  patientId: string;
}

export function BookingStep4({ serviceId, doctorId, date, time, patientId }: Step4Props) {
  const { user, doctors } = useAppStore();
  const service = SERVICES.find((s) => s.id === serviceId);
  const doctor = doctors.find((d) => d.id === doctorId);
  const patientName = patientId === "u-001" ? user?.name : user?.familyMembers.find((f) => f.id === patientId)?.name;

  return (
    <m.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      <h2 className="font-display text-xl font-bold text-gray-900">Konfirmasi Booking</h2>
      <p className="mt-1 text-xs text-gray-500">Pastikan detail di bawah sudah benar</p>

      <div className="mt-4 overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm">
        <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-5 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm"><ServiceIcon name={service?.icon ?? "sparkles"} className="h-6 w-6" /></div>
            <div><div className="text-xs text-white/80">Layanan</div><div className="font-display text-base font-bold">{service?.name}</div></div>
          </div>
        </div>
        <div className="divide-y divide-pink-50">
          <Row label="Dokter" value={doctorId === "any" ? "Dokter Tersedia" : doctor?.name ?? ""} />
          <Row label="Tanggal" value={date ? formatDate(date, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "-"} />
          <Row label="Waktu" value={time ? `${time} WIB` : "-"} />
          <Row label="Durasi" value={service?.duration ?? "-"} />
          <Row label="Klinik" value="OMDC Bekasi Selatan" />
        </div>
        <div className="flex items-center justify-between border-t-2 border-pink-50 bg-pink-50/50 p-5">
          <div><div className="text-xs text-gray-500">Estimasi Biaya</div><div className="font-display text-xl font-bold text-gray-900">{service?.price}</div></div>
          <div className="rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-700">Bayar di klinik</div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-pink-100 bg-white p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600"><Users className="h-4 w-4" /></div>
          <div className="flex-1"><div className="text-xs font-semibold text-gray-500">Pasien</div><div className="text-sm font-bold text-gray-900">{patientName}</div></div>
        </div>
      </div>
    </m.div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 py-3">
      <span className="text-xs font-medium text-gray-500">{label}</span>
      <span className="flex-1 text-right text-sm font-semibold text-gray-900">{value}</span>
    </div>
  );
}
