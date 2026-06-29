"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, ArrowRight, ArrowLeft, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Case = {
  title: string;
  category: string;
  duration: string;
  description: string;
  rating: number;
  /** SVG-based "before" and "after" stylized smiles (no external images needed) */
  before: {
    teethColor: string;
    alignment: "crooked" | "gaps" | "yellow";
  };
  after: {
    teethColor: string;
    alignment: "perfect";
  };
};

const CASES: Case[] = [
  {
    title: "Behel Keramik 18 Bulan",
    category: "Orthodontic",
    duration: "18 bulan",
    description:
      "Pasien perempuan 24 tahun dengan gigi berjejal dan tumpang tindih. Setelah 18 bulan behel keramik, gigi menjadi rapi dan senyum lebih simetris.",
    rating: 5,
    before: { teethColor: "#F3E5D8", alignment: "crooked" },
    after: { teethColor: "#FFFFFF", alignment: "perfect" },
  },
  {
    title: "Veneer Laminat 8 Gigi",
    category: "Estetik",
    duration: "2 kunjungan",
    description:
      "Pasien pria 32 tahun dengan gigi kuning dan bentuk tidak proporsional. Setelah 8 veneer laminat, senyum terlihat lebih cerah dan natural.",
    rating: 5,
    before: { teethColor: "#D4B896", alignment: "yellow" },
    after: { teethColor: "#FAFCFF", alignment: "perfect" },
  },
  {
    title: "Whitening + Scaling",
    category: "Preventive",
    duration: "1 kunjungan",
    description:
      "Pasien perempuan 28 tahun perokok dengan gigi kecoklatan. Setelah whitening profesional dan scaling, gigi 8 tingkat lebih cerah.",
    rating: 5,
    before: { teethColor: "#B89968", alignment: "yellow" },
    after: { teethColor: "#FFFFFF", alignment: "perfect" },
  },
  {
    title: "Implant 2 Gigi Depan",
    category: "Implant",
    duration: "4 bulan",
    description:
      "Pasien pria 45 tahun kehilangan 2 gigi depan akibat kecelakaan. Setelah implant dan crown, fungsi & estetik gigi pulih total.",
    rating: 5,
    before: { teethColor: "#E8D4B8", alignment: "gaps" },
    after: { teethColor: "#FFFFFF", alignment: "perfect" },
  },
];

