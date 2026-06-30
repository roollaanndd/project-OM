"use client";

import { m } from "framer-motion";
import {
  ShieldCheck,
  Microscope,
  Clock,
  HeartHandshake,
  Wallet,
  Wifi,
  Baby,
  CalendarClock,
} from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Sterilisasi Kelas RS",
    desc: "Seluruh instrumen melalui proses autoclave standar rumah sakit dan dibungkus single-use untuk tiap pasien.",
  },
  {
    icon: Microscope,
    title: "Teknologi Digital",
    desc: "X-ray digital rendah radiasi, intra-oral scanner, dan mikroskop endodontik untuk diagnosis presisi.",
  },
  {
    icon: Clock,
    title: "Tanpa Antrian Panjang",
    desc: "Sistem booking online dengan jadwal terstruktur — waktu Anda berharga, kami menghargainya.",
  },
  {
    icon: HeartHandshake,
    title: "Dokter Empatik",
    desc: "Tim dokter gigi ramah, sabar, dan terlatih menangani pasien dengan dental anxiety.",
  },
  {
    icon: Wallet,
    title: "Harga Transparan",
    desc: "Estimasi biaya disampaikan di awal tanpa biaya tersembunyi. Tersedia cicilan 0% hingga 12 bulan.",
  },
  {
    icon: Wifi,
    title: "Fasilitas Nyaman",
    desc: "Ruang tunggu dengan WiFi, minuman hangat, dan ruang treatment bersuhu nyaman.",
  },
  {
    icon: Baby,
    title: "Ramah Anak",
    desc: "Ruang bermain khusus, dokter gigi anak bersertifikat, dan teknik minim trauma untuk si kecil.",
  },
  {
    icon: CalendarClock,
    title: "Buka 7 Hari",
    desc: "Layanan tersedia Senin–Minggu, termasuk hari libur nasional, dengan jam operasional fleksibel.",
  },
];

export function Features() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Background: gradient + grid + blobs */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-50/60 via-white to-rose-50/40" />
      <div className="absolute right-1/4 top-0 -z-10 h-80 w-80 rounded-full bg-fuchsia-200/25 blur-3xl" />
      <div className="absolute left-1/4 bottom-0 -z-10 h-80 w-80 rounded-full bg-pink-200/25 blur-3xl" />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #DB2777 1px, transparent 1px), linear-gradient(to bottom, #DB2777 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 80%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Left copy */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-28"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-pink-700">
              Kenapa OMDC
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-pink-950 sm:text-5xl">
              Perawatan gigi yang
              <br />
              <span className="text-gradient-pink">aman, nyaman, &amp; terpercaya</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-foreground/70">
              Kami percaya kualitas perawatan gigi tidak hanya ditentukan oleh keahlian dokter,
              tetapi juga oleh pengalaman menyeluruh yang Anda rasakan — dari pemesanan janji,
              kenyamanan di klinik, hingga tindak lanjut pasca perawatan.
            </p>

            {/* Highlight card */}
            <div className="mt-8 rounded-3xl border border-pink-100 bg-white p-6 shadow-soft-pink">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-pink-950">Jaminan Keamanan OMDC</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">
                    Setiap perawatan di OMDC mengikuti protokol infeksi control berstandar
                    internasional. Instrumen disterilisasi dengan autoclave kelas rumah sakit dan
                    dikemas single-use untuk tiap pasien.
                  </p>
                </div>
              </div>
            </div>

            {/* mini stats */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-pink-50/60 p-4 text-center">
                <div className="text-2xl font-bold text-pink-700">0</div>
                <div className="mt-1 text-[11px] text-foreground/60">Insiden Infeksi</div>
              </div>
              <div className="rounded-2xl bg-pink-50/60 p-4 text-center">
                <div className="text-2xl font-bold text-pink-700">100%</div>
                <div className="mt-1 text-[11px] text-foreground/60">Alat Steril</div>
              </div>
              <div className="rounded-2xl bg-pink-50/60 p-4 text-center">
                <div className="text-2xl font-bold text-pink-700">ISO</div>
                <div className="mt-1 text-[11px] text-foreground/60">9001:2015</div>
              </div>
            </div>
          </m.div>

          {/* Right grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <m.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
                className="group relative overflow-hidden rounded-3xl border border-pink-100 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-soft-pink"
              >
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-pink-100/60 transition-transform duration-300 group-hover:scale-150" />
                <div className="relative">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50 text-pink-700 transition-colors group-hover:bg-pink-600 group-hover:text-white">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-pink-950">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/65">{f.desc}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
