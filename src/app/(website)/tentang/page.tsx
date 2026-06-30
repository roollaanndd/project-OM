import type { Metadata } from "next";
import Link from "next/link";
import { Award, Heart, ShieldCheck, Users, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang OMDC — Oktri Manessa Dental Clinic",
  description:
    "OMDC didirikan tahun 2015 oleh drg. Oktri Manessa. Visi: perawatan gigi modern, aman, ramah, dan terjangkau untuk keluarga Indonesia. 10.000+ pasien bahagia.",
  alternates: { canonical: "/tentang" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-4xl px-5 py-14 lg:px-8 lg:py-20">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-pink-950/55">
          <Link href="/" className="hover:text-pink-700">Beranda</Link>
          <span className="mx-2">›</span>
          <span className="font-bold text-pink-700">Tentang</span>
        </nav>

        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-pink-700">
            Tentang Kami
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-pink-950 sm:text-5xl">
            Klinik gigi yang menempatkan
            <br />
            <span className="text-gradient-pink">kenyamanan Anda di atas segalanya</span>
          </h1>
        </div>

        <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/75">
          <p>
            Oktri Manessa Dental Clinic (OMDC) didirikan pada tahun 2015 oleh drg. Oktri Manessa
            dengan visi memberikan layanan kesehatan gigi yang ramah, profesional, dan terjangkau
            bagi seluruh keluarga Indonesia. Selama hampir satu dekade, OMDC telah menjadi rumah
            bagi lebih dari 10.000 pasien yang mempercayakan kesehatan gigi mereka kepada tim kami.
          </p>
          <p>
            Kami menggabungkan teknologi dental digital terkini dengan sentuhan manusiawi. Setiap
            perawatan dimulai dengan konsultasi mendalam, diagnosis akurat, dan rencana treatment
            yang transparan. Tim dokter gigi kami terus mengikuti pelatihan internasional untuk
            memastikan Anda menerima perawatan berstandar tertentu tanpa harus ke luar negeri.
          </p>
          <p>
            Kami percaya senyum sehat adalah hak setiap orang. Karena itu, OMDC menerima BPJS
            Kesehatan untuk layanan dasar dan menyediakan cicilan 0% hingga 12 bulan untuk
            perawatan kompleks. Klinik kami buka 7 hari seminggu, termasuk hari libur nasional,
            agar Anda bisa datang kapan saja yang nyaman.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: Users, value: "10.000+", label: "Pasien Bahagia" },
            { icon: Award, value: "9+", label: "Tahun Pengalaman" },
            { icon: ShieldCheck, value: "ISO 9001", label: "Tersertifikasi" },
            { icon: Heart, value: "98%", label: "Tingkat Kepuasan" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-pink-100 bg-white p-5 text-center shadow-sm">
              <s.icon className="mx-auto h-6 w-6 text-pink-500" />
              <div className="mt-2 font-display text-2xl font-extrabold text-pink-950">{s.value}</div>
              <div className="mt-0.5 text-xs text-foreground/55">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-pink-100 bg-white p-6 shadow-soft-pink">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-pink-950">
            <Sparkles className="h-5 w-5 text-pink-500" />
            Visi & Misi
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            <strong>Visi:</strong> Menjadi klinik gigi terpercaya yang menghadirkan senyum sehat
            untuk setiap keluarga Indonesia.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/70">
            <strong>Misi:</strong> Memberikan perawatan gigi modern dengan teknologi terkini,
            harga transparan, dan pelayanan yang manusiawi. Kami berkomitmen pada sterilisasi
            standar rumah sakit, edukasi pasien, dan tanggung jawab sosial.
          </p>
        </div>
      </section>
    </main>
  );
}
