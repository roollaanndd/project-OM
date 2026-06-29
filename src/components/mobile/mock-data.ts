import type {
  User,
  Appointment,
  MedicalRecord,
  Bill,
  PaymentMethod,
  Transaction,
} from "./types";

const today = new Date();
const iso = (d: Date) => d.toISOString().split("T")[0];
const addDays = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return iso(d);
};

export const MOCK_USER: User = {
  id: "u-001",
  name: "Sarah Wijayanti",
  email: "sarah.w@email.com",
  phone: "+62 812-3456-7890",
  initials: "SW",
  gradient: "from-pink-500 to-rose-500",
  memberTier: "Gold",
  points: 2450,
  pointsToNextTier: 550,
  joinedDate: "2022-03-15",
  familyMembers: [
    {
      id: "fam-1",
      name: "Andi Wijayanti",
      relation: "Suami",
      age: 34,
      initials: "AW",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "fam-2",
      name: "Kaira Wijayanti",
      relation: "Anak",
      age: 6,
      initials: "KW",
      gradient: "from-amber-400 to-pink-500",
    },
    {
      id: "fam-3",
      name: "Budi Wijayanti",
      relation: "Anak",
      age: 9,
      initials: "BW",
      gradient: "from-emerald-500 to-teal-500",
    },
  ],
};

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-001",
    service: "Scaling & Polishing",
    serviceIcon: "sparkles",
    doctor: "drg. Oktri Manessa, Sp.Ort",
    doctorInitials: "OM",
    doctorGradient: "from-pink-500 to-fuchsia-600",
    date: addDays(3),
    time: "14:00",
    duration: "45 menit",
    status: "upcoming",
    price: 350000,
    clinic: "OMDC Bekasi Selatan",
    address: "Jl. Melati Raya No. 17, Bekasi Selatan",
  },
  {
    id: "apt-002",
    service: "Kontrol Behel",
    serviceIcon: "wrench",
    doctor: "drg. Oktri Manessa, Sp.Ort",
    doctorInitials: "OM",
    doctorGradient: "from-pink-500 to-fuchsia-600",
    date: addDays(17),
    time: "16:30",
    duration: "30 menit",
    status: "upcoming",
    price: 150000,
    clinic: "OMDC Bekasi Selatan",
    address: "Jl. Melati Raya No. 17, Bekasi Selatan",
  },
];

