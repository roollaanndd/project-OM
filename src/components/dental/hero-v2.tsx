"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck, Sparkles, Phone, CalendarCheck, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroIllustration } from "./hero-illustration";
import { useCountUp } from "./use-count-up";

function StatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { ref, value: animated } = useCountUp(value);
  return (
    <div className="text-center">
      <dt className="font-display text-3xl font-extrabold sm:text-4xl">
        <span ref={ref} className="text-shimmer">
          {animated.toLocaleString("id-ID")}
        </span>
        <span className="text-pink-700">{suffix}</span>
      </dt>
      <dd className="mt-1 text-xs text-foreground/60 sm:text-sm">{label}</dd>
    </div>
  );
}

export function HeroV2() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24"
    >
      {/* Mesh gradient background — animated */}
      <div className="absolute inset-0 -z-10 mesh-gradient-animated" />

      {/* Decorative floating shapes */}
      <motion.div
        className="absolute left-10 top-20 -z-10 h-20 w-20 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 opacity-30 blur-xl"
        animate={{ y: [0, -20, 0], rotate: [0, 90, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-20 top-1/3 -z-10 h-32 w-32 rounded-full bg-gradient-to-br from-fuchsia-400 to-pink-500 opacity-25 blur-2xl"
        animate={{ y: [0, 30, 0], x: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-1/3 -z-10 h-24 w-24 rounded-3xl bg-gradient-to-br from-rose-400 to-fuchsia-500 opacity-20 blur-xl"
        animate={{ y: [0, -16, 0], rotate: [0, -45, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:px-8">
        {/* Left copy */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 text-center lg:text-left"
        >
          {/* Glassmorphism badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-pink-800 shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-pink-500" />
            Klinik Gigi Terpercaya sejak 2015
            <span className="mx-1 text-pink-300">·</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} className="h-3 w-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </motion.div>

          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-pink-950 sm:text-6xl lg:text-7xl">
            Your Smile,
            <br />
            <span className="text-shimmer">Our Passion</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg lg:mx-0">
            <span className="font-semibold text-pink-700">Oktri Manessa Dental Clinic</span> menghadirkan
            perawatan gigi modern dengan teknologi terkini, tim dokter gigi berpengalaman, dan
            lingkungan yang nyaman. Kami percaya senyum sehat adalah hak setiap orang.
          </p>

          {/* CTAs with magnetic effect */}
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <Button
              asChild
              size="lg"
              className="btn-magnetic glow-pulse rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-7 text-base text-white hover:from-pink-700 hover:to-rose-600"
            >
              <a href="#booking">
                <CalendarCheck className="mr-2 h-5 w-5" />
                Buat Janji Temu
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="glass btn-magnetic rounded-full border-pink-200 bg-white/60 px-7 text-base text-pink-700 backdrop-blur hover:bg-white/80 hover:text-pink-800"
            >
              <a href="#services">
                Lihat Layanan
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Trust stats with animated counters */}
          <dl className="mt-10 grid grid-cols-3 gap-3 glass rounded-2xl border border-white/40 p-5 text-center lg:text-left">
            <StatItem value={10} suffix="rb+" label="Pasien Bahagia" />
            <div className="border-x border-pink-200/40">
              <StatItem value={9} suffix="+" label="Tahun Pengalaman" />
            </div>
            <StatItem value={12} suffix="" label="Dokter Spesialis" />
          </dl>

          {/* Inline trust row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-foreground/55 lg:justify-start">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-pink-500" />
              Sterilisasi standar internasional
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Phone className="h-4 w-4 text-pink-500" />
              Konsultasi 24/7 via WhatsApp
            </span>
          </div>
        </motion.div>

        {/* Right illustration with glassmorphism frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          {/* Glass frame around illustration */}
          <div className="glass relative rounded-[40px] p-6 shadow-soft-pink">
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-3 -right-3 z-20 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-3 py-1.5 text-xs font-bold text-white shadow-soft-pink"
            >
              <Zap className="h-3.5 w-3.5" />
              PWA Ready
            </motion.div>

            {/* soft halo behind */}
            <div className="absolute inset-0 -z-10 m-auto aspect-square w-[88%] rounded-full bg-gradient-to-br from-pink-200/60 to-rose-100/40 blur-2xl" />
            <HeroIllustration className="w-full h-auto" />
          </div>
        </motion.div>
      </div>

      {/* Marquee trust strip */}
      <div className="mx-auto mt-12 max-w-7xl px-5 lg:px-8">
        <div className="marquee glass rounded-2xl border border-white/40 py-3">
          <div className="marquee-content">
            {[
              "✓ Asuransi BISA",
              "✓ BPJS Kesehatan",
              "✓ Sterilisasi Kelas RS",
              "✓ Alat Digital Terkini",
              "✓ Dokter Wanita Tersedia",
              "✓ Cicilan 0%",
              "✓ Buka 7 Hari",
            ].map((t) => (
              <span key={t} className="text-sm font-bold text-pink-800">{t}</span>
            ))}
          </div>
          <div className="marquee-content" aria-hidden>
            {[
              "✓ Asuransi BISA",
              "✓ BPJS Kesehatan",
              "✓ Sterilisasi Kelas RS",
              "✓ Alat Digital Terkini",
              "✓ Dokter Wanita Tersedia",
              "✓ Cicilan 0%",
              "✓ Buka 7 Hari",
            ].map((t) => (
              <span key={t} className="text-sm font-bold text-pink-800">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
