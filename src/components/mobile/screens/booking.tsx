"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { SERVICES, DOCTORS, TIME_SLOTS, formatDate } from "../mock-data";
import { ServiceIcon } from "../icons";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingStep1 } from "./booking-steps/step1-service";
import { BookingStep2 } from "./booking-steps/step2-doctor";
import { BookingStep3 } from "./booking-steps/step3-datetime";
import { BookingStep4 } from "./booking-steps/step4-confirm";
import { BookingStep5 } from "./booking-steps/step5-success";

type Step = 1 | 2 | 3 | 4 | 5;

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

export function BookingScreen({ onComplete, onBack }: { onComplete: (ticket: any) => void; onBack: () => void }) {
  const { setActiveTab, addAppointment } = useAppStore();
  const [step, setStep] = useState<Step>(1);
  const [serviceId, setServiceId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [patientId, setPatientId] = useState("u-001");

  const service = SERVICES.find((s) => s.id === serviceId);
  const doctor = DOCTORS.find((d) => d.id === doctorId);

  const canNext = () => {
    if (step === 1) return !!serviceId;
    if (step === 2) return !!doctorId;
    if (step === 3) return !!date && !!time;
    return true;
  };

  const handleNext = () => {
    if (!canNext()) return;
    if (step === 4) {
      const newApt = {
        id: `apt-${Date.now()}`,
        service: service?.name ?? "",
        serviceIcon: service?.icon ?? "sparkles",
        doctor: doctorId === "any" ? "Dokter Tersedia" : doctor?.name ?? "",
        doctorInitials: doctor?.initials ?? "",
        doctorGradient: doctor?.gradient ?? "from-pink-500 to-rose-500",
        date, time,
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
    if (step === 1) { onBack(); return; }
    setStep((s) => (s - 1) as Step);
  };

  const handleReset = () => {
    setStep(1); setServiceId(""); setDoctorId(""); setDate(""); setTime("");
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 px-5 py-4 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between">
          <button onClick={handleBack} className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-700 shadow-sm" aria-label="Kembali"><ChevronLeft className="h-5 w-5" /></button>
          <h1 className="font-display text-base font-bold text-gray-900">{step === 5 ? "Booking Berhasil" : "Buat Janji Temu"}</h1>
          <div className="w-10" />
        </div>
        {step < 5 && (
          <>
            <div className="mt-4 flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className={cn("h-1.5 flex-1 rounded-full transition-colors duration-300", s <= step ? "bg-gradient-to-r from-pink-500 to-rose-500" : "bg-gray-200")} />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] font-medium text-gray-400">
              <span className={step >= 1 ? "text-pink-700" : ""}>Layanan</span>
              <span className={step >= 2 ? "text-pink-700" : ""}>Dokter</span>
              <span className={step >= 3 ? "text-pink-700" : ""}>Waktu</span>
              <span className={step >= 4 ? "text-pink-700" : ""}>Konfirmasi</span>
            </div>
          </>
        )}
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <AnimatePresence mode="wait">
          {step === 1 && <BookingStep1 serviceId={serviceId} setServiceId={setServiceId} patientId={patientId} setPatientId={setPatientId} />}
          {step === 2 && <BookingStep2 doctorId={doctorId} setDoctorId={setDoctorId} />}
          {step === 3 && <BookingStep3 date={date} setDate={setDate} time={time} setTime={setTime} />}
          {step === 4 && <BookingStep4 serviceId={serviceId} doctorId={doctorId} date={date} time={time} patientId={patientId} />}
          {step === 5 && <BookingStep5 serviceId={serviceId} doctorId={doctorId} date={date} time={time} onReset={handleReset} onHome={() => setActiveTab("home")} />}
        </AnimatePresence>
      </div>

      {/* Footer */}
      {step < 5 && (
        <div className="border-t border-gray-100 bg-white/95 px-5 py-3 backdrop-blur-md">
          <button onClick={handleNext} disabled={!canNext()} className={cn("flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-base font-bold transition-all", canNext() ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-soft-pink active:scale-[0.98]" : "cursor-not-allowed bg-gray-100 text-gray-400")}>
            {step === 4 ? "Konfirmasi Booking" : "Lanjut"}
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