export const MOCK_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    id: "rec-001",
    date: addDays(-30),
    doctor: "drg. Oktri Manessa, Sp.Ort",
    doctorInitials: "OM",
    doctorGradient: "from-pink-500 to-fuchsia-600",
    doctorSpecialty: "Orthodontist",
    service: "Pemasangan Behel Keramik",
    serviceIcon: "wrench",
    diagnosis:
      "Maloklusi kelas II dengan crowding ringan pada gigi anterior rahang atas. Pasien memilih behel keramik untuk estetika.",
    treatment:
      "Pemasangan bracket keramik pada gigi rahang atas (16-26) dan rahang bawah (36-46). Arcwire NiTi 0.014 inch. Pengaturan ligature elastomeric clear.",
    prescription: [
      { name: "Ibuprofen 400mg", dosage: "3x sehari", duration: "5 hari" },
      { name: "Mouthwash Chlorhexidine 0.2%", dosage: "2x sehari", duration: "14 hari" },
      { name: "Wax orthodontic", dosage: "sebagai perlukan", duration: "-" },
    ],
    notes:
      "Pasien dijelaskan mengenai perawatan selama behel terpasang. Hindari makanan keras dan lengket. Kontrol selanjutnya 4 minggu lagi. Pasien diminta menghubungi klinik jika ada bracket yang lepas.",
    cost: 4500000,
    affectedTeeth: {
      upper: [6, 7, 8, 9, 10, 11],
      lower: [23, 24, 25, 26],
    },
  },
  {
    id: "rec-002",
    date: addDays(-75),
    doctor: "drg. Adelia Putri, Sp.KGA",
    doctorInitials: "AP",
    doctorGradient: "from-rose-500 to-amber-400",
    doctorSpecialty: "Spesialis Gigi Anak",
    service: "Tambal Gigi Anak (Kaira)",
    serviceIcon: "stethoscope",
    diagnosis:
      "Karies superfisial pada gigi molar susu pertama kanan bawah (84). Tidak ada keluhan sakit, ditemukan saat pemeriksaan rutin.",
    treatment:
      "Tambalan composite resin warna gigi pada gigi 84. Teknik minimal invasive dengan isolasi rubber dam. Pemberian fluoride varnish pada seluruh gigi.",
    prescription: [
      { name: "Fluoride toothpaste kids", dosage: "2x sehari", duration: "rutin" },
    ],
    notes:
      "Anak kooperatif selama perawatan. Orang tua dijelaskan teknik menyikat gigi yang benar untuk anak. Kontrol 6 bulan lagi. Batasi konsumsi gula-gula dan minuman manis.",
    cost: 425000,
    affectedTeeth: {
      upper: [],
      lower: [19],
    },
  },
  {
    id: "rec-003",
    date: addDays(-120),
    doctor: "drg. Reza Mahendra, Sp.Perio",
    doctorInitials: "RM",
    doctorGradient: "from-fuchsia-500 to-rose-700",
    doctorSpecialty: "Periodontist",
    service: "Scaling & Root Planing",
    serviceIcon: "sparkles",
    diagnosis:
      "Gingivitis kronis dengan kalkulus subgingiva pada regio posterior. Pocket depth 3-4mm. Tidak ada tanda periodontitis agresif.",
    treatment:
      "Scaling ultrasonic dan root planing manual pada kuadran 1-4. Pembersihan kalkulus dan biofilm. Smoothing permukaan akar.",
    prescription: [
      { name: "Mouthwash Chlorhexidine 0.12%", dosage: "2x sehari", duration: "14 hari" },
      { name: "Vitamin C 500mg", dosage: "1x sehari", duration: "30 hari" },
    ],
    notes:
      "Pasien disarankan scaling rutin setiap 6 bulan. Teknik menyikat gigi dievaluasi dan dikoreksi. Penggunaan benang gigi disarankan setiap hari.",
    cost: 850000,
    affectedTeeth: {
      upper: [3, 14],
      lower: [19, 30],
    },
  },
  {
    id: "rec-004",
    date: addDays(-210),
    doctor: "drg. Salsabila Karim, Sp.Pros",
    doctorInitials: "SK",
    doctorGradient: "from-pink-600 to-fuchsia-700",
    doctorSpecialty: "Prosthodontist",
    service: "Veneer Laminat 4 Gigi",
    serviceIcon: "crown",
    diagnosis:
      "Pasien ingin memperbaiki estetika gigi anterior rahang atas yang memiliki diskolorasi dan bentuk sedikit tidak proporsional.",
    treatment:
      "Veneer laminat porcelain pada gigi 11, 12, 21, 22. Preparasi minim 0.5mm. Impressi digital dengan intraoral scanner. Try-in dan bonding pada kunjungan kedua.",
    prescription: [
      { name: "Ibuprofen 400mg", dosage: "3x sehari", duration: "3 hari" },
      { name: "Mouthwash Chlorhexidine 0.12%", dosage: "2x sehari", duration: "7 hari" },
    ],
    notes:
      "Hasil akhir sangat natural dan sesuai ekspektasi pasien. Hindari makanan keras dan pewarna (kopi, anggur merah) selama 48 jam pertama. Kontrol 1 minggu, 1 bulan, dan 6 bulan.",
    cost: 18000000,
    affectedTeeth: {
      upper: [7, 8, 9, 10],
      lower: [],
    },
  },
];

export const MOCK_BILLS: Bill[] = [
  {
    id: "bill-001",
    description: "Pelunasan Behel Keramik (Cicilan ke-3)",
    amount: 1500000,
    dueDate: addDays(7),
    status: "unpaid",
    service: "Kawat Gigi / Behel",
    date: addDays(-5),
  },
  {
    id: "bill-002",
    description: "Kontrol Behel & Penyesuaian Wire",
    amount: 150000,
    dueDate: addDays(14),
    status: "unpaid",
    service: "Kontrol Rutin",
    date: addDays(-2),
  },
];

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pm-1",
    type: "gopay",
    label: "GoPay",
    detail: "0812-3456-7890",
    balance: 2850000,
    isDefault: true,
    gradient: "from-emerald-500 to-green-600",
  },
  {
    id: "pm-2",
    type: "ovo",
    label: "OVO",
    detail: "0812-3456-7890",
    balance: 1250000,
    gradient: "from-purple-500 to-violet-700",
  },
  {
    id: "pm-3",
    type: "dana",
    label: "DANA",
    detail: "sarah.w@email.com",
    balance: 750000,
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    id: "pm-4",
    type: "card",
    label: "Kartu Kredit BCA",
    detail: "**** **** **** 4521",
    gradient: "from-slate-700 to-slate-900",
  },
  {
    id: "pm-5",
    type: "qris",
    label: "QRIS",
    detail: "Scan & Bayar",
    gradient: "from-rose-500 to-red-600",
  },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "trx-001",
    description: "Veneer Laminat 4 Gigi",
    amount: 18000000,
    date: addDays(-210),
    method: "Kartu Kredit BCA",
    status: "success",
    invoiceId: "INV/2025/03/0142",
  },
  {
    id: "trx-002",
    description: "Scaling & Root Planing",
    amount: 850000,
    date: addDays(-120),
    method: "GoPay",
    status: "success",
    invoiceId: "INV/2025/06/0089",
  },
  {
    id: "trx-003",
    description: "Tambal Gigi Anak (Kaira)",
    amount: 425000,
    date: addDays(-75),
    method: "OVO",
    status: "success",
    invoiceId: "INV/2025/06/0156",
  },
  {
    id: "trx-004",
    description: "Cicilan Behel Keramik (ke-2)",
    amount: 1500000,
    date: addDays(-35),
    method: "GoPay",
    status: "success",
    invoiceId: "INV/2025/06/0234",
  },
  {
    id: "trx-005",
    description: "Pemasangan Behel Keramik (DP)",
    amount: 1500000,
    date: addDays(-30),
    method: "Kartu Kredit BCA",
    status: "success",
    invoiceId: "INV/2025/06/0245",
  },
];

