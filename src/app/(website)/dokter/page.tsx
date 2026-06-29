import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Award, Star, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Tim Dokter Gigi Spesialis OMDC",
  description:
    "Tim dokter gigi OMDC: orthodontist, spesialis gigi anak, periodontist, prosthodontist, dan dokter gigi umum. Bersertifikat, berpengalaman, dan ramah.",
  alternates: { canonical: "/dokter" },
};

const DOCTORS = [
  {
    name: "drg. Oktri Manessa, Sp.Ort",
    specialty: "Orthodontist (Spesialis Behel)",
    experience: "12 tahun",
    education: "S2 Trisakti · Sertifikat Invisalign Asia Pasifik",
    rating: 4.9,
    reviews: 1240,
    badge: "Founder",
    gradient: "from-pink-500 to-fuchsia-600",
    initials: "OM",
    avail: "Sen · Rab · Jum",
    bio: "drg. Oktri adalah founder OMDC dengan pengalaman 12 tahun di bidang orthodonti. Beliau dikenal dengan pendekatan personal dan estetik, memastikan setiap pasien mendapatkan senyum terbaik sesuai struktur wajah.",
  },
  {
    name: "drg. Adelia Putri, Sp.KGA",
    specialty: "Spesialis Gigi Anak",
    experience: "8 tahun",
    education: "S2 Universitas Indonesia · Certified Conscious Sedation",
    rating: 4.9,
    reviews: 870,
    badge: "Kids Favorite",
    gradient: "from-rose-500 to-amber-400",
    initials: "AP",
    avail: "Sel · Kam · Sab",
    bio: "drg. Adelia spesialis dalam menangani pasien anak dengan teknik minim trauma. Ruang perawatannya dilengkapi mainan dan kartun favorit anak, membuat kunjungan ke dokter gigi menjadi pengalaman menyenangkan.",
  },
  {
    name: "drg. Reza Mahendra, Sp.Perio",
    specialty: "Spesialis Gusi & Implant",
    experience: "10 tahun",
    education: "S2 Padjadjaran · Fellow Implant Dentistry ITI",
    rating: 4.8,
    reviews: 640,
    gradient: "from-fuchsia-500 to-rose-700",
    initials: "RM",
    avail: "Sen · Sel · Kam",
    bio: "drg. Reza ahli dalam perawatan gusi lanjutan dan implant gigi. Beliau menggunakan mikroskop dental dan teknik guided surgery untuk akurasi tinggi pada setiap pemasangan implant.",
  },
  {
    name: "drg. Salsabila Karim, Sp.Pros",
    specialty: "Spesialis Gigi Palsu & Estetik",
    experience: "9 tahun",
    education: "S2 Gadjah Mada · Member Indonesian Esthetic Dentistry",
    rating: 5.0,
    reviews: 530,
    badge: "Top Rated",
    gradient: "from-pink-600 to-fuchsia-700",
    initials: "SK",
    avail: "Rab · Jum · Sab",
    bio: "drg. Salsabila spesialis prostodonti dengan fokus pada estetika senyum. Beliau menggunakan digital smile design untuk merancang veneer dan mahkota yang natural sesuai wajah pasien.",
  },
];

export default function DoctorsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-pink-950/55">
          <Link href="/" className="hover:text-pink-700">Beranda</Link>
          <span className="mx-2">›</span>
          <span className="font-bold text-pink-700">Dokter</span>
        </nav>

        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-pink-700">
            Tim Dokter Spesialis
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-pink-950 sm:text-5xl">
            Dokter gigi yang
            <br />
            <span className="text-gradient-pink">Anda percayai</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/65">
            Tim OMDC terdiri dari dokter gigi umum dan spesialis bersertifikat yang terus
            mengembangkan keahlian melalui pelatihan nasional maupun internasional.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {DOCTORS.map((doc) => (
            <article
              key={doc.name}
              className="group relative overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-soft-pink"
            >
              <div className={`relative aspect-[4/2] bg-gradient-to-br ${doc.gradient}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/70 bg-white/20 backdrop-blur-sm">
                    <span className="font-display text-3xl font-extrabold text-white drop-shadow">
                      {doc.initials}
                    </span>
                  </div>
                </div>
                {doc.badge && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-pink-700 shadow-sm">
                    <Award className="h-3 w-3" />
                    {doc.badge}
                  </span>
                )}
                <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-amber-600 shadow-sm">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {doc.rating.toFixed(1)}
                  <span className="text-[10px] font-medium text-foreground/50">({doc.reviews})</span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-display text-lg font-bold text-pink-950">{doc.name}</h2>
                <p className="mt-1 text-sm font-medium text-pink-600">{doc.specialty}</p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65">{doc.bio}</p>
                <div className="mt-4 space-y-1.5 text-xs text-foreground/65">
                  <p className="flex items-start gap-2">
                    <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
                    <span>{doc.education}</span>
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
                <Link
                  href="/#booking"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-pink-200 bg-white py-2.5 text-sm font-bold text-pink-700 transition-colors hover:bg-pink-50"
                >
                  Buat Janji dengan {doc.initials}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
