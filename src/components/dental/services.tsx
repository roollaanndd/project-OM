"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Smile,
  Stethoscope,
  Wrench,
  Baby,
  Crown,
  Activity,
  ShieldPlus,
  ArrowUpRight,
} from "lucide-react";

const SERVICES = [
  {
    icon: Sparkles,
    title: "Scaling & Polishing",
    desc: "Pembersihan karang gigi dan noda dengan ultrasonic scaler modern untuk gusi sehat dan napas segar.",
    price: "Mulai 250rb",
    color: "from-pink-500 to-rose-500",
    tags: ["Aman", "Tanpa Sakit"],
  },
  {
    icon: Smile,
    title: "Pemutihan Gigi",
    desc: "Whitening profesional menggunakan gel berkualitas tinggi dengan hasil instan hingga 8 tingkat lebih cerah.",
    price: "Mulai 1.2jt",
    color: "from-rose-500 to-pink-600",
    tags: ["Hasil Cepat"],
  },
  {
    icon: Wrench,
    title: "Kawat Gigi / Behel",
    desc: "Orthodontic treatment dengan pilihan metal, keramik, hingga clear aligner invisible untuk semua usia.",
    price: "Mulai 4.5jt",
    color: "from-fuchsia-500 to-pink-600",
    tags: ["Konultasi Gratis"],
  },
  {
    icon: Crown,
    title: "Mahkota & Gigi Palsu",
    desc: "Restorasi gigi menggunakan crown, bridge, dan gigi palsu dengan material premium tahan lama.",
    price: "Mulai 1.8jt",
    color: "from-pink-600 to-rose-700",
    tags: ["Garansi 5 Tahun"],
  },
  {
    icon: Activity,
    title: "Root Canal",
    desc: "Perawatan saluran akar modern dengan mikroskop dental untuk menyelamatkan gigi Anda tanpa cabut.",
    price: "Mulai 1.5jt",
    color: "from-rose-600 to-pink-700",
    tags: ["Tindak Lanjut"],
  },
  {
    icon: Baby,
    title: "Dental Kids",
    desc: "Layanan khusus anak dengan ruang bermain, dokter ramah, dan teknik minim trauma untuk si kecil.",
    price: "Mulai 200rb",
    color: "from-pink-400 to-rose-500",
    tags: ["Anak 2-12 th"],
  },
  {
    icon: Stethoscope,
    title: "Tambal Gigi Estetik",
    desc: "Tambalan warna gigi dengan composite resin premium yang tampak alami dan tahan lama.",
    price: "Mulai 350rb",
    color: "from-pink-500 to-fuchsia-600",
    tags: ["Estetik"],
  },
  {
    icon: ShieldPlus,
    title: "Implant Gigi",
    desc: "Solusi gigi hilang permanen menggunakan implant premium bersertifikat Eropa dengan garansi seumur hidup.",
    price: "Mulai 18jt",
    color: "from-rose-500 to-pink-700",
    tags: ["Garansi Seumur Hidup"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-20 lg:py-28">
      {/* Background variations: gradient + pattern + blobs */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-rose-50/40 via-white to-pink-50/40" />
      <div className="absolute top-1/4 left-1/2 -z-10 h-72 w-[90%] -translate-x-1/2 rounded-full bg-pink-200/20 blur-3xl" />
      <div className="absolute right-0 top-0 -z-10 h-80 w-80 rounded-full bg-fuchsia-200/20 blur-3xl" />
      <div className="absolute left-0 bottom-1/4 -z-10 h-72 w-72 rounded-full bg-rose-200/20 blur-3xl" />
      {/* Diagonal stripe pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #9D174D 0, #9D174D 1px, transparent 1px, transparent 20px)",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-pink-700">
            Layanan Kami
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-pink-950 sm:text-5xl">
            Perawatan gigi lengkap
            <br />
            <span className="text-gradient-pink">dalam satu atap</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/65">
            Dari pemeriksaan rutin hingga perawatan kompleks, OMDC menyediakan seluruh layanan
            dental yang Anda butuhkan. Setiap perawatan dilakukan oleh dokter gigi spesialis di
            bidangnya masing-masing menggunakan peralatan digital terkini.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-pink-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-pink-200 hover:shadow-soft-pink"
            >
              {/* gradient overlay on hover */}
              <div className="absolute inset-x-0 -top-px h-1 origin-left scale-x-0 bg-gradient-to-r from-pink-500 to-rose-500 transition-transform duration-300 group-hover:scale-x-100" />

              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-md`}
              >
                <s.icon className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-pink-950">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/65">{s.desc}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-pink-50 px-2.5 py-1 text-[11px] font-medium text-pink-700"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-end justify-between border-t border-pink-100 pt-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-foreground/50">Harga</div>
                  <div className="text-sm font-bold text-pink-700">{s.price}</div>
                </div>
                <a
                  href="#booking"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-pink-50 text-pink-700 transition-all hover:bg-pink-600 hover:text-white"
                  aria-label={`Pesan ${s.title}`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-3xl border border-pink-200 bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-7 text-white shadow-soft-pink sm:flex-row sm:px-10">
          <div className="text-center sm:text-left">
            <h3 className="font-display text-2xl font-bold sm:text-3xl">Tidak yakin layanan yang tepat?</h3>
            <p className="mt-1 text-sm text-white/85">
              Konsultasikan keluhan gigi Anda dengan dokter kami — gratis untuk konsultasi pertama.
            </p>
          </div>
          <a
            href="#booking"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-pink-700 shadow-md transition-transform hover:scale-105"
          >
            Konsultasi Gratis
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
