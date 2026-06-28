import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SERVICES } from "./services-data";

export const metadata: Metadata = {
  title: "Layanan Klinik Gigi OMDC — Scaling, Behel, Implant, Whitening",
  description:
    "Layanan klinik gigi lengkap di OMDC: scaling & polishing, pemutihan gigi, kawat gigi (behel), mahkota gigi, root canal, dental kids, tambal estetik, dan implant gigi. Dirawat spesialis bersertifikat.",
  alternates: { canonical: "/layanan" },
};

export default function ServicesListPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-pink-950/55">
          <Link href="/" className="hover:text-pink-700">Beranda</Link>
          <span className="mx-2">›</span>
          <span className="font-bold text-pink-700">Layanan</span>
        </nav>

        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-pink-700">
            Layanan Kami
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-pink-950 sm:text-5xl">
            Perawatan gigi lengkap
            <br />
            <span className="text-gradient-pink">dalam satu atap</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/65">
            Dari pemeriksaan rutin hingga perawatan kompleks, OMDC menyediakan seluruh layanan
            dental yang Anda butuhkan. Klik setiap layanan untuk detail lengkap.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/layanan/${s.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-pink-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-soft-pink"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-md`}>
                <Check className="h-6 w-6" strokeWidth={3} />
              </div>
              <h2 className="mt-4 font-display text-lg font-bold text-pink-950">{s.name}</h2>
              <p className="mt-1 text-sm italic text-pink-700">{s.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/65 line-clamp-3">
                {s.description}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-pink-100 pt-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-foreground/50">Harga</div>
                  <div className="text-sm font-bold text-pink-700">{s.price}</div>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-pink-700">
                  Detail
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