function SmileSvg({
  teethColor,
  alignment,
  label,
}: {
  teethColor: string;
  alignment: "crooked" | "gaps" | "yellow" | "perfect";
  label: string;
}) {
  // Generate teeth positions based on alignment
  const teeth = [];
  const baseY = 60;
  const baseWidth = 22;
  const gap = 2;
  const startX = 100;

  for (let i = 0; i < 6; i++) {
    let x = startX + i * (baseWidth + gap);
    let y = baseY;
    let w = baseWidth;
    let h = 38;
    let rot = 0;

    if (alignment === "crooked") {
      // Vary positions and rotations
      if (i === 0) { rot = -8; y -= 4; }
      if (i === 1) { rot = 5; y += 2; }
      if (i === 2) { rot = -3; y -= 2; w = 20; }
      if (i === 3) { rot = 7; y += 4; }
      if (i === 4) { rot = -5; y -= 1; }
      if (i === 5) { rot = 4; }
    } else if (alignment === "gaps") {
      // Skip 2 teeth in middle
      if (i === 2 || i === 3) continue;
      if (i > 3) x = startX + (i - 2) * (baseWidth + gap) + 20;
    } else if (alignment === "yellow") {
      // Slightly varied for texture
      if (i === 1) y += 1;
      if (i === 4) y -= 1;
    }

    teeth.push(
      <g key={i} transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`}>
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx={6}
          ry={8}
          fill={teethColor}
          stroke={alignment === "yellow" ? "#A8845C" : "#E5C5D5"}
          strokeWidth={0.8}
        />
        {/* Highlight */}
        <rect
          x={x + 3}
          y={y + 3}
          width={5}
          height={12}
          rx={2}
          fill="#FFFFFF"
          opacity={alignment === "yellow" ? 0.2 : 0.6}
        />
      </g>,
    );
  }

  return (
    <svg viewBox="0 0 320 130" className="h-full w-full">
      <defs>
        <linearGradient id={`gum-${label}`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#F472B6" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>

      {/* Gum */}
      <path
        d="M20 70 Q 160 30 300 70 L 300 75 Q 160 50 20 75 Z"
        fill={`url(#gum-${label})`}
      />
      <path
        d="M20 75 Q 160 50 300 75 L 300 78 Q 160 55 20 78 Z"
        fill="#9D174D"
        opacity="0.4"
      />

      {/* Lips outline (subtle) */}
      <path
        d="M10 60 Q 160 25 310 60"
        fill="none"
        stroke="#BE185D"
        strokeWidth="2"
        opacity="0.5"
        strokeLinecap="round"
      />

      {/* Teeth */}
      {teeth}

      {/* Bottom lip shadow */}
      <path
        d="M20 100 Q 160 115 300 100 L 300 105 Q 160 120 20 105 Z"
        fill="#F472B6"
        opacity="0.4"
      />
    </svg>
  );
}

export function SmileGallery() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = CASES[activeIdx];

  const goNext = () => setActiveIdx((i) => (i + 1) % CASES.length);
  const goPrev = () => setActiveIdx((i) => (i - 1 + CASES.length) % CASES.length);

  return (
    <section id="gallery" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-pink-50/40 via-white to-pink-50/40" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-pink-700">
            <Sparkles className="h-3.5 w-3.5" />
            Galeri Transformasi
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-pink-950 sm:text-5xl">
            Lihat transformasi senyum
            <br />
            <span className="text-gradient-pink">pasien kami</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/65">
            Setiap senyum adalah cerita unik. Lihat beberapa transformasi nyata pasien OMDC —
            dari kondisi awal hingga hasil akhir yang memukau. Semua dengan izin tertulis dari
            pasien.
          </p>
        </div>

        {/* Main showcase */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Before/After comparison */}
          <motion.div
            key={active.title}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-pink-100 bg-white p-6 shadow-soft-pink sm:p-8"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-pink-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-pink-700">
                  <Wand2 className="h-3 w-3" />
                  {active.category}
                </div>
                <h3 className="mt-2 font-display text-xl font-bold text-pink-950">{active.title}</h3>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {active.rating}.0
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Before */}
              <div className="overflow-hidden rounded-2xl border border-pink-100 bg-pink-50/40">
                <div className="border-b border-pink-100 bg-pink-100/60 px-3 py-1.5 text-center text-xs font-bold uppercase tracking-wider text-pink-700">
                  Sebelum
                </div>
                <div className="aspect-[16/10]">
                  <SmileSvg teethColor={active.before.teethColor} alignment={active.before.alignment} label="before" />
                </div>
              </div>

              {/* After */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-pink-300 bg-white shadow-glow-pink">
                <div className="border-b border-pink-200 bg-gradient-to-r from-pink-500 to-rose-500 px-3 py-1.5 text-center text-xs font-bold uppercase tracking-wider text-white">
                  Sesudah
                </div>
                <div className="aspect-[16/10]">
                  <SmileSvg teethColor={active.after.teethColor} alignment={active.after.alignment} label="after" />
                </div>
                <motion.div
                  className="absolute right-2 top-9 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-amber-950 shadow"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 220 }}
                >
                  <Sparkles className="h-3 w-3" />
                  Hasil
                </motion.div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-foreground/70">{active.description}</p>

            {/* Navigation */}
            <div className="mt-5 flex items-center justify-between border-t border-pink-100 pt-4">
              <button
                onClick={goPrev}
                className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-white px-3 py-1.5 text-xs font-semibold text-pink-700 transition-colors hover:bg-pink-50"
                aria-label="Sebelumnya"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Prev
              </button>
              <div className="flex items-center gap-1.5">
                {CASES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === activeIdx ? "w-6 bg-pink-600" : "w-1.5 bg-pink-200 hover:bg-pink-300",
                    )}
                    aria-label={`Lihat kasus ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={goNext}
                className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-white px-3 py-1.5 text-xs font-semibold text-pink-700 transition-colors hover:bg-pink-50"
                aria-label="Selanjutnya"
              >
                Next
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Thumbnails */}
          <div className="space-y-3">
            <h3 className="font-display text-lg font-bold text-pink-950">Kasus Lainnya</h3>
            {CASES.map((c, i) => (
              <motion.button
                key={c.title}
                onClick={() => setActiveIdx(i)}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ x: 4 }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all",
                  i === activeIdx
                    ? "border-pink-300 bg-white shadow-soft-pink"
                    : "border-pink-100 bg-white/60 hover:border-pink-200 hover:bg-white",
                )}
              >
                <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-pink-50">
                  <SmileSvg teethColor={c.after.teethColor} alignment={c.after.alignment} label={`thumb-${i}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-bold uppercase text-pink-700">
                      {c.category}
                    </span>
                    <span className="text-[10px] text-foreground/50">· {c.duration}</span>
                  </div>
                  <div className="mt-1 truncate text-sm font-bold text-pink-950">{c.title}</div>
                </div>
                {i === activeIdx && (
                  <motion.div
                    layoutId="active-case"
                    className="h-8 w-1 rounded-full bg-gradient-to-b from-pink-500 to-rose-500"
                  />
                )}
              </motion.button>
            ))}

            <Button
              asChild
              className="w-full rounded-full bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-soft-pink hover:from-pink-700 hover:to-rose-600"
            >
              <a href="#booking">
                <Sparkles className="mr-2 h-4 w-4" />
                Saya Mau Senyum Seperti Ini
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
