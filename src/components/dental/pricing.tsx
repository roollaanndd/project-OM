"use client";

import { m } from "framer-motion";
import { Check, Sparkles, Crown, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Plan = {
  name: string;
  icon: typeof Sparkles;
  price: string;
  period: string;
  desc: string;
  features: string[];
  popular?: boolean;
  gradient: string;
};

const PLANS: Plan[] = [
  {
    name: "Paket Basic Care",
    icon: Heart,
    price: "Rp 499rb",
    period: "/ pasien / tahun",
    desc: "Perawatan rutin untuk menjaga kesehatan gigi sehari-hari.",
    gradient: "from-pink-400 to-rose-500",
    features: [
      "Pemeriksaan gigi 2x / tahun",
      "Scaling & polishing 2x / tahun",
      "Foto rontgen 1x / tahun",
      "Konsultasi darurat gratis",
      "Diskon 10% perawatan tambahan",
      "Kartu member digital",
    ],
  },
  {
    name: "Paket Family Smile",
    icon: Sparkles,
    price: "Rp 1.49jt",
    period: "/ keluarga (4 org) / tahun",
    desc: "Paket lengkap untuk seluruh keluarga — hemat hingga 35%.",
    popular: true,
    gradient: "from-pink-500 via-rose-500 to-fuchsia-600",
    features: [
      "Semua manfaat Basic Care untuk 4 anggota",
      "Dental kids 2x / tahun untuk anak",
      "Whitening 1x / tahun untuk 2 dewasa",
      "Konsultasi spesialis gratis 4x",
      "Diskon 20% behel & implant",
      "Prioritas jadwal & antrean",
      "Free dental goodie bag",
    ],
  },
  {
    name: "Paket Premium Crown",
    icon: Crown,
    price: "Rp 3.99jt",
    period: "/ pasien / tahun",
    desc: "Perawatan estetik dan restorasi premium untuk senyum sempurna.",
    gradient: "from-fuchsia-600 to-rose-700",
    features: [
      "Semua manfaat Basic Care",
      "Whitening unlimited (4x / tahun)",
      "Veneer / crown diskon 30%",
      "Konsultasi spesialis tanpa batas",
      "Intra-oral scan 3D gratis",
      "Garansi perawatan estetik 5 thn",
      "Concierge private WhatsApp",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-pink-50/40 via-white to-pink-50/40" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-pink-700">
            Paket Membership
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-pink-950 sm:text-5xl">
            Harga transparan,
            <br />
            <span className="text-gradient-pink">tanpa biaya tersembunyi</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/65">
            Pilih paket membership yang sesuai kebutuhan Anda dan keluarga. Tersedia juga opsi
            perawatan satuan dengan estimasi biaya jelas sebelum treatment dimulai. Cicilan 0%
            hingga 12 bulan tersedia untuk perawatan di atas Rp 3 juta.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <m.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={cn(
                "relative flex flex-col rounded-3xl border p-7 transition-all",
                plan.popular
                  ? "border-pink-300 bg-white shadow-glow-pink lg:-translate-y-3 lg:scale-[1.03]"
                  : "border-pink-100 bg-white shadow-sm hover:-translate-y-1 hover:shadow-soft-pink",
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                  Paling Populer
                </div>
              )}

              <div
                className={cn(
                  "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md",
                  plan.gradient,
                )}
              >
                <plan.icon className="h-6 w-6" />
              </div>

              <h3 className="mt-5 font-display text-xl font-bold text-pink-950">{plan.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">{plan.desc}</p>

              <div className="mt-5 flex items-end gap-2">
                <span className="font-display text-4xl font-extrabold text-pink-950">
                  {plan.price}
                </span>
                <span className="mb-1 text-xs text-foreground/55">{plan.period}</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/75">
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white",
                        plan.popular ? "bg-gradient-to-br from-pink-600 to-rose-500" : "bg-pink-200 text-pink-700",
                      )}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={cn(
                  "mt-7 w-full rounded-full",
                  plan.popular
                    ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-soft-pink hover:from-pink-700 hover:to-rose-600"
                    : "border border-pink-200 bg-white text-pink-700 hover:bg-pink-50",
                )}
                variant={plan.popular ? "default" : "outline"}
              >
                <a href="#booking">
                  {plan.popular ? "Pilih Paket Ini" : "Pilih Paket"}
                </a>
              </Button>
            </m.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-foreground/55">
          * Harga belum termasuk PPN. Estimasi biaya treatment satuan akan diberikan setelah
          konsultasi. Tersedia cicilan 0% melalui kartu kredit bank mitra.
        </p>
      </div>
    </section>
  );
}
