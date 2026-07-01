"use client";

import { useState } from "react";
import { m } from "framer-motion";
import {
  CalendarCheck,
  User,
  Phone,
  Mail,
  Stethoscope,
  Calendar,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  Loader2,
  MapPin,
  ShieldCheck,
  PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BranchSelector } from "@/components/shared/branch-selector";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const SERVICE_OPTIONS = [
  "Scaling & Polishing",
  "Pemutihan Gigi",
  "Kawat Gigi / Behel",
  "Mahkota & Gigi Palsu",
  "Root Canal",
  "Dental Kids",
  "Tambal Gigi Estetik",
  "Implant Gigi",
  "Konsultasi Umum",
];

const DOCTOR_OPTIONS = [
  "Tidak ada preferensi",
  "drg. Oktri Manessa, Sp.Ort",
  "drg. Adelia Putri, Sp.KGA",
  "drg. Reza Mahendra, Sp.Perio",
  "drg. Salsabila Karim, Sp.Pros",
];

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

const INFO = [
  {
    icon: MapPin,
    label: "Alamat Klinik",
    value: "Jl. Melati Raya No. 17, Bekasi Selatan, Jawa Barat 17141",
  },
  {
    icon: PhoneCall,
    label: "Telepon & WhatsApp",
    value: "+62 812-3456-7890",
  },
  {
    icon: Clock,
    label: "Jam Operasional",
    value: "Senin – Sabtu: 09.00 – 21.00 · Minggu: 10.00 – 16.00",
  },
];

