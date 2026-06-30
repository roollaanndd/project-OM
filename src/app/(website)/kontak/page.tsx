import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontak & Lokasi OMDC — Bekasi Selatan",
  description:
    "Hubungi OMDC: Jl. Melati Raya No. 17, Bekasi Selatan. Telepon/WA +62 812-3456-7890. Buka Senin-Sabtu 09.00-21.00, Minggu 10.00-16.00.",
  alternates: { canonical: "/kontak" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-4xl px-5 py-14 lg:px-8 lg:py-20">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-900/55">
          <Link href="/" className="hover:text-gray-700">Beranda</Link>
          <span className="mx-2">›</span>
          <span className="font-bold text-gray-700">Kontak</span>
        </nav>

        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
            Kontak & Lokasi
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
            Kunjungi OMDC
          </h1>
          <p className="mt-3 text-base text-foreground/65">
            Kami siap melayani Anda 7 hari seminggu
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gray-500 to-gray-500 text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Alamat Klinik</h2>
                <p className="text-sm text-foreground/65">Jl. Melati Raya No. 17, Bekasi Selatan, Jawa Barat 17141</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Telepon & WhatsApp</h2>
                <a href="tel:+6281234567890" className="text-sm font-medium text-gray-700 hover:underline">
                  +62 812-3456-7890
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Email</h2>
                <a href="mailto:halo@omdc-dental.id" className="text-sm font-medium text-gray-700 hover:underline">
                  halo@omdc-dental.id
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-gray-500 text-white">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Jam Operasional</h2>
                <p className="text-sm text-foreground/65">Senin-Jumat: 09.00-21.00</p>
                <p className="text-sm text-foreground/65">Sabtu: 09.00-20.00 · Minggu: 10.00-16.00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white shadow-md"
          >
            <MessageCircle className="h-5 w-5" />
            Chat WhatsApp
          </a>
          <Link
            href="/#booking"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-600 to-gray-500 px-6 py-3.5 text-sm font-bold text-white shadow-soft-pink"
          >
            Buat Janji Online
          </Link>
        </div>

        {/* Embed map */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-gray-100 shadow-sm">
          <iframe
            title="Lokasi OMDC"
            src="https://www.openstreetmap.org/export/embed.html?bbox=106.9656%2C-6.2939%2C106.9856%2C-6.2739&layer=mapnik&marker=-6.2839%2C106.9756"
            className="h-80 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
