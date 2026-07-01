"use client";

import { m } from "framer-motion";
import { PartyPopper, Check } from "lucide-react";
import { QRCodeDisplay } from "@/components/shared/qr-code-display";
import { SERVICES, formatDate } from "../../mock-data";
import { ServiceIcon } from "../../icons";
import { useAppStore } from "@/lib/app-store";

interface Step5Props {
  serviceId: string;
  doctorId: string;
  date: string;
  time: string;
  onReset: () => void;
  onHome: () => void;
}

export function BookingStep5({ serviceId, doctorId, date, time, onReset, onHome }: Step5Props) {
  const { doctors, user } = useAppStore();
  const service = SERVICES.find((s) => s.id === serviceId);
  const doctor = doctors.find((d) => d.id === doctorId);
  const patientName = user?.name ?? "Pasien";

  return (
    <m.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="flex flex-col items-center py-8 text-center">
      {/* Confetti */}
      {[...Array(8)].map((_, i) => (
        <m.div key={i} className="absolute text-2xl" initial={{ opacity: 0, y: -20, x: 0 }} animate={{ opacity: [0, 1, 0], y: [50, 250], x: [(i - 4) * 30, (i - 4) * 60], rotate: [0, 360] }} transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatDelay: 1 }} style={{ left: "50%", top: "10%" }}>
          {["🎉", "✨", "🦷", "⭐", "💖", "🎈", "🌟", "🎊"][i]}
        </m.div>
      ))}

      <m.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.2 }} className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-glow-pink">
        <Check className="h-12 w-12" strokeWidth={3} />
        <m.div className="absolute inset-0 rounded-full border-4 border-pink-300" animate={{ scale: [1, 1.4], opacity: [1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
      </m.div>

      <h2 className="mt-6 flex items-center gap-2 font-display text-2xl font-extrabold text-gray-900"><PartyPopper className="h-6 w-6 text-pink-500" />Booking Berhasil!</h2>
      <p className="mt-2 max-w-xs text-sm text-gray-500">Janji temu Anda telah terjadwal. Kami akan mengirim pengingat 1 jam sebelumnya.</p>

      <div className="mt-6 w-full rounded-3xl border border-pink-100 bg-white p-5 text-left shadow-sm">
        <div className="space-y-3 text-sm">
          <Row label="Layanan" value={service?.name ?? ""} />
          <Row label="Dokter" value={doctorId === "any" ? "Dokter Tersedia" : doctor?.name ?? ""} />
          <Row label="Tanggal" value={date ? formatDate(date, { weekday: "long", day: "numeric", month: "long" }) : ""} />
          <Row label="Waktu" value={time ? `${time} WIB` : ""} />
        </div>
      </div>

      {/* QR Code */}
      <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="mt-4 flex flex-col items-center rounded-3xl border-2 border-pink-200 bg-pink-50/40 p-5">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-700">QR Check-in Kiosk</div>
        <p className="mt-1 text-[11px] text-gray-500">Tunjukkan QR ini di e-Kiosk OMDC untuk check-in cepat</p>
        <div className="mt-3">
          <QRCodeDisplay type="booking" id={`apt-${Date.now()}`} size={180} downloadable={false} data={{ service: service?.name, doctor: doctorId === "any" ? "Dokter Tersedia" : doctor?.name, date, time, patientName }} />
        </div>
      </m.div>

      <div className="mt-6 flex w-full gap-2">
        <button onClick={onHome} className="flex-1 rounded-full border border-pink-200 bg-white py-3 text-sm font-bold text-pink-700">Lihat di Beranda</button>
        <button onClick={onReset} className="flex-1 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 py-3 text-sm font-bold text-white shadow-soft-pink">Booking Lagi</button>
      </div>
    </m.div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs font-medium text-gray-500">{label}</span>
      <span className="flex-1 text-right text-sm font-semibold text-gray-900">{value}</span>
    </div>
  );
}
