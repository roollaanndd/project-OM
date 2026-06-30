/**
 * Blog article data for OMDC.
 */

export interface BlogSection {
  type: "h2" | "p" | "ul" | "quote" | "tip" | "warning";
  text?: string;
  items?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  tags: string[];
  keywords: string[];
  content: BlogSection[];
  faqs?: { q: string; a: string }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "panduan-lengkap-scaling-gigi",
    title: "Panduan Lengkap Scaling Gigi: Manfaat, Proses, dan Biaya 2025",
    excerpt: "Scaling gigi bukan sekadar membersihkan karang — ini investasi kesehatan jangka panjang.",
    description: "Panduan lengkap scaling gigi 2025: manfaat, proses, apakah sakit, biaya, dan frekuensi. Dirakit oleh dokter gigi bersertifikat OMDC.",
    category: "Perawatan Gigi",
    author: "drg. Oktri Manessa, Sp.Ort",
    authorRole: "Orthodontist & Founder OMDC",
    date: "2025-06-15",
    readingTime: "8 menit",
    image: "/blog/scaling-tips.jpg",
    imageAlt: "Proses scaling gigi profesional di klinik OMDC",
    tags: ["scaling", "kesehatan gigi", "karang gigi"],
    keywords: ["scaling gigi", "biaya scaling gigi", "scaling gigi sakit", "manfaat scaling"],
    content: [
      { type: "p", text: "Scaling gigi adalah prosedur pembersihan karang gigi menggunakan alat ultrasonic scaler. Banyak orang menganggap scaling hanya untuk estetika, padahal manfaat utamanya adalah mencegah penyakit gusi dan gigi berlubang." },
      { type: "h2", text: "Apa Itu Scaling Gigi?" },
      { type: "p", text: "Scaling gigi adalah prosedur pembersihan karang gigi (kalkulus) dan plak menggunakan alat khusus. Setelah scaling, dokter melakukan polishing untuk menghaluskan permukaan gigi." },
      { type: "h2", text: "5 Manfaat Scaling Gigi" },
      { type: "ul", items: ["Menghilangkan karang gigi", "Mencegah gusi berdarah", "Mengurangi bau mulut", "Mencegah periodontitis", "Membuat gigi lebih bersih"] },
      { type: "tip", text: "Scaling tidak merusak enamel! Yang dibersihkan adalah karang, bukan enamel gigi." },
      { type: "h2", text: "Apakah Scaling Sakit?" },
      { type: "p", text: "Prosedur scaling modern nyaris tanpa rasa sakit. Pasien hanya merasakan getaran halus. Untuk gigi sensitif, tersedia anestesi topikal." },
      { type: "h2", text: "Biaya Scaling 2025" },
      { type: "p", text: "Biaya scaling di Indonesia Rp 250.000 - Rp 800.000. Di OMDC, scaling mulai Rp 250.000 termasuk polishing dan fluoride." },
      { type: "warning", text: "Hindari klinik dengan harga di bawah Rp 150.000. Pastikan alat steril dan disposable." },
      { type: "h2", text: "Berapa Sering Scaling?" },
      { type: "p", text: "Setiap 6 bulan untuk gigi normal. Setiap 3-4 bulan untuk pengguna behel atau perokok." },
    ],
    faqs: [
      { q: "Apakah scaling sakit?", a: "Tidak. Prosedur modern nyaris tanpa sakit, hanya getaran halus." },
      { q: "Berapa lama scaling?", a: "30-45 menit termasuk polishing dan fluoride." },
      { q: "Scaling merusak enamel?", a: "Tidak. Scaling hanya mengangkat karang, bukan enamel." },
    ],
  },
  {
    slug: "behel-keramik-vs-metal",
    title: "Behel Keramik vs Metal: Mana yang Tepat untuk Anda?",
    excerpt: "Bingung pilih behel keramik atau metal? Bandingkan harga, estetika, dan kenyamanan keduanya.",
    description: "Perbandisan behel keramik vs metal: kelebihan, kekurangan, harga, estetika. Panduan memilih behel yang tepat.",
    category: "Orthodontic",
    author: "drg. Oktri Manessa, Sp.Ort",
    authorRole: "Orthodontist & Founder OMDC",
    date: "2025-06-10",
    readingTime: "7 menit",
    image: "/blog/behel-guide.jpg",
    imageAlt: "Perbandingan behel keramik dan metal",
    tags: ["behel", "orthodontic", "keramik", "metal"],
    keywords: ["behel keramik vs metal", "biaya behel", "kawat gigi", "orthodontic"],
    content: [
      { type: "p", text: "Memutuskan pasang behel adalah langkah besar menuju senyum percaya diri. Tapi behel keramik atau metal? Mari bandingkan." },
      { type: "h2", text: "Behel Metal: Klasik dan Teruji" },
      { type: "p", text: "Behel metal adalah jenis paling umum. Bracket stainless steel yang kuat dan tahan lama." },
      { type: "ul", items: ["Harga terjangkau (mulai Rp 4,5jt)", "Bracket tahan lama", "Perawatan lebih cepat", "Tidak mudah pecah"] },
      { type: "h2", text: "Behel Keramik: Estetik" },
      { type: "p", text: "Behel keramik menggunakan bracket warna gigi sehingga lebih tidak terlihat. Populer untuk dewasa profesional." },
      { type: "ul", items: ["Lebih estetik", "Tidak terlihat dari jarak", "Material tidak menguning", "Lebih nyaman di bibir"] },
      { type: "h2", text: "Perbandingan Harga" },
      { type: "p", text: "Metal mulai Rp 4,5 juta, keramik mulai Rp 7 juta. Keduanya tersedia cicilan 0% hingga 12 bulan." },
      { type: "tip", text: "Konsultasi awal di OMDC gratis! Dokter akan rekomendasikan jenis behel yang sesuai." },
    ],
    faqs: [
      { q: "Berapa lama perawatan behel?", a: "12-24 bulan untuk kasus standar, 24-36 bulan untuk kompleks." },
      { q: "Behel sakit?", a: "Tidak nyaman ringan 3-5 hari setelah pemasangan, lalu normal." },
    ],
  },
  {
    slug: "pemutihan-gigi-whitening",
    title: "Pemutihan Gigi: Hasil 8 Tingkat Lebih Cerah dalam 1 Jam",
    excerpt: "Ingin gigi lebih putih tanpa merusak enamel? Pelajari cara kerja whitening profesional.",
    description: "Panduan pemutihan gigi profesional: cara kerja, keamanan, hasil, biaya, dan perawatan. Dapatkan gigi 8 tingkat lebih cerah dengan aman.",
    category: "Estetik",
    author: "drg. Salsabila Karim, Sp.Pros",
    authorRole: "Prosthodontist OMDC",
    date: "2025-06-05",
    readingTime: "6 menit",
    image: "/blog/whitening-guide.jpg",
    imageAlt: "Hasil pemutihan gigi profesional",
    tags: ["whitening", "pemutihan gigi", "estetik"],
    keywords: ["pemutihan gigi", "whitening gigi", "biaya whitening", "gigi kuning"],
    content: [
      { type: "p", text: "Senyum cerah adalah dambaan banyak orang. Mari kita bahas whitening profesional berdasarkan sains." },
      { type: "h2", text: "Cara Kerja Whitening" },
      { type: "p", text: "Gel hydrogen peroxide diaktivasi lampu LED. Gel menembus enamel dan memecah pigmen penyebab perubahan warna." },
      { type: "h2", text: "Aman untuk Enamel?" },
      { type: "p", text: "Ya, whitening profesional aman. Konsentrasi gel terkontrol sesuai standar. Tidak seperti produk ilegal, gel profesional tidak mengikis enamel." },
      { type: "warning", text: "Hindari produk whitening ilegal tanpa izin edar. Bisa merusak enamel permanen." },
      { type: "h2", text: "Proses Whitening" },
      { type: "ul", items: ["Konsultasi", "Pemasangan pelindung gusi", "Aplikasi gel (3 sesi x 15 menit)", "Aktivasi LED", "Aplikasi fluoride"] },
      { type: "h2", text: "Hasil Bertahan Berapa Lama?" },
      { type: "p", text: "1-2 tahun tergantung gaya hidup. Hindari kopi, teh, merokok. Sikat dengan pasta whitening maintenance." },
      { type: "tip", text: "Hindari makanan berwarna 48 jam pertama setelah whitening." },
    ],
    faqs: [
      { q: "Gigi jadi sensitif?", a: "Sensitivitas sementara 24-48 jam, lalu hilang. Fluoride diberikan untuk minimisasi." },
      { q: "Berapa kali setahun?", a: "Maksimal 2-3 kali setahun tergantung kondisi enamel." },
    ],
  },
  {
    slug: "tips-merawat-gigi-anak",
    title: "10 Tips Merawat Gigi Anak agar Bebas Lubang",
    excerpt: "Gigi susu juga perlu perawatan! Pelajari cara menjaga kesehatan gigi anak sejak dini.",
    description: "10 tips praktis merawat gigi anak: sikat gigi, mencegah lubang, kapan ke dokter. Panduan untuk orang tua.",
    category: "Gigi Anak",
    author: "drg. Adelia Putri, Sp.KGA",
    authorRole: "Spesialis Gigi Anak OMDC",
    date: "2025-05-28",
    readingTime: "7 menit",
    image: "/blog/kids-dental.jpg",
    imageAlt: "Anak belajar menyikat gigi",
    tags: ["gigi anak", "dental kids", "tips orang tua"],
    keywords: ["tips merawat gigi anak", "gigi anak berlubang", "cara menyikat gigi anak", "gigi susu"],
    content: [
      { type: "p", text: "Kesehatan gigi anak dimulai sejak gigi susu pertama. Sayangnya banyak orang tua menganggap gigi susu tidak perlu dirawat." },
      { type: "h2", text: "10 Tips Merawat Gigi Anak" },
      { type: "ul", items: ["Mulai sikat sejak gigi pertama tumbuh", "Gunakan sikat berbulu lembut", "Pasta fluoride secukupnya", "Sikat 2x sehari", "Batasi gula", "Hindari tidur dengan botol susu", "Biasakan minum air", "Kunjungi dokter gigi tiap 6 bulan", "Ajarkan teknik menyikat", "Beri contoh: anak meniru orang tua"] },
      { type: "tip", text: "Buat sikat gigi jadi menyenangkan! Gunakan timer lagu 2 menit, biarkan anak pilih sikat dengan karakter favorit." },
      { type: "h2", text: "Kapan ke Dokter Gigi?" },
      { type: "p", text: "Kunjungan pertama saat gigi pertama tumbuh atau usia 1 tahun. Kontrol rutin setiap 6 bulan." },
      { type: "h2", text: "Mitos vs Fakta" },
      { type: "ul", items: ["Mitos: Gigi susu tidak perlu dirawat. Fakta: Gigi susu berlubang pengaruhi gigi permanen.", "Mitos: Anak takut dokter gigi wajar. Fakta: Klinik anak yang ramah bikin kunjungan menyenangkan."] },
      { type: "quote", text: "Investasi terbaik untuk senyum anak adalah membiasakan perawatan gigi sejak dini." },
    ],
  },
  {
    slug: "panduan-implant-gigi",
    title: "Implant Gigi: Solusi Permanen untuk Gigi Hilang",
    excerpt: "Kehilangan gigi bukan akhir. Implant gigi adalah solusi permanen yang berfungsi seperti gigi asli.",
    description: "Panduan implant gigi: proses, keuntungan, biaya, perawatan, garansi. Solusi permanen untuk gigi hilang.",
    category: "Implant",
    author: "drg. Reza Mahendra, Sp.Perio",
    authorRole: "Periodontist & Implantologist OMDC",
    date: "2025-05-20",
    readingTime: "9 menit",
    image: "/blog/implant-guide.jpg",
    imageAlt: "Prosedur implant gigi",
    tags: ["implant", "gigi hilang", "perawatan permanen"],
    keywords: ["implant gigi", "biaya implant", "gigi hilang", "implant permanen"],
    content: [
      { type: "p", text: "Kehilangan gigi bisa disebabkan banyak hal. Implant gigi menawarkan solusi permanen yang terlihat dan berfungsi seperti gigi asli." },
      { type: "h2", text: "Apa Itu Implant Gigi?" },
      { type: "p", text: "Implant terdiri dari titanium screw (akar buatan), abutment, dan crown. Titanium menyatu dengan tulang rahang memberikan fondasi permanen." },
      { type: "h2", text: "Keuntungan Implant" },
      { type: "ul", items: ["Permanen — tidak perlu dilepas", "Terasa seperti gigi asli", "Mencegah tulang rahang mengecil", "Tidak merusak gigi sebelah", "Daya tahan seumur hidup"] },
      { type: "h2", text: "Proses Pemasangan" },
      { type: "ul", items: ["Konsultasi & rontgen 3D", "Pemasangan implant (1-2 jam)", "Penyembuhan 3-6 bulan", "Pemasangan crown", "Kontrol rutin 6 bulan"] },
      { type: "tip", text: "OMDC menggunakan guided surgery 3D untuk placement presisi. Minim rasa sakit, cepat sembuh." },
      { type: "h2", text: "Biaya Implant" },
      { type: "p", text: "Mulai Rp 18 juta per gigi dengan garansi seumur hidup untuk screw. Cicilan 0% hingga 12 bulan tersedia." },
      { type: "quote", text: "Implant bukan sekadar mengganti gigi — ini mengembalikan kepercayaan diri dan kualitas hidup." },
    ],
    faqs: [
      { q: "Pemasangan sakit?", a: "Tidak. Anestesi lokal, hanya tekanan. Obat pereda nyeri untuk setelahnya." },
      { q: "Berapa lama bertahan?", a: "Seumur hidup dengan perawatan baik. Garansi seumur hidup untuk screw." },
    ],
  },
  {
    slug: "7-kebiasaan-gigi-sehat",
    title: "7 Kebiasaan Sederhana untuk Gigi Sehat Seumur Hidup",
    excerpt: "Tidak perlu perawatan mahal. 7 kebiasaan sederhana ini menjaga senyum Anda sehat hingga tua.",
    description: "7 kebiasaan gigi sehat: sikat gigi, flossing, batasi gula, kontrol rutin. Tips praktis dari dokter gigi OMDC.",
    category: "Tips Kesehatan",
    author: "drg. Bayu Pratama",
    authorRole: "Dokter Gigi Umum OMDC",
    date: "2025-05-15",
    readingTime: "5 menit",
    image: "/blog/oral-hygiene.jpg",
    imageAlt: "Perawatan gigi sehat",
    tags: ["tips kesehatan", "kebiasaan sehat", "pencegahan"],
    keywords: ["kebiasaan gigi sehat", "cara merawat gigi", "tips gigi sehat", "kesehatan mulut"],
    content: [
      { type: "p", text: "Kunci gigi sehat adalah kebiasaan harian yang sederhana. Berikut 7 kebiasaan yang menjaga gigi tetap sehat." },
      { type: "h2", text: "1. Sikat 2x Sehari" },
      { type: "p", text: "Sikat pagi setelah sarapan dan malam sebelum tidur. Teknik bulat-bulat lembut selama 2 menit." },
      { type: "h2", text: "2. Pasta Berfluoride" },
      { type: "p", text: "Fluoride memperkuat enamel dan mencegah lubang. Pilih pasta dengan sodium fluoride 1450 ppm." },
      { type: "h2", text: "3. Flossing Harian" },
      { type: "p", text: "Plak di sela gigi hanya bisa dibersihkan dengan benang gigi. Lakukan 1x sehari, sebaiknya malam." },
      { type: "tip", text: "Sulit pakai benang? Coba interdental brush atau water flosser." },
      { type: "h2", text: "4. Batasi Gula" },
      { type: "p", text: "Bakteri memakan gula dan menghasilkan asam yang merusak enamel. Batasi permen, soda, jus kemasan." },
      { type: "h2", text: "5. Kontrol 6 Bulanan" },
      { type: "p", text: "Jangan tunggu sakit! Deteksi dini = pengobatan mudah dan murah." },
      { type: "h2", text: "6. Hindari Kebiasaan Merusak" },
      { type: "ul", items: ["Menggigit es batu/pulpen", "Membuka bungkus dengan gigi", "Merokok", "Bruxism (gesek gigi saat tidur)"] },
      { type: "h2", text: "7. Minum Air Cukup" },
      { type: "p", text: "Air membilas sisa makanan dan menjaga air liur. Air liur adalah pertahanan alami terhadap bakteri." },
      { type: "quote", text: "Gigi sehat bukan hak istimewa — itu hasil kebiasaan kecil yang dilakukan konsisten setiap hari." },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  return BLOG_POSTS.filter((p) => p.slug !== slug && p.category === current.category).slice(0, limit);
}
