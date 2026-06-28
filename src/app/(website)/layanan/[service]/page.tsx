import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Check, ShieldCheck, Star } from "lucide-react";

type ServiceDetail = {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  duration: string;
  description: string;
  benefits: string[];
  process: { step: number; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  icon: string;
  color: string;
};

const SERVICES: ServiceDetail[] = [
  {
    slug: "scaling-polishing",
    name: "Scaling & Polishing",
    tagline: "Gigi bersih, gusi sehat, napas segar",
    price: "Mulai Rp 250.000",
    duration: "45 menit",
    description:
      "Scaling gigi adalah prosedur pembersihan karang gigi (kalkulus) dan plak menggunakan ultrasonic scaler modern. Dilanjutkan dengan polishing untuk menghaluskan permukaan gigi sehingga plak sulit menempel kembali. Prosedur ini aman, tidak sakit, dan direkomendasikan setiap 6 bulan untuk menjaga kesehatan gusi.",
    benefits: [
      "Menghilangkan karang gigi dan plak membandel",
      "Mencegah gusi berdarah dan bau mulut",
      "Mengurangi risiko periodontitis",
      "Membuat gigi terasa lebih bersih dan halus",
      "Meningkatkan kesehatan gusi jangka panjang",
    ],
    process: [
      { step: 1, title: "Pemeriksaan", desc: "Dokter gigi memeriksa kondisi gusi dan gigi secara menyeluruh." },
      { step: 2, title: "Scaling", desc: "Pembersihan karang dengan ultrasonic scaler (15-20 menit)." },
      { step: 3, title: "Polishing", desc: "Penghalusan permukaan gigi dengan pasta khusus." },
      { step: 4, title: "Fluoride", desc: "Aplikasi fluoride untuk memperkuat enamel gigi." },
    ],
    faqs: [
      { q: "Apakah scaling sakit?", a: "Tidak. Prosedur scaling modern nyaris tanpa rasa sakit. Jika ada gigi sensitif, dokter dapat memberikan anestesi topikal." },
      { q: "Berapa sering harus scaling?", a: "Setiap 6 bulan untuk pasien dewasa dengan kondisi gigi normal. Pasien dengan kawat gigi atau riwayat penyakit gusi setiap 3-4 bulan." },
      { q: "Apakah scaling merusak enamel?", a: "Tidak. Scaling hanya mengangkat karang dan plak, tidak mengikis enamel gigi." },
    ],
    icon: "sparkles",
    color: "from-pink-500 to-rose-500",
  },
  {
    slug: "pemutihan-gigi",
    name: "Pemutihan Gigi (Whitening)",
    tagline: "Senyum 8 tingkat lebih cerah dalam 1 jam",
    price: "Mulai Rp 1.200.000",
    duration: "60 menit",
    description:
      "Pemutihan gigi profesional menggunakan gel whitening berkualitas tinggi yang diaktivasi dengan lampu LED khusus. Prosedur ini mencerahkan gigi hingga 8 tingkat dalam satu kunjungan, dengan hasil yang natural dan tahan lama. Aman untuk enamel dan tidak menyebabkan sensitivitas permanen.",
    benefits: [
      "Hasil instan hingga 8 tingkat lebih cerah",
      "Aman untuk enamel gigi",
      "Hasil natural, tidak terlalu putih",
      "Proses hanya 60 menit",
      "Tahan hingga 1-2 tahun dengan perawatan",
    ],
    process: [
      { step: 1, title: "Konsultasi", desc: "Evaluasi warna gigi dan riwayat sensitivitas." },
      { step: 2, title: "Preparasi", desc: "Pemasangan pelindung gusi dan bibir." },
      { step: 3, title: "Whitening", desc: "Aplikasi gel + aktivasi lampu LED (3 sesi × 15 menit)." },
      { step: 4, title: "Finalisasi", desc: "Pembersihan dan aplikasi fluoride untuk mengurangi sensitivitas." },
    ],
    faqs: [
      { q: "Apakah hasilnya permanen?", a: "Hasil bertahan 1-2 tahun tergantung gaya hidup. Hindari kopi, teh, dan merokok untuk hasil maksimal." },
      { q: "Apakah gigi jadi sensitif?", a: "Sensitivitas sementara mungkin terjadi 24-48 jam pertama, lalu hilang. Kami berikan fluoride untuk meminimalkan efek ini." },
      { q: "Bisa untuk gigi dengan tambalan?", a: "Whitening hanya memutihkan gigi asli, bukan tambalan. Tambalan mungkin perlu diganti agar sesuai warna." },
    ],
    icon: "smile",
    color: "from-rose-500 to-pink-600",
  },
  {
    slug: "kawat-gigi-behel",
    name: "Kawat Gigi (Behel) Orthodontic",
    tagline: "Gigi rapi, senyum percaya diri",
    price: "Mulai Rp 4.500.000",
    duration: "Konsultasi 30 menit",
    description:
      "Perawatan orthodontic dengan pilihan metal bracket, keramik, atau clear aligner (Invisalign). Cocok untuk semua usia — anak hingga dewasa. Dirawat oleh drg. Oktri Manessa, Sp.Ort, spesialis orthodonti bersertifikat. Hasil rapi permanen dengan retainer pasca perawatan.",
    benefits: [
      "Pilihan bracket metal, keramik, atau clear aligner",
      "Dirawat spesialis orthodonti",
      "Cicilan 0% hingga 12 bulan",
      "Konsultasi & simulasi digital gratis",
      "Hasil rapi permanen dengan retainer",
    ],
    process: [
      { step: 1, title: "Konsultasi", desc: "Pemeriksaan, foto, rontgen, dan rencana perawatan." },
      { step: 2, title: "Pemasangan", desc: "Pemasangan bracket (1-2 jam)." },
      { step: 3, title: "Adjustment", desc: "Kontrol tiap 4 minggu untuk penyesuaian wire." },
      { step: 4, title: "Retainer", desc: "Pemasangan retainer setelah perawatan selesai." },
    ],
    faqs: [
      { q: "Berapa lama perawatan behel?", a: "Rata-rata 12-24 bulan untuk kasus standar, 24-36 bulan untuk kasus kompleks." },
      { q: "Apakah behel sakit?", a: "Rasa tidak nyaman ringan 3-5 hari setelah pemasangan/adjustment, lalu hilang." },
      { q: "Bisa untuk usia berapa?", a: "Perawatan orthodontic bisa mulai usia 7-8 tahun (interceptive) hingga dewasa. Tidak ada batas usia maksimal." },
    ],
    icon: "wrench",
    color: "from-fuchsia-500 to-pink-600",
  },
];

export function generateStaticParams() {
  return SERVICES.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Layanan Tidak Ditemukan" };

  return {
    title: `${service.name} — OMDC`,
    description: service.description.slice(0, 160),
    alternates: { canonical: `/layanan/${service.slug}` },
    openGraph: {
      title: `${service.name} — OMDC`,
      description: service.tagline,
      images: [{ url: "/icons/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.name,
    description: service.description,
    procedureType: "Dental",
    howPerformed: service.process.map((p) => `${p.step}. ${p.title}: ${p.desc}`).join(" "),
    bodyLocation: "Teeth",
    preparation: "Tidak ada persiapan khusus",
    followup: "Kontrol sesuai jadwal yang ditentukan dokter",
    cost: {
      "@type": " MonetaryAmount",
      currency: "IDR",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://omdc-dental.id/layanan/${service.slug}`,
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Breadcrumb */}
      <nav className="mx-auto max-w-5xl px-5 pt-6 lg:px-8" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-pink-950/55">
          <li><Link href="/" className="hover:text-pink-700">Beranda</Link></li>
          <li>›</li>
          <li><Link href="/#services" className="hover:text-pink-700">Layanan</Link></li>
          <li>›</li>
          <li className="font-bold text-pink-700">{service.name}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-5 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-md`}>
              <Star className="h-7 w-7" />
            </div>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-pink-950 sm:text-5xl">
              {service.name}
            </h1>
            <p className="mt-3 text-lg italic text-pink-700">{service.tagline}</p>
            <p className="mt-5 text-base leading-relaxed text-foreground/70">
              {service.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-2xl border border-pink-200 bg-white px-5 py-3">
                <div className="text-xs font-semibold text-pink-950/55">Harga</div>
                <div className="font-display text-lg font-bold text-pink-700">{service.price}</div>
              </div>
              <div className="rounded-2xl border border-pink-200 bg-white px-5 py-3">
                <div className="text-xs font-semibold text-pink-950/55">Durasi</div>
                <div className="font-display text-lg font-bold text-pink-700">{service.duration}</div>
              </div>
            </div>
            <Link
              href="/#booking"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-3 text-sm font-bold text-white shadow-soft-pink"
            >
              Buat Janji Sekarang
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-soft-pink">
            <h2 className="font-display text-lg font-bold text-pink-950">Manfaat</h2>
            <ul className="mt-3 space-y-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-foreground/75">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={3} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <h2 className="text-center font-display text-3xl font-extrabold text-pink-950">
            Proses Perawatan
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p) => (
              <div key={p.step} className="rounded-2xl border border-pink-100 bg-pink-50/40 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 font-display text-base font-extrabold text-white">
                  {p.step}
                </div>
                <h3 className="mt-3 font-bold text-pink-950">{p.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-foreground/65">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <h2 className="text-center font-display text-3xl font-extrabold text-pink-950">
            Pertanyaan Umum
          </h2>
          <div className="mt-8 space-y-3">
            {service.faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl border border-pink-100 bg-white p-5">
                <summary className="cursor-pointer font-bold text-pink-950 marker:content-none">
                  {faq.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-gradient-to-r from-pink-600 to-rose-500 py-10 text-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 px-5 text-sm font-semibold lg:px-8">
          <span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5" /> Sterilisasi Kelas RS</span>
          <span className="flex items-center gap-2"><Clock className="h-5 w-5" /> Buka 7 Hari</span>
          <span className="flex items-center gap-2"><Star className="h-5 w-5 fill-amber-300 text-amber-300" /> Rating 4.9/5</span>
        </div>
      </section>
    </main>
  );
}
