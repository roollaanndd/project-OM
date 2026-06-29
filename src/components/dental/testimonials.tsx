"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

type Review = {
  name: string;
  role: string;
  initials: string;
  rating: number;
  text: string;
  gradient: string;
  service: string;
  photo?: string;
};

const REVIEWS: Review[] = [
  {
    name: "Sarah Wijayanti",
    role: "Ibu Rumah Tangga · Bekasi",
    initials: "SW",
    rating: 5,
    gradient: "from-pink-500 to-rose-500",
    service: "Behel Keramik",
    photo: "/testimonials/testimonial-1.jpg",
    text: "Saya pasang behel keramik di OMDC dan hasilnya benar-benar memuaskan. dr. Oktri sangat sabar menjelaskan tiap tahap. Klinikenya bersih, pegawai ramah, dan harganya transparan. Sekarang senyum saya jauh lebih percaya diri!",
  },
  {
    name: "Ahmad Fauzi",
    role: "Karyawan Swasta · Jakarta",
    initials: "AF",
    rating: 5,
    gradient: "from-rose-500 to-fuchsia-600",
    service: "Scaling & Whitening",
    photo: "/testimonials/testimonial-2.jpg",
    text: "Awalnya takut scaling, ternyata sama sekali tidak sakit. Dokternya komunikatif dan selalu menanyakan kondisi saya. Hasil whitening-nya juga natural, tidak terlalu putih. Recommended banget buat yang punya dental anxiety.",
  },
  {
    name: "Dewi Lestari",
    role: "Guru · Depok",
    initials: "DL",
    rating: 5,
    gradient: "from-fuchsia-500 to-pink-600",
    service: "Dental Kids",
    photo: "/testimonials/testimonial-3.jpg",
    text: "Anak saya (5 tahun) biasanya nangis ke dokter gigi, di OMDC malah betah. Ruang bermainnya membuatnya relaks, dokternya ramah sekali. Sekarang tiap kontrol gigi dia yang ingatkan. Terima kasih OMDC!",
  },
  {
    name: "Budi Santoso",
    role: "Wiraswasta · Tangerang",
    initials: "BS",
    rating: 5,
    gradient: "from-pink-600 to-rose-700",
    service: "Implant Gigi",
    photo: "/testimonials/testimonial-4.jpg",
    text: "Saya pasang implant 2 gigi di OMDC setelah bandingkan dengan beberapa klinik lain. Harganya kompetitif, tapi yang lebih penting dokternya ahli dan hasilnya sangat natural. Garansi seumur hidup juga jadi nilai tambah.",
  },
  {
    name: "Rina Marlina",
    role: "Mahasiswa · Jakarta",
    initials: "RM",
    rating: 5,
    gradient: "from-rose-600 to-pink-700",
    service: "Root Canal",
    photo: "/testimonials/testimonial-5.jpg",
    text: "Saya kira gigi saya harus dicabut, ternyata bisa di-root canal dengan mikroskop. Prosesnya 2 kunjungan dan tidak terlalu sakit. dr. Reza sabar sekali. Senang bisa selamatkan gigi asli saya.",
  },
  {
    name: "Eko Prasetyo",
    role: "Engineer · Bandung",
    initials: "EP",
    rating: 5,
    gradient: "from-fuchsia-600 to-rose-700",
    service: "Veneer Gigi",
    photo: "/testimonials/testimonial-6.jpg",
    text: "Pengalaman pasang veneer di OMDC luar biasa. Konsultasi awalnya detail, simulasi hasilnya ditunjukkan sebelum treatment. Hasilnya natural dan sesuai ekspektasi. Worth every rupiah.",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-pink-50/50 to-white" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-pink-700">
            Testimoni Pasien
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-pink-950 sm:text-5xl">
            Kisah senyum bahagia
            <br />
            <span className="text-gradient-pink">dari pasien kami</span>
          </h2>
          <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-pink-200 bg-white px-5 py-2 shadow-sm">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-pink-950">4.9 / 5.0</span>
            <span className="text-sm text-foreground/60">· 2.400+ ulasan Google</span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="relative flex flex-col rounded-3xl border border-pink-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-soft-pink"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-pink-100" />

              <div className="flex items-center gap-1">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/75">
                &ldquo;{r.text}&rdquo;
              </p>

              <div className="mt-5 flex items-center gap-3 border-t border-pink-100 pt-4">
                {r.photo ? (
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full shadow-sm ring-2 ring-pink-100">
                    <Image
                      src={r.photo}
                      alt={`Foto ${r.name}`}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                ) : (
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${r.gradient} text-sm font-bold text-white shadow-sm`}
                  >
                    {r.initials}
                  </div>
                )}
                <div className="flex-1">
                  <div className="text-sm font-bold text-pink-950">{r.name}</div>
                  <div className="text-xs text-foreground/55">{r.role}</div>
                </div>
                <span className="rounded-full bg-pink-50 px-2.5 py-1 text-[10px] font-semibold text-pink-700">
                  {r.service}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
