"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Award, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

type Doctor = {
  name: string;
  specialty: string;
  experience: string;
  education: string;
  rating: number;
  reviews: number;
  badge?: string;
  /** pastel gradient background for the avatar */
  gradient: string;
  initials: string;
  avail: string;
  photo?: string;
};

const DOCTORS: Doctor[] = [
  {
    name: "drg. Oktri Manessa, Sp.Ort",
    specialty: "Orthodontist (Spesialis Behel)",
    experience: "12 tahun",
    education: "S2 Trisakti · Sertifikat Invisalign Asia Pasifik",
    rating: 4.9,
    reviews: 1240,
    badge: "Founder",
    gradient: "from-pink-500 via-rose-500 to-fuchsia-600",
    initials: "OM",
    avail: "Sen · Rab · Jum",
    photo: "/doctors/doctor-1.jpg",
  },
  {
    name: "drg. Adelia Putri, Sp.KGA",
    specialty: "Spesialis Gigi Anak",
    experience: "8 tahun",
    education: "S2 Universitas Indonesia · Certified Conscious Sedation",
    rating: 4.9,
    reviews: 870,
    badge: "Kids Favorite",
    gradient: "from-rose-500 via-pink-500 to-amber-400",
    initials: "AP",
    avail: "Sel · Kam · Sab",
    photo: "/doctors/doctor-2.jpg",
  },
  {
    name: "drg. Reza Mahendra, Sp.Perio",
    specialty: "Spesialis Gusi & Implant",
    experience: "10 tahun",
    education: "S2 Padjadjaran · Fellow Implant Dentistry ITI",
    rating: 4.8,
    reviews: 640,
    gradient: "from-fuchsia-500 via-pink-600 to-rose-700",
    initials: "RM",
    avail: "Sen · Sel · Kam",
    photo: "/doctors/doctor-3.jpg",
  },
  {
    name: "drg. Salsabila Karim, Sp.Pros",
    specialty: "Spesialis Gigi Palsu & Estetik",
    experience: "9 tahun",
    education: "S2 Gadjah Mada · Member Indonesian Esthetic Dentistry",
    rating: 5.0,
    reviews: 530,
    badge: "Top Rated",
    gradient: "from-pink-600 via-rose-600 to-fuchsia-700",
    initials: "SK",
    avail: "Rab · Jum · Sab",
    photo: "/doctors/doctor-4.jpg",
  },
];

export function Doctors() {
  return (
    <section id="doctors" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-pink-50/60 via-white to-pink-50/40" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-pink-700">
            Tim Dokter Kami
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-pink-950 sm:text-5xl">
            Dokter gigi spesialis
            <br />
            <span className="text-gradient-pink">yang Anda percayai</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/65">
            Tim OMDC terdiri dari dokter gigi umum dan spesialis bersertifikat yang terus
            mengembangkan keahlian melalui pelatihan nasional maupun internasional. Setiap dokter
            memiliki area keahlian unggulan untuk memastikan Anda mendapat perawatan terbaik.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DOCTORS.map((doc, i) => (
            <motion.article
              key={doc.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-soft-pink"
            >
              {/* Avatar block */}
              <div className={`relative aspect-[4/3] bg-gradient-to-br ${doc.gradient}`}>
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.6) 0%, transparent 40%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.15) 0%, transparent 50%)",
                  }}
                />
                {/* Real photo or initials fallback */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {doc.photo ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={doc.photo}
                        alt={`Foto ${doc.name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        priority={i < 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/70 bg-white/20 backdrop-blur-sm">
                      <span className="font-display text-3xl font-extrabold text-white drop-shadow">
                        {doc.initials}
                      </span>
                    </div>
                  )}
                </div>

                {/* Badge */}
                {doc.badge && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-pink-700 shadow-sm backdrop-blur">
                    <Award className="h-3 w-3" />
                    {doc.badge}
                  </span>
                )}

                {/* Rating chip */}
                <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-amber-600 shadow-sm">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {doc.rating.toFixed(1)}
                  <span className="text-[10px] font-medium text-foreground/50">({doc.reviews})</span>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-base font-bold leading-snug text-pink-950">
                  {doc.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-pink-600">{doc.specialty}</p>

                <div className="mt-4 space-y-2 text-xs text-foreground/65">
                  <p className="flex items-start gap-2">
                    <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
                    <span className="leading-relaxed">{doc.education}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Award className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
                    <span>{doc.experience} pengalaman klinis</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
                    <span>Praktik: {doc.avail}</span>
                  </p>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="mt-5 w-full rounded-full border-pink-200 bg-white text-pink-700 hover:bg-pink-50 hover:text-pink-800"
                >
                  <a href="#booking">Buat Janji</a>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 flex items-center justify-center gap-3 text-sm text-foreground/55">
          <span className="hidden h-px w-12 bg-pink-200 sm:inline-block" />
          Butuh dokter spesialis lain? Hubungi kami untuk jadwal tamu spesialis.
          <span className="hidden h-px w-12 bg-pink-200 sm:inline-block" />
        </div>
      </div>
    </section>
  );
}
