"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { SERVICES, DOCTORS } from "@/components/mobile/mock-data";
import { ServiceIcon } from "@/components/mobile/icons";
import {
  ChevronLeft,
  User,
  Phone,
  Mail,
  Calendar,
  Check,
  ChevronRight,
  Sparkles,
  Home as HomeIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3 | 4;

export function KioskWalkIn({ onComplete, onBack }: { onComplete: (ticket: any) => void; onBack: () => void }) {
  const { addWalkInPatient, addQueueEntry, doctors } = useAppStore();
  const [step, setStep] = useState<Step>(1);

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [serviceId, setServiceId] = useState("");
  const [doctorId, setDoctorId] = useState("");

  const service = SERVICES.find((s) => s.id === serviceId);
  const doctor = doctors.find((d) => d.id === doctorId);

  const canNext = () => {
    if (step === 1) return name.length >= 3 && phone.length >= 8;
    if (step === 2) return !!serviceId;
    if (step === 3) return !!doctorId;
    return true;
  };

  const handleComplete = () => {
    // 1. Register walk-in patient
    const patient = addWalkInPatient({
      name,
      phone,
      email: email || undefined,
      age: age ? parseInt(age) : undefined,
      isFirstVisit,
    });

    // 2. Create queue entry
    const entry = addQueueEntry({
      patientName: name,
      patientPhone: phone,
      service: service?.name ?? "",
      serviceIcon: service?.icon ?? "sparkles",
      doctor: doctor?.name,
      doctorInitials: doctor?.initials,
      doctorGradient: doctor?.gradient,
      status: "waiting",
      source: "walk-in",
    });

    onComplete({
      ticketNumber: entry.number,
      patientName: name,
      service: service?.name,
      doctor: doctor?.name,
      doctorInitials: doctor?.initials,
      doctorGradient: doctor?.gradient,
      queuePosition: useAppStore.getState().queue.filter((q) => q.status === "waiting").length,
      estimatedWait: useAppStore.getState().queue.filter((q) => q.status === "waiting").length * 15,
    });
  };

  const availableDoctors = doctors.filter((d) => d.status !== "off");

  return (
    <div className="flex h-full flex-col bg-gradient-to-br from-pink-50 to-rose-50">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-pink-200 bg-white px-8 py-3">
        <button
          onClick={() => (step === 1 ? onBack() : setStep((s) => (s - 1) as Step))}
          className="flex items-center gap-1.5 rounded-full bg-pink-100 px-4 py-2 text-sm font-bold text-pink-700 hover:bg-pink-200"
        >
          <ChevronLeft className="h-4 w-4" />
          Kembali
        </button>

        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors",
                  s < step
                    ? "bg-pink-600 text-white"
                    : s === step
                      ? "bg-pink-600 text-white ring-4 ring-pink-200"
                      : "bg-pink-100 text-pink-950/40",
                )}
              >
                {s < step ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : s}
              </div>
              {s < 4 && <div className={cn("h-1 w-8 rounded", s < step ? "bg-pink-600" : "bg-pink-100")} />}
            </div>
          ))}
        </div>

        <div className="text-xs font-bold text-pink-950/55">
          Step {step} of 4 · Walk-In Registration
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            {/* Step 1: Personal info */}
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-md">
                    <User className="h-7 w-7" />
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-extrabold text-pink-950">
                    Data Diri Pasien
                  </h2>
                  <p className="mt-1 text-sm text-pink-950/55">
                    Masukkan data diri sesuai KTP/SIM
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <KioskInput
                    label="Nama Lengkap"
                    icon={<User className="h-5 w-5" />}
                    value={name}
                    onChange={setName}
                    placeholder="cth. Sarah Wijayanti"
                    required
                    big
                  />
                  <KioskInput
                    label="Nomor Telepon"
                    icon={<Phone className="h-5 w-5" />}
                    value={phone}
                    onChange={setPhone}
                    placeholder="0812-3456-7890"
                    type="tel"
                    required
                    big
                  />
                  <KioskInput
                    label="Email (opsional)"
                    icon={<Mail className="h-5 w-5" />}
                    value={email}
                    onChange={setEmail}
                    placeholder="nama@email.com"
                    type="email"
                    big
                  />
                  <KioskInput
                    label="Usia"
                    icon={<Calendar className="h-5 w-5" />}
                    value={age}
                    onChange={setAge}
                    placeholder="28"
                    type="number"
                    big
                  />
                </div>

                {/* First visit toggle */}
                <div className="mt-5 rounded-2xl border border-pink-200 bg-white p-4">
                  <div className="text-sm font-bold text-pink-950">Kunjungan pertama di OMDC?</div>
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => setIsFirstVisit(true)}
                      className={cn(
                        "flex-1 rounded-xl border-2 py-3 text-sm font-bold transition-colors",
                        isFirstVisit
                          ? "border-pink-500 bg-pink-50 text-pink-700"
                          : "border-pink-100 text-pink-950/55",
                      )}
                    >
                      ✨ Ya, pasien baru
                    </button>
                    <button
                      onClick={() => setIsFirstVisit(false)}
                      className={cn(
                        "flex-1 rounded-xl border-2 py-3 text-sm font-bold transition-colors",
                        !isFirstVisit
                          ? "border-pink-500 bg-pink-50 text-pink-700"
                          : "border-pink-100 text-pink-950/55",
                      )}
                    >
                      👋 Pasien lama
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Service */}
            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-fuchsia-600 text-white shadow-md">
                    <Sparkles className="h-7 w-7" />
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-extrabold text-pink-950">
                    Pilih Layanan
                  </h2>
                  <p className="mt-1 text-sm text-pink-950/55">
                    Sentuh layanan yang diinginkan
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-3">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setServiceId(s.id)}
                      className={cn(
                        "relative overflow-hidden rounded-2xl border-2 bg-white p-4 text-left transition-all",
                        serviceId === s.id ? "border-pink-500 shadow-md ring-4 ring-pink-200" : "border-pink-100",
                      )}
                    >
                      {serviceId === s.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-pink-500 text-white"
                        >
                          <Check className="h-4 w-4" strokeWidth={3} />
                        </motion.div>
                      )}
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-sm`}>
                        <ServiceIcon name={s.icon} className="h-6 w-6" />
                      </div>
                      <div className="mt-3 text-sm font-bold leading-tight text-pink-950">
                        {s.name}
                      </div>
                      <div className="mt-1 text-xs text-pink-950/55">{s.price}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Doctor */}
            {step === 3 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white shadow-md">
                    <User className="h-7 w-7" />
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-extrabold text-pink-950">
                    Pilih Dokter
                  </h2>
                  <p className="mt-1 text-sm text-pink-950/55">
                    Pilih dokter yang tersedia hari ini
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {/* Any doctor option */}
                  <button
                    onClick={() => setDoctorId("any")}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border-2 bg-white p-4 text-left transition-all",
                      doctorId === "any" ? "border-pink-500 shadow-md ring-4 ring-pink-200" : "border-pink-100",
                    )}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 text-white">
                      <Sparkles className="h-7 w-7" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-pink-950">Dokter Tersedia</div>
                      <div className="text-xs text-pink-950/55">Slot terdekat</div>
                    </div>
                  </button>

                  {availableDoctors.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => setDoctorId(doc.id)}
                      className={cn(
                        "relative flex items-center gap-3 rounded-2xl border-2 bg-white p-4 text-left transition-all",
                        doctorId === doc.id ? "border-pink-500 shadow-md ring-4 ring-pink-200" : "border-pink-100",
                      )}
                    >
                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${doc.gradient} text-base font-bold text-white`}>
                        {doc.initials}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-pink-950">{doc.name}</div>
                        <div className="text-xs text-pink-600">{doc.specialty}</div>
                        <div className="mt-1 flex items-center gap-2">
                          <span className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-bold",
                            doc.status === "available" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700",
                          )}>
                            {doc.status === "available" ? "Tersedia" : "Sibuk"}
                          </span>
                          <span className="text-[10px] text-pink-950/55">{doc.patientsToday} pasien hari ini</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirm */}
            {step === 4 && (
              <motion.div
                key="s4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                    <Check className="h-7 w-7" strokeWidth={3} />
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-extrabold text-pink-950">
                    Konfirmasi Pendaftaran
                  </h2>
                  <p className="mt-1 text-sm text-pink-950/55">
                    Pastikan data di bawah sudah benar
                  </p>
                </div>

                <div className="mx-auto mt-6 max-w-xl overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-md">
                  <div className="grid grid-cols-2 divide-x divide-pink-100">
                    <div className="p-5">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-pink-950/45">Nama Pasien</div>
                      <div className="mt-1 font-display text-base font-bold text-pink-950">{name}</div>
                      <div className="text-xs text-pink-950/55">{phone}</div>
                    </div>
                    <div className="p-5">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-pink-950/45">Kunjungan</div>
                      <div className="mt-1 font-display text-base font-bold text-pink-950">
                        {isFirstVisit ? "Pasien Baru" : "Pasien Lama"}
                      </div>
                      <div className="text-xs text-pink-950/55">{age ? `${age} tahun` : "-"}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-pink-100 border-t border-pink-100">
                    <div className="p-5">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-pink-950/45">Layanan</div>
                      <div className="mt-1 font-display text-base font-bold text-pink-950">{service?.name}</div>
                      <div className="text-xs text-pink-950/55">{service?.price}</div>
                    </div>
                    <div className="p-5">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-pink-950/45">Dokter</div>
                      <div className="mt-1 font-display text-base font-bold text-pink-950">
                        {doctorId === "any" ? "Dokter Tersedia" : doctor?.name}
                      </div>
                      <div className="text-xs text-pink-950/55">{doctorId === "any" ? "Slot terdekat" : doctor?.specialty}</div>
                    </div>
                  </div>
                </div>

                <div className="mx-auto mt-4 max-w-xl rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center">
                  <div className="text-xs font-semibold text-amber-700">
                    ℹ️ Setelah konfirmasi, Anda akan menerima nomor antrian
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-pink-200 bg-white px-8 py-3">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-full border border-pink-200 px-5 py-2.5 text-sm font-bold text-pink-950/60 hover:bg-pink-50"
          >
            <HomeIcon className="h-4 w-4" />
            Batal
          </button>
          <button
            onClick={() => (step === 4 ? handleComplete() : setStep((s) => (s + 1) as Step))}
            disabled={!canNext()}
            className={cn(
              "flex items-center gap-2 rounded-full px-8 py-3 text-base font-bold transition-all",
              canNext()
                ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-md active:scale-95"
                : "cursor-not-allowed bg-pink-100 text-pink-950/30",
            )}
          >
            {step === 4 ? "Ambil Nomor Antrian" : "Lanjut"}
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function KioskInput({
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  big,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  big?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-bold text-pink-950">
        {label} {required && <span className="text-pink-600">*</span>}
      </label>
      <div className="relative mt-1.5">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-2xl border-2 border-pink-200 bg-white pl-12 pr-4 text-pink-950 placeholder:text-pink-950/30 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-200",
            big ? "py-4 text-base" : "py-3 text-sm",
          )}
        />
      </div>
    </div>
  );
}
