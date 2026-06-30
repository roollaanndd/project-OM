"use client";

import { m } from "framer-motion";
import { HeartPulse, Sparkles, Award, Users } from "lucide-react";

const STATS = [
  { icon: Users, label: "Pasien Bahagia", value: "10.000+" },
  { icon: Award, label: "Sertifikasi Internasional", value: "ISO 9001" },
  { icon: HeartPulse, label: "Tingkat Kepuasan", value: "98%" },
  { icon: Sparkles, label: "Cabang Klinik", value: "3 Kota" },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-20 lg:py-28">
      {/* Background variations */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-pink-50/40 to-rose-50/30" />
      <div className="absolute -right-32 top-0 -z-10 h-96 w-96 rounded-full bg-fuchsia-200/30 blur-3xl" />
      <div className="absolute -left-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-pink-200/30 blur-3xl" />
      {/* Dot pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #9D174D 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <m.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative mx-auto max-w-md">
              {/* Decorative blob */}
              <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-pink-200 via-rose-100 to-pink-100 blur-2xl opacity-70" />

              {/* Card 1 - main visual */}
              <div className="relative rounded-[36px] border border-pink-100 bg-white p-6 shadow-soft-pink">
                <div className="relative aspect-square overflow-hidden rounded-[28px] bg-gradient-to-br from-pink-50 via-rose-50 to-white">
                  <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label="Ilustrasi klinik gigi OMDC">
                    <defs>
                      <linearGradient id="ab-tooth" x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor="#FFFFFF" />
                        <stop offset="1" stopColor="#FBCFE8" />
                      </linearGradient>
                      <linearGradient id="ab-bg" x1="0" y1="0" x2="0" y2="1">
                        <stop stopColor="#FCE7F3" />
                        <stop offset="1" stopColor="#FBCFE8" />
                      </linearGradient>
                      <linearGradient id="ab-pink" x1="0" y1="0" x2="1" y2="0">
                        <stop stopColor="#9D174D" />
                        <stop offset="1" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>

                    {/* Background circle */}
                    <circle cx="200" cy="200" r="180" fill="url(#ab-bg)" opacity="0.6" />
                    <circle cx="200" cy="200" r="140" fill="none" stroke="#F472B6" strokeWidth="3" strokeDasharray="6 8" opacity="0.5" />

                    {/* Big tooth */}
                    <g transform="translate(200 200)">
                      <path
                        d="M0 -90
                           c-30 0 -42 9 -64 9
                           c-17 0 -32 9 -32 38
                           c0 38 14 60 23 90
                           c8 26 11 70 28 70
                           c15 0 17 -34 24 -60
                           c6 -20 11 -29 29 -29
                           s23 9 29 29
                           c7 26 9 60 24 60
                           c17 0 20 -44 28 -70
                           c9 -30 23 -52 23 -90
                           c0 -29 -15 -38 -32 -38
                           c-22 0 -34 -9 -64 -9 z"
                        fill="url(#ab-tooth)"
                        stroke="#F9A8D4"
                        strokeWidth="2"
                      />
                      <ellipse cx="-30" cy="-50" rx="14" ry="26" fill="#FFFFFF" opacity="0.7" />
                    </g>

                    {/* Floating icons */}
                    <g transform="translate(80 80)">
                      <circle r="28" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2" />
                      <path d="M-10 -2 L-3 6 L10 -8" fill="none" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <g transform="translate(320 320)">
                      <circle r="28" fill="url(#ab-pink)" />
                      <path d="M0 -10 L3 -3 L10 0 L3 3 L0 10 L-3 3 L-10 0 L-3 -3 Z" fill="#FFFFFF" />
                    </g>
                    <g transform="translate(320 100)">
                      <circle r="22" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2" />
                      <path d="M-8 0 a 8 8 0 0 1 16 0 a 8 8 0 0 1 -16 0 M-5 0 L5 0 M0 -5 L0 5" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" fill="none" />
                    </g>
                  </svg>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl border border-pink-100 bg-white px-4 py-3 shadow-soft-pink">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 text-white">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-pink-950">9+ Tahun</div>
                    <div className="text-xs text-foreground/60">Pengalaman Klinis</div>
                  </div>
                </div>
              </div>

              {/* Floating card 2 */}
              <m.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -right-3 top-8 flex items-center gap-3 rounded-2xl border border-pink-100 bg-white/95 px-4 py-3 shadow-soft-pink backdrop-blur lg:-right-8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-pink-500 text-white">
                  <HeartPulse className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-pink-950">98% Puas</div>
                  <div className="text-xs text-foreground/60">Dari 10rb+ pasien</div>
                </div>
              </m.div>
            </div>
          </m.div>

          {/* Copy */}
          <m.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-pink-700">
              Tentang OMDC
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-pink-950 sm:text-5xl">
              Klinik gigi yang menempatkan
              <br />
              <span className="text-gradient-pink">kenyamanan Anda di atas segalanya</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-foreground/70">
              Oktri Manessa Dental Clinic (OMDC) didirikan pada tahun 2015 oleh drg. Oktri Manessa
              dengan visi memberikan layanan kesehatan gigi yang ramah, profesional, dan terjangkau
              bagi seluruh keluarga Indonesia. Selama hampir satu dekade, OMDC telah menjadi rumah
              bagi lebih dari 10.000 pasien yang mempercayakan kesehatan gigi mereka kepada tim kami.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/70">
              Kami menggabungkan teknologi dental digital terkini dengan sentuhan manusiawi. Setiap
              perawatan dimulai dengan konsultasi mendalam, diagnosis akurat, dan rencana treatment
              yang transparan. Tim dokter gigi kami terus mengikuti pelatihan internasional untuk
              memastikan Anda menerima perawatan berstandar tertentu tanpa harus ke luar negeri.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-pink-100 bg-white p-4 text-center transition-colors hover:border-pink-200 hover:bg-pink-50/40"
                >
                  <s.icon className="mx-auto h-5 w-5 text-pink-500" />
                  <div className="mt-2 text-lg font-bold text-pink-950">{s.value}</div>
                  <div className="mt-0.5 text-[11px] leading-tight text-foreground/55">{s.label}</div>
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
