"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import {
  ChevronLeft,
  QrCode,
  Search,
  Check,
  Calendar,
  Clock,
  User,
  Sparkles,
  Camera,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "input" | "found" | "not-found";

export function KioskCheckIn({ onComplete, onBack }: { onComplete: (ticket: any) => void; onBack: () => void }) {
  const { appointments, addQueueEntry, queue, updateAppointmentStatus } = useAppStore();
  const [mode, setMode] = useState<"scan" | "code">("code");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<Step>("input");
  const [foundApt, setFoundApt] = useState<any>(null);

  const handleLookup = () => {
    // Search by booking ID (apt-XXX) or phone number
    const normalized = code.trim().toLowerCase();
    const apt = appointments.find(
      (a) =>
        a.id.toLowerCase() === normalized ||
        a.phone?.toLowerCase() === normalized ||
        a.patientPhone?.toLowerCase() === normalized ||
        normalized.includes(a.id.toLowerCase().replace("apt-", "")),
    );

    // Also accept "apt-001" / "apt-002" / "001" / "002"
    const aptById = appointments.find((a) => {
      const num = a.id.replace("apt-", "").toLowerCase();
      return normalized === num || normalized === a.id.toLowerCase();
    });

    const found = apt || aptById;

    if (found && found.status === "upcoming") {
      setFoundApt(found);
      setStep("found");
    } else if (found && found.status === "cancelled") {
      setStep("not-found");
    } else {
      // For demo, allow any code starting with "apt-" or any 3-digit number
      if (normalized.match(/^apt-?\d+$/) || normalized.match(/^\d{3}$/)) {
        const demoApt = appointments[0];
        if (demoApt) {
          setFoundApt(demoApt);
          setStep("found");
          return;
        }
      }
      setStep("not-found");
    }
  };

  const handleConfirm = () => {
    if (!foundApt) return;

    // Mark appointment as checked-in (still upcoming but with queue entry)
    // Create queue entry
    const entry = addQueueEntry({
      patientName: foundApt.doctor ? "Sarah Wijayanti" : "Pasien Booking", // demo
      patientPhone: foundApt.phone,
      service: foundApt.service,
      serviceIcon: foundApt.serviceIcon,
      doctor: foundApt.doctor,
      doctorInitials: foundApt.doctorInitials,
      doctorGradient: foundApt.doctorGradient,
      status: "waiting",
      source: "booking",
      bookingId: foundApt.id,
    });

    const waitingCount = useAppStore.getState().queue.filter((q) => q.status === "waiting" && q.id !== entry.id).length;

    onComplete({
      ticketNumber: entry.number,
      patientName: "Sarah Wijayanti",
      service: foundApt.service,
      doctor: foundApt.doctor,
      doctorInitials: foundApt.doctorInitials,
      doctorGradient: foundApt.doctorGradient,
      queuePosition: waitingCount + 1,
      estimatedWait: waitingCount * 15,
      bookingId: foundApt.id,
    });
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-br from-fuchsia-50 to-pink-50">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-pink-200 bg-white px-8 py-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-full bg-pink-100 px-4 py-2 text-sm font-bold text-pink-700 hover:bg-pink-200"
        >
          <ChevronLeft className="h-4 w-4" />
          Kembali
        </button>
        <div className="font-display text-base font-bold text-pink-950">Check-in Booking</div>
        <div className="w-24" />
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            {step === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white shadow-md">
                    <QrCode className="h-7 w-7" />
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-extrabold text-pink-950">
                    Check-in Janji Temu
                  </h2>
                  <p className="mt-1 text-sm text-pink-950/55">
                    Pilih metode check-in di bawah ini
                  </p>
                </div>

                {/* Mode toggle */}
                <div className="mt-6 flex gap-2 rounded-2xl bg-pink-100 p-1.5">
                  <button
                    onClick={() => setMode("code")}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all",
                      mode === "code" ? "bg-white text-pink-700 shadow-sm" : "text-pink-950/50",
                    )}
                  >
                    <Search className="h-4 w-4" />
                    Kode Booking
                  </button>
                  <button
                    onClick={() => setMode("scan")}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all",
                      mode === "scan" ? "bg-white text-pink-700 shadow-sm" : "text-pink-950/50",
                    )}
                  >
                    <Camera className="h-4 w-4" />
                    Scan QR
                  </button>
                </div>

                {mode === "code" ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6"
                  >
                    <label className="text-xs font-bold text-pink-950">Kode Booking atau No. Telepon</label>
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleLookup()}
                      placeholder="cth. apt-001 atau 081234567890"
                      className="mt-1.5 w-full rounded-2xl border-2 border-pink-200 bg-white px-5 py-4 text-center font-mono text-lg font-bold text-pink-950 placeholder:text-pink-950/30 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-200"
                    />
                    <button
                      onClick={handleLookup}
                      disabled={!code.trim()}
                      className={cn(
                        "mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold transition-all",
                        code.trim()
                          ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-md active:scale-95"
                          : "cursor-not-allowed bg-pink-100 text-pink-950/30",
                      )}
                    >
                      <Search className="h-5 w-5" />
                      Cari Booking
                    </button>

                    {/* Demo hints */}
                    <div className="mt-4 rounded-2xl border border-pink-200 bg-pink-50 p-3 text-center text-xs text-pink-950/65">
                      💡 <span className="font-bold">Demo:</span> Coba kode <code className="rounded bg-white px-1.5 py-0.5 font-mono font-bold text-pink-700">apt-001</code> atau <code className="rounded bg-white px-1.5 py-0.5 font-mono font-bold text-pink-700">001</code>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6"
                  >
                    <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-3xl border-4 border-pink-300 bg-pink-950">
                      {/* Mock camera viewfinder */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative h-3/4 w-3/4">
                          {/* Corner brackets */}
                          <div className="absolute left-0 top-0 h-8 w-8 border-l-4 border-t-4 border-pink-400" />
                          <div className="absolute right-0 top-0 h-8 w-8 border-r-4 border-t-4 border-pink-400" />
                          <div className="absolute bottom-0 left-0 h-8 w-8 border-b-4 border-l-4 border-pink-400" />
                          <div className="absolute bottom-0 right-0 h-8 w-8 border-b-4 border-r-4 border-pink-400" />
                          {/* Scanning line */}
                          <motion.div
                            className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent"
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <QrCode className="h-20 w-20 text-pink-400/40" />
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold text-white backdrop-blur">
                        Arahkan QR ke kamera
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setCode("apt-001");
                        setMode("code");
                        setTimeout(handleLookup, 100);
                      }}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3 text-sm font-bold text-pink-700 shadow-sm hover:bg-pink-50"
                    >
                      <Camera className="h-4 w-4" />
                      Simulasi Scan QR (Demo)
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {step === "found" && foundApt && (
              <motion.div
                key="found"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 16 }}
                    className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-md"
                  >
                    <Check className="h-7 w-7" strokeWidth={3} />
                  </motion.div>
                  <h2 className="mt-3 font-display text-2xl font-extrabold text-pink-950">
                    Booking Ditemukan!
                  </h2>
                  <p className="mt-1 text-sm text-pink-950/55">
                    Konfirmasi data booking Anda di bawah
                  </p>
                </div>

                <div className="mt-6 overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-md">
                  <div className="bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-white/80">Kode Booking</div>
                        <div className="font-mono text-lg font-bold">{foundApt.id.toUpperCase()}</div>
                      </div>
                      <Sparkles className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="divide-y divide-pink-50">
                    <div className="flex items-center gap-3 p-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-pink-950/55">Pasien</div>
                        <div className="text-sm font-bold text-pink-950">Sarah Wijayanti</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-pink-950/55">Layanan</div>
                        <div className="text-sm font-bold text-pink-950">{foundApt.service}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${foundApt.doctorGradient} text-white`}>
                        <span className="text-xs font-bold">{foundApt.doctorInitials}</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-pink-950/55">Dokter</div>
                        <div className="text-sm font-bold text-pink-950">{foundApt.doctor}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-pink-950/55">Jadwal</div>
                        <div className="text-sm font-bold text-pink-950">
                          {new Date(foundApt.date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })} · {foundApt.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleConfirm}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-500 py-4 text-base font-bold text-white shadow-md active:scale-95"
                >
                  <Check className="h-5 w-5" strokeWidth={3} />
                  Konfirmasi & Ambil Nomor Antrian
                </button>
              </motion.div>
            )}

            {step === "not-found" && (
              <motion.div
                key="not-found"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                  <X className="h-7 w-7" />
                </div>
                <h2 className="mt-3 font-display text-2xl font-extrabold text-pink-950">
                  Booking Tidak Ditemukan
                </h2>
                <p className="mt-1 text-sm text-pink-950/55">
                  Kode booking salah atau janji temu telah berlalu
                </p>
                <button
                  onClick={() => {
                    setStep("input");
                    setCode("");
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-3 text-sm font-bold text-white shadow-md"
                >
                  Coba Lagi
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
