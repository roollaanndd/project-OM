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

  const today = new Date().toISOString().split("T")[0];

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        if (data.errors) {
          const firstError = Object.values(data.errors)[0] as string;
          toast({
            title: "Form belum lengkap",
            description: firstError,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Gagal mengirim",
            description: data.message ?? "Terjadi kesalahan. Coba lagi ya.",
            variant: "destructive",
          });
        }
        return;
      }

      setDone(true);
      toast({
        title: "Janji temu terkirim!",
        description: "Tim OMDC akan menghubungi Anda dalam 15 menit.",
      });
      setForm({
        name: "",
        phone: "",
        email: "",
        service: "",
        doctor: "",
        date: "",
        time: "",
        notes: "",
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

  return (
    <section id="booking" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-pink-50/50 to-white" />
      <div className="absolute right-0 top-1/4 -z-10 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl" />
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
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-pink-950 sm:text-5xl">
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
                  className="flex items-start gap-4 rounded-2xl border border-pink-100 bg-white p-4 shadow-sm transition-colors hover:border-pink-200"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-white">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-pink-600">
                      {info.label}
                    </div>
                    <div className="mt-1 text-sm font-medium text-pink-950">{info.value}</div>
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
                className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-5 py-2.5 text-sm font-semibold text-pink-700 transition-colors hover:bg-pink-50"
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
            <div className="absolute -inset-3 -z-10 rounded-[36px] bg-gradient-to-br from-pink-200/60 to-rose-100/50 blur-2xl" />
            <div className="rounded-[32px] border border-pink-100 bg-white p-6 shadow-soft-pink sm:p-8">
              {done ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <m.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-glow-pink"
                  >
                    <CheckCircle2 className="h-10 w-10" />
                  </m.div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-pink-950">
                    Janji Temu Berhasil Dibuat!
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-foreground/65">
                    Terima kasih telah mempercayakan perawatan gigi Anda kepada OMDC. Tim kami akan
                    menghubungi Anda dalam 15 menit untuk konfirmasi jadwal dan detail perawatan.
                  </p>
                  <Button
                    onClick={() => setDone(false)}
                    variant="outline"
                    className="mt-6 rounded-full border-pink-200 text-pink-700 hover:bg-pink-50"
                  >
                    Buat Janji Lain
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-3 border-b border-pink-100 pb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-700">
                      <CalendarCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-pink-950">
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
                        className="rounded-xl border-pink-200 bg-white focus:border-pink-500 focus:ring-pink-500/30"
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
                        className="rounded-xl border-pink-200 bg-white focus:border-pink-500 focus:ring-pink-500/30"
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
                      className="rounded-xl border-pink-200 bg-white focus:border-pink-500 focus:ring-pink-500/30"
                      autoComplete="email"
                    />
                  </Field>

                  {/* Branch selector */}
                  <BranchSelector variant="card" />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Layanan" icon={<Stethoscope className="h-4 w-4" />} required>
                      <Select value={form.service} onValueChange={(v) => update("service", v)}>
                        <SelectTrigger className="rounded-xl border-pink-200 bg-white focus:ring-pink-500/30">
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
                        <SelectTrigger className="rounded-xl border-pink-200 bg-white focus:ring-pink-500/30">
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
                        className="rounded-xl border-pink-200 bg-white focus:border-pink-500 focus:ring-pink-500/30"
                      />
                    </Field>
                    <Field label="Waktu Janji" icon={<Clock className="h-4 w-4" />} required>
                      <Select value={form.time} onValueChange={(v) => update("time", v)}>
                        <SelectTrigger className="rounded-xl border-pink-200 bg-white focus:ring-pink-500/30">
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
                      className="min-h-[88px] resize-y rounded-xl border-pink-200 bg-white focus:border-pink-500 focus:ring-pink-500/30"
                    />
                  </Field>

                  <div className="flex items-start gap-2 rounded-2xl bg-pink-50/60 p-3 text-xs text-foreground/60">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-pink-600" />
                    Dengan mengirim form ini, Anda menyetujui Kebijakan Privasi OMDC. Data Anda
                    hanya digunakan untuk konfirmasi janji dan tidak dibagikan ke pihak ketiga.
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className={cn(
                      "w-full rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-7 py-6 text-base font-semibold text-white shadow-soft-pink hover:from-pink-700 hover:to-rose-600",
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
      <Label className="flex items-center gap-1.5 text-xs font-semibold text-pink-950">
        {icon && <span className="text-pink-500">{icon}</span>}
        {label}
        {required && <span className="text-pink-600">*</span>}
      </Label>
      {children}
    </div>
  );
}
