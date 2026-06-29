/**
 * Shared service data for landing pages.
 * Extracted to a separate module because Next.js page files
 * don't allow non-default exports to be imported elsewhere.
 */

export type ServiceDetail = {
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

export const SERVICES: ServiceDetail[] = [
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