export const HEALTH_TIPS = [
  {
    id: "t1",
    icon: "🪥",
    title: "Teknik Menyikat Gigi yang Benar",
    desc: "Sikat gigi 2x sehari selama 2 menit dengan gerakan melingkar lembut.",
    color: "from-pink-400 to-rose-500",
  },
  {
    id: "t2",
    icon: "🦷",
    title: "Pentingnya Benang Gigi",
    desc: "Gunakan benang gigi sekali sehari untuk membersihkan sela gigi.",
    color: "from-rose-400 to-fuchsia-500",
  },
  {
    id: "t3",
    icon: "🥗",
    title: "Makanan untuk Gigi Sehat",
    desc: "Konsumsi sayuran renyah, buah, dan produk susu untuk gigi kuat.",
    color: "from-amber-400 to-pink-500",
  },
  {
    id: "t4",
    icon: "💧",
    title: "Manfaat Air Putih",
    desc: "Minum air setelah makan membantu membersihkan sisa makanan di mulut.",
    color: "from-cyan-400 to-blue-500",
  },
];

export const SERVICES = [
  { id: "s1", name: "Scaling & Polishing", icon: "sparkles", price: "Mulai 250rb", duration: "45 min", color: "from-pink-500 to-rose-500" },
  { id: "s2", name: "Pemutihan Gigi", icon: "smile", price: "Mulai 1.2jt", duration: "60 min", color: "from-rose-500 to-pink-600" },
  { id: "s3", name: "Kawat Gigi / Behel", icon: "wrench", price: "Mulai 4.5jt", duration: "30 min", color: "from-fuchsia-500 to-pink-600" },
  { id: "s4", name: "Mahkota & Gigi Palsu", icon: "crown", price: "Mulai 1.8jt", duration: "90 min", color: "from-pink-600 to-rose-700" },
  { id: "s5", name: "Root Canal", icon: "activity", price: "Mulai 1.5jt", duration: "90 min", color: "from-rose-600 to-pink-700" },
  { id: "s6", name: "Dental Kids", icon: "baby", price: "Mulai 200rb", duration: "30 min", color: "from-pink-400 to-rose-500" },
  { id: "s7", name: "Tambal Gigi Estetik", icon: "stethoscope", price: "Mulai 350rb", duration: "45 min", color: "from-pink-500 to-fuchsia-600" },
  { id: "s8", name: "Implant Gigi", icon: "shield-plus", price: "Mulai 18jt", duration: "120 min", color: "from-rose-500 to-pink-700" },
];

export const DOCTORS = [
  { id: "d1", name: "drg. Oktri Manessa, Sp.Ort", specialty: "Orthodontist", initials: "OM", gradient: "from-pink-500 to-fuchsia-600", rating: 4.9, avail: ["Sen", "Rab", "Jum"] },
  { id: "d2", name: "drg. Adelia Putri, Sp.KGA", specialty: "Gigi Anak", initials: "AP", gradient: "from-rose-500 to-amber-400", rating: 4.9, avail: ["Sel", "Kam", "Sab"] },
  { id: "d3", name: "drg. Reza Mahendra, Sp.Perio", specialty: "Gusi & Implant", initials: "RM", gradient: "from-fuchsia-500 to-rose-700", rating: 4.8, avail: ["Sen", "Sel", "Kam"] },
  { id: "d4", name: "drg. Salsabila Karim, Sp.Pros", specialty: "Gigi Palsu & Estetik", initials: "SK", gradient: "from-pink-600 to-fuchsia-700", rating: 5.0, avail: ["Rab", "Jum", "Sab"] },
];

export const TIME_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

export const formatCurrency = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);

export const formatDate = (iso: string, opts?: Intl.DateTimeFormatOptions) =>
  new Date(iso).toLocaleDateString("id-ID", opts ?? { weekday: "long", day: "numeric", month: "long", year: "numeric" });

export const formatDateShort = (iso: string) =>
  new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

export const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 11) return { text: "Selamat Pagi", emoji: "🌅" };
  if (h < 15) return { text: "Selamat Siang", emoji: "☀️" };
  if (h < 19) return { text: "Selamat Sore", emoji: "🌇" };
  return { text: "Selamat Malam", emoji: "🌙" };
};
