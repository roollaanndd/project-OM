import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan — OMDC",
  description: "Syarat dan ketentuan penggunaan layanan OMDC (Oktri Manessa Dental Clinic).",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <article className="mx-auto max-w-3xl px-5 py-28 lg:px-8">
        <h1 className="font-display text-4xl font-extrabold text-pink-950">Syarat & Ketentuan</h1>
        <p className="mt-2 text-sm text-pink-950/55">Terakhir diperbarui: 29 Juni 2025</p>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-foreground/75">
          <section>
            <h2 className="font-display text-xl font-bold text-pink-950">1. Penerimaan Syarat</h2>
            <p className="mt-2">Dengan menggunakan layanan OMDC, Anda menyetujui syarat dan ketentuan ini. Jika tidak setuju, mohon jangan menggunakan layanan kami.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-pink-950">2. Layanan</h2>
            <p className="mt-2">OMDC menyediakan layanan kesehatan gigi melalui website, aplikasi mobile, e-Kiosk, dan kunjungan langsung ke klinik. Layanan meliputi konsultasi, perawatan, booking online, pembayaran, dan rekam medis digital.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-pink-950">3. Janji Temu</h2>
            <ul className="mt-2 space-y-1.5 list-disc pl-5">
              <li>Janji temu bisa dibuat online atau langsung di klinik</li>
              <li>Keterlambatan lebih dari 15 menit dapat mengakibatkan jadwal diubah</li>
              <li>Pembatalan minimal 24 jam sebelum janji temu</li>
              <li>OMDC berhak menolak atau menunda layanan dengan alasan medis</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-pink-950">4. Pembayaran</h2>
            <p className="mt-2">Biaya perawatan dibayar sebelum atau setelah perawatan sesuai kesepakatan. Tersedia cicilan 0% hingga 12 bulan. Kebijakan refund untuk pembayaran yang berlebih akan diproses dalam 7 hari kerja.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-pink-950">5. Garansi</h2>
            <p className="mt-2">Implant gigi: garansi seumur hidup untuk screw implant. Veneer/mahkota: garansi 5 tahun. Perawatan lain: garansi sesuai ketentuan masing-masing. Garansi tidak berlaku untuk kerusakan akibat kecelakaan, kebiasaan buruk (menggigit benda keras), atau tidak mengikuti instruksi perawatan.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-pink-950">6. Tanggung Jawab</h2>
            <p className="mt-2">OMDC berkomitmen memberikan perawatan terbaik sesuai standar profesi. Namun, hasil perawatan dapat bervariasi tergantung kondisi masing-masing pasien. Pasien wajib memberikan informasi medis yang akurat dan mengikuti instruksi dokter.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-pink-950">7. Perubahan Syarat</h2>
            <p className="mt-2">OMDC berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan berlaku sejak dipublikasikan di website ini.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-pink-950">8. Kontak</h2>
            <p className="mt-2">Email: <Link href="mailto:halo@omdc-dental.id" className="text-pink-700 hover:underline">halo@omdc-dental.id</Link> · Telepon: +62 812-3456-7890</p>
          </section>
        </div>
      </article>
    </main>
  );
}
