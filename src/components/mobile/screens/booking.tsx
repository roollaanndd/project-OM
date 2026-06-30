"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { BranchSelector } from "@/components/shared/branch-selector";
import { QRCodeDisplay } from "@/components/shared/qr-code-display";
import { SERVICES, DOCTORS, TIME_SLOTS, formatDate } from "../mock-data";
import { ServiceIcon } from "../icons";
import {
  ChevronLeft,

  Check,
  Star,
  Clock,

  Sparkles,
  PartyPopper,
  ArrowRight,
  Users,
  QrCode,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3 | 4 | 5;

export function BookingScreen() {
  const { user, addAppointment, setActiveTab } = useAppStore();
  const [step, setStep] = useState<Step>(1);
  const [serviceId, setServiceId] = useState<string>("");
  const [doctorId, setDoctorId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [patientId, setPatientId] = useState<string>("u-001");

  const service = SERVICES.find((s) => s.id === serviceId);
  const doctor = DOCTORS.find((d) => d.id === doctorId);

  const today = new Date();

  // Generate next 14 days for date selection
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return {
      iso: d.toISOString().split("T")[0],
      day: d.toLocaleDateString("id-ID", { weekday: "short" }),
      dayNum: d.getDate(),
      month: d.toLocaleDateString("id-ID", { month: "short" }),
    };
  });

  const canNext = () => {
    if (step === 1) return !!serviceId;
    if (step === 2) return !!doctorId;
    if (step === 3) return !!date && !!time;
    return true;
  };

  const handleNext = () => {
    if (!canNext()) return;
    if (step === 4) {
      // Create appointment
      const newApt = {
        id: `apt-${Date.now()}`,
        service: service?.name ?? "",
        serviceIcon: service?.icon ?? "sparkles",
        doctor: doctor?.name ?? "",
        doctorInitials: doctor?.initials ?? "",
        doctorGradient: doctor?.gradient ?? "from-pink-500 to-rose-500",
        date,
        time,
        duration: service?.duration ?? "30 menit",
        status: "upcoming" as const,
        price: parseInt((service?.price ?? "0").replace(/\D/g, "")) || 250000,
        clinic: "OMDC Bekasi Selatan",
        address: "Jl. Melati Raya No. 17, Bekasi Selatan",
      };
      addAppointment(newApt);
      setStep(5);
      return;
    }
    setStep((s) => (s + 1) as Step);
  };

  const handleBack = () => {
    if (step === 1) {
      setActiveTab("home");
      return;
    }
    setStep((s) => (s - 1) as Step);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 px-5 py-4 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-pink-700 shadow-sm"
            aria-label="Kembali"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="font-display text-base font-bold text-pink-950">
            {step === 5 ? "Booking Berhasil" : "Buat Janji Temu"}
          </h1>
          <div className="w-10" />
        </div>

        {/* Progress steps */}
        {step < 5 && (
          <div className="mt-4 flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors duration-300",
                  s <= step ? "bg-gradient-to-r from-pink-500 to-rose-500" : "bg-pink-200/60",
                )}
              />
            ))}
          </div>
        )}
        {step < 5 && (
          <div className="mt-2 flex justify-between text-[10px] font-medium text-pink-950/50">
            <span className={step >= 1 ? "text-pink-700" : ""}>Layanan</span>
            <span className={step >= 2 ? "text-pink-700" : ""}>Dokter</span>
            <span className={step >= 3 ? "text-pink-700" : ""}>Waktu</span>
            <span className={step >= 4 ? "text-pink-700" : ""}>Konfirmasi</span>
          </div>
        )}
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <AnimatePresence mode="wait">
          {/* Step 1: Service */}
          {step === 1 && (
            <m.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-display text-xl font-bold text-pink-950">Pilih Layanan</h2>
              <p className="mt-1 text-xs text-pink-950/55">
                Pilih layanan yang sesuai dengan kebutuhan gigi Anda
              </p>

              {/* Branch selector */}
              <div className="mt-4">
                <BranchSelector variant="compact" />
              </div>

              {/* Patient selector */}
              <div className="mt-4">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-pink-950">
                  <Users className="h-3.5 w-3.5" />
                  Pasien
                </div>
                <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <button
                    onClick={() => setPatientId("u-001")}
                    className={cn(
                      "flex shrink-0 items-center gap-2 rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition-colors",
                      patientId === "u-001" ? "border-pink-500 bg-pink-50 text-pink-700" : "border-pink-100 bg-white text-pink-950/60",
                    )}
                  >
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br ${user?.gradient} text-[10px] font-bold text-white`}>
                      {user?.initials}
                    </div>
                    Saya
                  </button>
                  {user?.familyMembers.map((fam) => (
                    <button
                      key={fam.id}
                      onClick={() => setPatientId(fam.id)}
                      className={cn(
                        "flex shrink-0 items-center gap-2 rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition-colors",
                        patientId === fam.id ? "border-pink-500 bg-pink-50 text-pink-700" : "border-pink-100 bg-white text-pink-950/60",
                      )}
                    >
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br ${fam.gradient} text-[10px] font-bold text-white`}>
                        {fam.initials}
                      </div>
                      {fam.name.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                {SERVICES.map((s, i) => (
                  <m.button
                    key={s.id}
                    onClick={() => setServiceId(s.id)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      "relative overflow-hidden rounded-2xl border-2 bg-white p-4 text-left transition-all",
                      serviceId === s.id
                        ? "border-pink-500 shadow-soft-pink"
                        : "border-pink-100",
                    )}
                  >
                    {serviceId === s.id && (
                      <m.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-white"
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </m.div>
                    )}
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-sm`}>
                      <ServiceIcon name={s.icon} className="h-5 w-5" />
                    </div>
                    <div className="mt-3 text-sm font-bold leading-tight text-pink-950">
                      {s.name}
                    </div>
                    <div className="mt-1 text-[11px] text-pink-950/55">{s.price}</div>
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-pink-950/45">
                      <Clock className="h-2.5 w-2.5" />
                      {s.duration}
                    </div>
                  </m.button>
                ))}
              </div>
            </m.div>
          )}

          {/* Step 2: Doctor */}
          {step === 2 && (
            <m.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-display text-xl font-bold text-pink-950">Pilih Dokter</h2>
              <p className="mt-1 text-xs text-pink-950/55">
                Pilih dokter spesialis yang sesuai
              </p>

              <div className="mt-4 space-y-3">
                <button
                  onClick={() => setDoctorId("any")}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl border-2 bg-white p-4 text-left transition-all",
                    doctorId === "any" ? "border-pink-500 shadow-soft-pink" : "border-pink-100",
                  )}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 text-white">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-pink-950">Dokter Tersedia</div>
                    <div className="text-xs text-pink-950/55">Pilih dokter dengan slot terdekat</div>
                  </div>
                </button>

                {DOCTORS.map((doc, i) => (
                  <m.button
                    key={doc.id}
                    onClick={() => setDoctorId(doc.id)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.99 }}
                    className={cn(
                      "relative flex w-full items-center gap-3 rounded-2xl border-2 bg-white p-4 text-left transition-all",
                      doctorId === doc.id ? "border-pink-500 shadow-soft-pink" : "border-pink-100",
                    )}
                  >
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${doc.gradient} text-base font-bold text-white shadow-sm`}>
                      {doc.initials}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-pink-950">{doc.name}</div>
                      <div className="text-xs text-pink-600">{doc.specialty}</div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="flex items-center gap-0.5 text-xs font-bold text-amber-600">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          {doc.rating}
                        </div>
                        <span className="text-[11px] text-pink-950/50">·</span>
                        <span className="text-[11px] text-pink-950/55">{doc.avail.join(", ")}</span>
                      </div>
                    </div>
                    {doctorId === doc.id && (
                      <m.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500 text-white"
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </m.div>
                    )}
                  </m.button>
                ))}
              </div>
            </m.div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <m.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-display text-xl font-bold text-pink-950">Pilih Tanggal</h2>
              <p className="mt-1 text-xs text-pink-950/55">
                14 hari ke depan tersedia
              </p>

              <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {days.map((d) => (
                  <button
                    key={d.iso}
                    onClick={() => setDate(d.iso)}
                    className={cn(
                      "flex h-20 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border-2 transition-all",
                      date === d.iso
                        ? "border-pink-500 bg-gradient-to-b from-pink-500 to-rose-500 text-white shadow-soft-pink"
                        : "border-pink-100 bg-white text-pink-950",
                    )}
                  >
                    <span className={cn("text-[10px] font-bold uppercase", date === d.iso ? "text-white/80" : "text-pink-950/50")}>
                      {d.day}
                    </span>
                    <span className="font-display text-xl font-extrabold">{d.dayNum}</span>
                    <span className={cn("text-[10px] font-medium", date === d.iso ? "text-white/70" : "text-pink-950/40")}>
                      {d.month}
                    </span>
                  </button>
                ))}
              </div>

              <h3 className="mt-6 font-display text-base font-bold text-pink-950">
                Pilih Waktu
              </h3>
              <p className="mt-1 text-xs text-pink-950/55">Slot tersedia untuk tanggal dipilih</p>

              <div className="mt-4 grid grid-cols-4 gap-2">
                {TIME_SLOTS.map((t, i) => {
                  // Mock some unavailable slots
                  const unavailable = i % 7 === 3 || i % 11 === 5;
                  return (
                    <button
                      key={t}
                      disabled={unavailable || !date}
                      onClick={() => setTime(t)}
                      className={cn(
                        "rounded-xl border-2 py-2.5 text-xs font-bold transition-all",
                        unavailable
                          ? "cursor-not-allowed border-pink-50 bg-pink-50/50 text-pink-950/25 line-through"
                          : time === t
                            ? "border-pink-500 bg-pink-500 text-white shadow-sm"
                            : "border-pink-100 bg-white text-pink-950 hover:border-pink-300",
                      )}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>

              {!date && (
                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
                  Pilih tanggal terlebih dahulu untuk melihat slot waktu
                </div>
              )}
            </m.div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <m.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-display text-xl font-bold text-pink-950">Konfirmasi Booking</h2>
              <p className="mt-1 text-xs text-pink-950/55">
                Pastikan detail di bawah sudah benar
              </p>

              <div className="mt-4 overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm">
                {/* Service summary */}
                <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-5 text-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                      <ServiceIcon name={service?.icon ?? "sparkles"} className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-xs text-white/80">Layanan</div>
                      <div className="font-display text-base font-bold">{service?.name}</div>
                    </div>
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
                  <div>
                    <div className="text-xs text-pink-950/55">Estimasi Biaya</div>
                    <div className="font-display text-xl font-bold text-pink-950">
                      {service?.price}
                    </div>
                  </div>
                  <div className="rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-700">
                    Bayar di klinik
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-pink-100 bg-white p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-pink-950/60">Pasien</div>
                    <div className="text-sm font-bold text-pink-950">
                      {patientId === "u-001" ? user?.name : user?.familyMembers.find((f) => f.id === patientId)?.name}
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <m.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center py-8 text-center"
            >
              {/* Confetti emojis */}
              {[...Array(8)].map((_, i) => (
                <m.div
                  key={i}
                  className="absolute text-2xl"
                  initial={{ opacity: 0, y: -20, x: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [50, 250],
                    x: [(i - 4) * 30, (i - 4) * 60],
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatDelay: 1 }}
                  style={{ left: "50%", top: "10%" }}
                >
                  {["🎉", "✨", "🦷", "⭐", "💖", "🎈", "🌟", "🎊"][i]}
                </m.div>
              ))}

              <m.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.2 }}
                className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-glow-pink"
              >
                <Check className="h-12 w-12" strokeWidth={3} />
                <m.div
                  className="absolute inset-0 rounded-full border-4 border-pink-300"
                  animate={{ scale: [1, 1.4], opacity: [1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </m.div>

              <m.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 flex items-center gap-2 font-display text-2xl font-extrabold text-pink-950"
              >
                <PartyPopper className="h-6 w-6 text-pink-500" />
                Booking Berhasil!
              </m.h2>

              <m.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-2 max-w-xs text-sm text-pink-950/60"
              >
                Janji temu Anda telah terjadwal. Kami akan mengirim pengingat 1 jam sebelumnya.
              </m.p>

              <m.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 w-full rounded-3xl border border-pink-100 bg-white p-5 text-left shadow-sm"
              >
                <div className="space-y-3 text-sm">
                  <Row label="Layanan" value={service?.name ?? ""} />
                  <Row label="Dokter" value={doctorId === "any" ? "Dokter Tersedia" : doctor?.name ?? ""} />
                  <Row label="Tanggal" value={date ? formatDate(date, { weekday: "long", day: "numeric", month: "long" }) : ""} />
                  <Row label="Waktu" value={time ? `${time} WIB` : ""} />
                </div>
              </m.div>

              {/* QR Code for check-in */}
              <m.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="mt-4 flex flex-col items-center rounded-3xl border-2 border-pink-200 bg-pink-50/40 p-5"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-700">
                  <QrCode className="h-3.5 w-3.5" />
                  QR Check-in Kiosk
                </div>
                <p className="mt-1 text-[11px] text-pink-950/55">
                  Tunjukkan QR ini di e-Kiosk OMDC untuk check-in cepat
                </p>
                <div className="mt-3">
                  <QRCodeDisplay
                    type="booking"
                    id={`apt-${Date.now()}`}
                    size={180}
                    downloadable={false}
                    data={{
                      service: service?.name,
                      doctor: doctorId === "any" ? "Dokter Tersedia" : doctor?.name,
                      date,
                      time,
                      patientName: "Sarah Wijayanti",
                    }}
                  />
                </div>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-6 flex w-full gap-2"
              >
                <button
                  onClick={() => {
                    setActiveTab("home");
                  }}
                  className="flex-1 rounded-full border border-pink-200 bg-white py-3 text-sm font-bold text-pink-700"
                >
                  Lihat di Beranda
                </button>
                <button
                  onClick={() => {
                    setStep(1);
                    setServiceId("");
                    setDoctorId("");
                    setDate("");
                    setTime("");
                  }}
                  className="flex-1 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 py-3 text-sm font-bold text-white shadow-soft-pink"
                >
                  Booking Lagi
                </button>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer button (hidden on step 5) */}
      {step < 5 && (
        <div className="border-t border-pink-100 bg-white/95 px-5 py-3 backdrop-blur-md">
          <button
            onClick={handleNext}
            disabled={!canNext()}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-base font-bold transition-all",
              canNext()
                ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-soft-pink active:scale-[0.98]"
                : "cursor-not-allowed bg-pink-100 text-pink-950/30",
            )}
          >
            {step === 4 ? "Konfirmasi Booking" : "Lanjut"}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 py-3">
      <span className="text-xs font-medium text-pink-950/55">{label}</span>
      <span className="flex-1 text-right text-sm font-semibold text-pink-950">{value}</span>
    </div>
  );
}
