import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Check, ShieldCheck, Star } from "lucide-react";
import { SERVICES } from "../services-data";

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
    <main className="min-h-screen bg-gray-50">
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