export function Booking() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    doctor: "",
    date: "",
    time: "",
    notes: "",
  });

  // OTP Verification state
  const [otpStep, setOtpStep] = useState<"form" | "otp" | "success">("form");
  const [otpMethod, setOtpMethod] = useState<"whatsapp" | "email">("whatsapp");
  const [otpCode, setOtpCode] = useState("");
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [debugCode, setDebugCode] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Step 1: Send OTP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitting) return;
    setSubmitting(true);

    try {
      // Determine OTP method: WhatsApp if phone, Email if email provided
      const identifier = otpMethod === "whatsapp" ? form.phone : form.email;
      if (!identifier || identifier.length < 5) {
        toast({
          title: "Data tidak lengkap",
          description: otpMethod === "whatsapp" ? "Nomor telepon wajib diisi." : "Email wajib diisi untuk verifikasi email.",
          variant: "destructive",
        });
        setSubmitting(false);
        return;
      }

      // Send OTP
      const otpRes = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, method: otpMethod }),
      });
      const otpData = await otpRes.json();

      if (!otpData.ok) {
        toast({
          title: "Gagal mengirim kode",
          description: otpData.message ?? "Coba lagi ya.",
          variant: "destructive",
        });
        setSubmitting(false);
        return;
      }

      // Move to OTP verification step
      setOtpStep("otp");
      if (otpData.debugCode) {
        setDebugCode(otpData.debugCode);
      }
      toast({
        title: "Kode verifikasi terkirim!",
        description: otpData.message,
      });
    } catch (err) {
      toast({
        title: "Gagal mengirim",
        description: "Periksa koneksi internet dan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Step 2: Verify OTP + Submit booking
  const handleVerifyAndSubmit = async () => {
    if (otpVerifying) return;
    setOtpVerifying(true);

    try {
      const identifier = otpMethod === "whatsapp" ? form.phone : form.email;

      // Verify OTP
      const verifyRes = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, method: otpMethod, code: otpCode }),
      });
      const verifyData = await verifyRes.json();

      if (!verifyData.ok) {
        toast({
          title: "Verifikasi gagal",
          description: verifyData.message ?? "Kode salah.",
          variant: "destructive",
        });
        setOtpVerifying(false);
        return;
      }

      // OTP verified — now submit booking
      const bookingRes = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, verified: true }),
      });
      const bookingData = await bookingRes.json();

      if (!bookingData.ok) {
        toast({
          title: "Gagal membuat booking",
          description: bookingData.message ?? "Coba lagi ya.",
          variant: "destructive",
        });
        setOtpVerifying(false);
        return;
      }

      // Success!
      setOtpStep("success");
      setDone(true);
      toast({
        title: "Janji temu terkirim!",
        description: "Tim OMDC akan menghubungi Anda dalam 15 menit.",
      });
    } catch (err) {
      toast({
        title: "Gagal verifikasi",
        description: "Periksa koneksi internet dan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setOtpVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    setOtpSending(true);
    try {
      const identifier = otpMethod === "whatsapp" ? form.phone : form.email;
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, method: otpMethod }),
      });
      const data = await res.json();
      if (data.ok) {
        toast({ title: "Kode baru terkirim!", description: data.message });
        if (data.debugCode) setDebugCode(data.debugCode);
      }
    } catch {
      toast({ title: "Gagal", description: "Coba lagi.", variant: "destructive" });
    } finally {
      setOtpSending(false);
    }
  };

  return (
    <section id="booking" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-gray-50/50 to-white" />
      <div className="absolute right-0 top-1/4 -z-10 h-72 w-72 rounded-full bg-gray-200/30 blur-3xl" />
      <div className="absolute left-0 bottom-1/4 -z-10 h-72 w-72 rounded-full bg-rose-200/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
          {/* Left: info */}
          <m.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-pink-700">
              Buat Janji Temu
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
              Mulai perjalanan
              <br />
              <span className="text-gradient-pink">senyum sehat Anda</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground/70">
              Isi form di samping untuk membuat janji temu. Tim OMDC akan menghubungi Anda dalam
              15 menit untuk konfirmasi jadwal. Konsultasi pertama gratis — tanpa kewajiban.
            </p>

            <div className="mt-8 space-y-4">
              {INFO.map((info) => (
                <div
                  key={info.label}
                  className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-colors hover:border-gray-200"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-500 to-rose-600 text-white">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                      {info.label}
                    </div>
                    <div className="mt-1 text-sm font-medium text-gray-900">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick contact buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105"
              >
                <PhoneCall className="h-4 w-4" />
                Chat WhatsApp
              </a>
              <a
                href="tel:+6281234567890"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                <Phone className="h-4 w-4" />
                Telepon Sekarang
              </a>
            </div>
          </m.div>

          {/* Right: form */}
          <m.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-3 -z-10 rounded-[36px] bg-gradient-to-br from-gray-200/60 to-gray-100/50 blur-2xl" />
            <div className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-soft-pink sm:p-8">
              {otpStep === "otp" ? (
                /* === OTP Verification Step === */
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-md">
                    {otpMethod === "whatsapp" ? (
                      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    ) : (
                      <Mail className="h-8 w-8" />
                    )}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-gray-900">Verifikasi {otpMethod === "whatsapp" ? "WhatsApp" : "Email"}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Kode 4-digit telah dikirim ke{" "}
                    <span className="font-bold">{otpMethod === "whatsapp" ? form.phone : form.email}</span>
                  </p>

                  {/* Debug code display (development only) */}
                  {debugCode && (
                    <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-2 text-sm">
                      <span className="font-bold text-amber-700">[DEV] Kode Anda: </span>
                      <span className="font-mono text-lg font-extrabold text-amber-900">{debugCode}</span>
                    </div>
                  )}

                  {/* OTP Input */}
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="••••"
                    maxLength={4}
                    className="mt-5 w-40 rounded-2xl border-2 border-gray-200 bg-white py-4 text-center font-display text-3xl font-extrabold tracking-[0.5em] text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-200"
                  />

                  {/* Verify Button */}
                  <button
                    onClick={handleVerifyAndSubmit}
                    disabled={otpCode.length !== 4 || otpVerifying}
                    className={cn(
                      "mt-4 flex w-full max-w-xs items-center justify-center gap-2 rounded-full py-3.5 text-base font-bold transition-all",
                      otpCode.length === 4 && !otpVerifying
                        ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-soft-pink active:scale-[0.98]"
                        : "cursor-not-allowed bg-gray-100 text-gray-400",
                    )}
                  >
                    {otpVerifying ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Memverifikasi...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-5 w-5" />
                        Verifikasi & Kirim Booking
                      </>
                    )}
                  </button>

                  {/* Resend + Back */}
                  <div className="mt-4 flex items-center gap-4 text-xs">
                    <button
                      onClick={handleResendOTP}
                      disabled={otpSending}
                      className="font-semibold text-pink-600 hover:underline"
                    >
                      {otpSending ? "Mengirim..." : "Kirim ulang kode"}
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => {
                        setOtpStep("form");
                        setOtpCode("");
                        setDebugCode(null);
                      }}
                      className="font-semibold text-gray-500 hover:text-gray-700"
                    >
                      Ubah data
                    </button>
                  </div>

                  {/* Switch method */}
                  <div className="mt-3 text-xs text-gray-400">
                    {otpMethod === "whatsapp" && form.email ? (
                      <button onClick={() => { setOtpMethod("email"); setOtpCode(""); }} className="hover:text-pink-600">
                        Kirim via Email sebagai gantinya
                      </button>
                    ) : otpMethod === "email" ? (
                      <button onClick={() => { setOtpMethod("whatsapp"); setOtpCode(""); }} className="hover:text-pink-600">
                        Kirim via WhatsApp sebagai gantinya
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : done ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <m.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gray-500 to-rose-600 text-white shadow-glow-pink"
                  >
                    <CheckCircle2 className="h-10 w-10" />
                  </m.div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-gray-900">
                    Janji Temu Berhasil Dibuat!
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-foreground/65">
                    Terima kasih telah mempercayakan perawatan gigi Anda kepada OMDC. Tim kami akan
                    menghubungi Anda dalam 15 menit untuk konfirmasi jadwal dan detail perawatan.
                  </p>
                  <Button
                    onClick={() => setDone(false)}
                    variant="outline"
                    className="mt-6 rounded-full border-gray-200 text-gray-700 hover:bg-gray-50"
                  >
                    Buat Janji Lain
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                      <CalendarCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-gray-900">
                        Formulir Janji Temu
                      </h3>
                      <p className="text-xs text-foreground/55">
                        Isi data dengan benar — kami menjaga privasi Anda.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="Nama Lengkap"
                      icon={<User className="h-4 w-4" />}
                      required
                    >
                      <Input
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="cth. Sarah Wijayanti"
                        className="rounded-xl border-gray-200 bg-white focus:border-gray-500 focus:ring-gray-500/30"
                        autoComplete="name"
                      />
                    </Field>
                    <Field
                      label="Nomor Telepon / WhatsApp"
                      icon={<Phone className="h-4 w-4" />}
                      required
                    >
                      <Input
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="0812-3456-7890"
                        className="rounded-xl border-gray-200 bg-white focus:border-gray-500 focus:ring-gray-500/30"
                        inputMode="tel"
                        autoComplete="tel"
                      />
                    </Field>
                  </div>

                  <Field label="Email (opsional)" icon={<Mail className="h-4 w-4" />}>
                    <Input
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="nama@email.com"
                      type="email"
                      className="rounded-xl border-gray-200 bg-white focus:border-gray-500 focus:ring-gray-500/30"
                      autoComplete="email"
                    />
                  </Field>

                  {/* Branch selector */}
                  <BranchSelector variant="card" />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Layanan" icon={<Stethoscope className="h-4 w-4" />} required>
                      <Select value={form.service} onValueChange={(v) => update("service", v)}>
                        <SelectTrigger className="rounded-xl border-gray-200 bg-white focus:ring-gray-500/30">
                          <SelectValue placeholder="Pilih layanan" />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICE_OPTIONS.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Dokter (opsional)" icon={<User className="h-4 w-4" />}>
                      <Select value={form.doctor} onValueChange={(v) => update("doctor", v)}>
                        <SelectTrigger className="rounded-xl border-gray-200 bg-white focus:ring-gray-500/30">
                          <SelectValue placeholder="Pilih dokter" />
                        </SelectTrigger>
                        <SelectContent>
                          {DOCTOR_OPTIONS.map((d) => (
                            <SelectItem key={d} value={d}>
                              {d}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Tanggal Janji" icon={<Calendar className="h-4 w-4" />} required>
                      <Input
                        value={form.date}
                        onChange={(e) => update("date", e.target.value)}
                        type="date"
                        min={today}
                        className="rounded-xl border-gray-200 bg-white focus:border-pink-500 focus:ring-pink-500/30"
                      />
                      {!form.date && (
                        <p className="mt-1 text-[11px] text-amber-600">Klik untuk memilih tanggal</p>
                      )}
                    </Field>
                    <Field label="Waktu Janji" icon={<Clock className="h-4 w-4" />} required>
                      <Select value={form.time} onValueChange={(v) => update("time", v)}>
                        <SelectTrigger className="rounded-xl border-gray-200 bg-white focus:ring-gray-500/30">
                          <SelectValue placeholder="Pilih jam" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_SLOTS.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t} WIB
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  <Field label="Catatan (opsional)" icon={<MessageSquare className="h-4 w-4" />}>
                    <Textarea
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      placeholder="cth. Saya memiliki alergi tertentu / riwayat sakit gigi sebelumnya"
                      className="min-h-[88px] resize-y rounded-xl border-gray-200 bg-white focus:border-gray-500 focus:ring-gray-500/30"
                    />
                  </Field>

                  <div className="flex items-start gap-2 rounded-2xl bg-gray-50/60 p-3 text-xs text-foreground/60">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" />
                    Dengan mengirim form ini, Anda menyetujui Kebijakan Privasi OMDC. Data Anda
                    hanya digunakan untuk konfirmasi janji dan tidak dibagikan ke pihak ketiga.
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className={cn(
                      "w-full rounded-full bg-gradient-to-r from-pink-600 to-gray-500 px-7 py-6 text-base font-semibold text-white shadow-soft-pink hover:from-pink-700 hover:to-rose-600",
                      submitting && "opacity-80",
                    )}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Kirim Permintaan Janji
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  icon,
  required,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-center gap-1.5 text-xs font-semibold text-gray-900">
        {icon && <span className="text-gray-500">{icon}</span>}
        {label}
        {required && <span className="text-gray-600">*</span>}
      </Label>
      {children}
    </div>
  );
}
