"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck, Sparkles, Phone, CalendarCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroIllustration } from "./hero-illustration";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24"
    >
      {/* Background composition */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-pink-50 via-rose-50/70 to-white" />
      <div className="absolute -top-32 left-1/2 -z-10 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-radial-pink blur-2xl" />
      <div className="absolute right-0 top-1/3 -z-10 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />
      <div className="absolute left-0 bottom-0 -z-10 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />

      {/* Soft grid texture */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #9D174D 1px, transparent 1px), linear-gradient(to bottom, #9D174D 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:px-8">
        {/* Left copy */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/80 px-4 py-1.5 text-xs font-semibold text-pink-700 shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-pink-500" />
            Klinik Gigi Terpercaya sejak 2015
            <span className="mx-1 text-pink-300">·</span>
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          </div>

          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-pink-950 sm:text-6xl lg:text-7xl">
            Your Smile,
            <br />
            <span className="text-gradient-pink">Our Passion</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg lg:mx-0">
            <span className="font-semibold text-pink-700">Oktri Manessa Dental Clinic</span> menghadirkan
            perawatan gigi modern dengan teknologi terkini, tim dokter gigi berpengalaman, dan
            lingkungan yang nyaman. Kami percaya senyum sehat adalah hak setiap orang.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-r from-pink-600 to-pink-500 px-7 text-base text-white shadow-soft-pink hover:from-pink-700 hover:to-pink-600"
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
              className="rounded-full border-pink-200 bg-white/80 px-7 text-base text-pink-700 backdrop-blur hover:bg-pink-50 hover:text-pink-800"
            >
              <a href="#services">
                Lihat Layanan
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Trust stats */}
          <dl className="mt-10 grid grid-cols-3 gap-3 border-t border-pink-100 pt-6 text-center lg:text-left">
            <div>
              <dt className="text-2xl font-bold text-pink-700 sm:text-3xl">10rb+</dt>
              <dd className="mt-1 text-xs text-foreground/60 sm:text-sm">Pasien Bahagia</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-pink-700 sm:text-3xl">9+</dt>
              <dd className="mt-1 text-xs text-foreground/60 sm:text-sm">Tahun Pengalaman</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-pink-700 sm:text-3xl">12</dt>
              <dd className="mt-1 text-xs text-foreground/60 sm:text-sm">Dokter Spesialis</dd>
            </div>
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

        {/* Right illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          {/* soft halo behind */}
          <div className="absolute inset-0 -z-10 m-auto aspect-square w-[88%] rounded-full bg-gradient-to-br from-pink-200/60 to-rose-100/40 blur-2xl" />
          <HeroIllustration className="w-full h-auto" />
        </motion.div>
      </div>

      {/* Marquee trust strip */}
      <div className="mx-auto mt-12 max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 rounded-2xl border border-pink-100 bg-white/70 px-6 py-3 text-xs font-medium text-foreground/60 backdrop-blur sm:text-sm">
          <span className="text-pink-700">✓ Asuransi BISA</span>
          <span className="hidden h-3 w-px bg-pink-200 sm:inline-block" />
          <span className="text-pink-700">✓ BPJS Kesehatan</span>
          <span className="hidden h-3 w-px bg-pink-200 sm:inline-block" />
          <span className="text-pink-700">✓ Sterilisasi Kelas RS</span>
          <span className="hidden h-3 w-px bg-pink-200 sm:inline-block" />
          <span className="text-pink-700">✓ Alat Digital Terkini</span>
          <span className="hidden h-3 w-px bg-pink-200 sm:inline-block" />
          <span className="text-pink-700">✓ Dokter Wanita Tersedia</span>
        </div>
      </div>
    </section>
  );
}
