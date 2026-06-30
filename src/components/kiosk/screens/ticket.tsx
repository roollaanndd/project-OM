"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import {
  Check,
  Clock,
  User,
  Sparkles,
  Stethoscope,
  MapPin,
  Printer,
  Home as HomeIcon,
} from "lucide-react";

interface TicketData {
  ticketNumber: string;
  patientName: string;
  service: string;
  doctor?: string;
  doctorInitials?: string;
  doctorGradient?: string;
  queuePosition: number;
  estimatedWait: number;
  bookingId?: string;
}

export function KioskTicket({ data, onDone }: { data: TicketData; onDone: () => void }) {
  const { clinicSettings, queue } = useAppStore();
  const nowServing = queue.find((q) => q.status === "serving");
  const waitingAhead = queue.filter((q) => q.status === "waiting" && q.number !== data.ticketNumber).length;

  return (
    <div className="flex h-full flex-col bg-gray-50">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-xl">
          {/* Success header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
              className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-md"
            >
              <Check className="h-9 w-9" strokeWidth={3} />
            </motion.div>
            <h2 className="mt-3 font-display text-2xl font-extrabold text-pink-950">
              {data.bookingId ? "Check-in Berhasil!" : "Pendaftaran Berhasil!"}
            </h2>
            <p className="mt-1 text-sm text-pink-950/55">
              Simpan nomor antrian Anda. Tim kami akan memanggil sesuai urutan.
            </p>
          </motion.div>

          {/* Ticket */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 18 }}
            className="relative mt-6 overflow-hidden rounded-3xl border-2 border-dashed border-pink-300 bg-white shadow-lg"
          >
            {/* Perforation top */}
            <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-pink-50" />
            <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-pink-50" />

            {/* Top section */}
            <div className="bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-white/80">Klinik Gigi OMDC</div>
                  <div className="text-[10px] text-white/70">Oktri Manessa Dental Clinic</div>
                </div>
                <svg viewBox="0 0 48 48" className="h-9 w-9">
                  <path d="M24 2l18 6v14c0 12-8 20-18 24C14 42 6 34 6 22V8l18-6z" fill="white" />
                  <path d="M24 12c-3.5 0-5 1.4-7.5 1.4-2 0-4 1-4 4.6 0 4 1.4 6 2.5 9.4 0.8 2.6 1.4 7.4 3 7.4 1.5 0 1.6-3.4 2.4-6 0.6-1.8 1.1-2.8 3.6-2.8s3 1 3.6 2.8c0.8 2.6 0.9 6 2.4 6 1.6 0 2.2-4.8 3-7.4 1.1-3.4 2.5-5.4 2.5-9.4 0-3.6-2-4.6-4-4.6C29 13.4 27.5 12 24 12z" fill="#DB2777" />
                </svg>
              </div>
              <div className="mt-4 text-center">
                <div className="text-xs font-semibold uppercase tracking-wider text-white/80">Nomor Antrian</div>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 220, damping: 16 }}
                  className="font-display text-7xl font-extrabold tracking-tight"
                >
                  {data.ticketNumber}
                </motion.div>
              </div>
            </div>

            {/* Detail */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-pink-950/45">Pasien</div>
                    <div className="font-bold text-pink-950">{data.patientName}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-pink-950/45">Layanan</div>
                    <div className="font-bold text-pink-950">{data.service}</div>
                  </div>
                </div>
                {data.doctor && (
                  <div className="flex items-center gap-2 col-span-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${data.doctorGradient ?? "from-pink-500 to-rose-500"} text-white`}>
                      <span className="text-[10px] font-bold">{data.doctorInitials}</span>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-pink-950/45">Dokter</div>
                      <div className="font-bold text-pink-950">{data.doctor}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Queue info */}
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-pink-100 pt-4 text-center">
                <div className="rounded-xl bg-pink-50 p-2">
                  <div className="text-[10px] uppercase tracking-wider text-pink-950/45">Sedang Dilayani</div>
                  <div className="font-display text-xl font-extrabold text-pink-700">{nowServing?.number ?? "-"}</div>
                </div>
                <div className="rounded-xl bg-amber-50 p-2">
                  <div className="text-[10px] uppercase tracking-wider text-pink-950/45">Antrian di Depan</div>
                  <div className="font-display text-xl font-extrabold text-amber-600">{waitingAhead}</div>
                </div>
                <div className="rounded-xl bg-emerald-50 p-2">
                  <div className="text-[10px] uppercase tracking-wider text-pink-950/45">Estimasi</div>
                  <div className="font-display text-xl font-extrabold text-emerald-600">{data.estimatedWait}m</div>
                </div>
              </div>

              {data.bookingId && (
                <div className="mt-3 rounded-xl bg-fuchsia-50 px-3 py-2 text-center text-xs font-semibold text-fuchsia-700">
                  ✨ Check-in dari booking: <span className="font-mono font-bold">{data.bookingId.toUpperCase()}</span>
                </div>
              )}

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-pink-950/45">
                <Clock className="h-3 w-3" />
                Dicetak: {new Date().toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}
              </div>
            </div>

            {/* Barcode */}
            <div className="border-t border-dashed border-pink-200 bg-pink-50/40 px-6 py-3">
              <div className="flex h-8 items-center justify-center gap-px">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-pink-950"
                    style={{
                      width: i % 3 === 0 ? "3px" : i % 2 === 0 ? "2px" : "1px",
                      height: "100%",
                    }}
                  />
                ))}
              </div>
              <div className="mt-1 text-center font-mono text-[10px] font-bold tracking-widest text-pink-950/70">
                {data.ticketNumber} · {data.patientName.toUpperCase().substring(0, 10)} · {new Date().getTime().toString().slice(-6)}
              </div>
            </div>
          </motion.div>

          {/* Info notice */}
          <div className="mt-4 flex items-start gap-2 rounded-2xl border border-pink-200 bg-white p-3 text-xs text-pink-950/65">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
            <div>
              <span className="font-bold text-pink-950">Mohon tunggu di ruang tunggu.</span> Nomor antrian
              Anda akan ditampilkan di layar monitor dan dipanggil oleh resepsionis. Estimasi waktu tunggu
              dapat berubah sesuai kondisi.
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-5 flex gap-3">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-pink-200 bg-white py-3 text-sm font-bold text-pink-700 hover:bg-pink-50">
              <Printer className="h-4 w-4" />
              Cetak Ulang
            </button>
            <button
              onClick={onDone}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-500 py-3 text-sm font-bold text-white shadow-md active:scale-95"
            >
              <HomeIcon className="h-4 w-4" />
              Selesai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
