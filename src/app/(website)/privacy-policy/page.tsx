import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — OMDC",
  description:
    "Kebijakan privasi OMDC (Oktri Manessa Dental Clinic). Pelajari bagaimana kami melindungi data pribadi pasien.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <article className="mx-auto max-w-3xl px-5 py-28 lg:px-8">
        <h1 className="font-display text-4xl font-extrabold text-pink-950">Kebijakan Privasi</h1>
        <p className="mt-2 text-sm text-pink-950/55">Terakhir diperbarui: 29 Juni 2025</p>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-foreground/75">
          <section>
            <h2 className="font-display text-xl font-bold text-pink-950">1. Pendahuluan</h2>
            <p className="mt-2">
              OMDC (Oktri Manessa Dental Clinic) berkomitmen melindungi privasi Anda. Kebijakan ini menjelaskan
              bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda saat menggunakan website,
              aplikasi mobile, e-Kiosk, dan layanan kami.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-pink-950">2. Data yang Kami Kumpulkan</h2>
            <ul className="mt-2 space-y-1.5 list-disc pl-5">
              <li>Data identitas: nama, tanggal lahir, jenis kelamin</li>
              <li>Data kontak: nomor telepon, email, alamat</li>
              <li>Data medis: riwayat kesehatan gigi, diagnosis, rencana perawatan</li>
              <li>Data transaksi: pembayaran, metode pembayaran, riwayat billing</li>
              <li>Data penggunaan: halaman dikunjungi, durasi sesi, perangkat</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-pink-950">3. Penggunaan Data</h2>
            <p className="mt-2">Data Anda digunakan untuk:</p>
            <ul className="mt-2 space-y-1.5 list-disc pl-5">
              <li>Memberikan layanan kesehatan gigi yang tepat</li>
              <li>Menjadwalkan janji temu dan pengingat</li>
              <li>Memproses pembayaran</li>
              <li>Mengirim informasi promosi (dengan persetujuan)</li>
              <li>Meningkatkan kualitas layanan</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-pink-950">4. Pembagian Data</h2>
            <p className="mt-2">
              Kami tidak menjual data Anda. Data hanya dibagikan kepada: penyedia layanan tepercaya (payment gateway,
              SMS gateway), instansi pemerintah jika diwajibkan hukum, dan asuransi (dengan persetujuan).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-pink-950">5. Keamanan Data</h2>
            <p className="mt-2">
              Kami menerapkan enkripsi SSL 256-bit, parameterized queries (anti SQL injection), validasi input,
              rate limiting, dan audit log. Akses data terbatas pada staf yang berwenang.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-pink-950">6. Hak Anda</h2>
            <ul className="mt-2 space-y-1.5 list-disc pl-5">
              <li>Mengakses data pribadi Anda</li>
              <li>Meminta koreksi data yang tidak akurat</li>
              <li>Meminta penghapusan data</li>
              <li>Berhenti berlangganan komunikasi marketing</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-pink-950">7. Cookie</h2>
            <p className="mt-2">
              Kami menggunakan cookie untuk: fungsi website (wajib), analitik (Google Analytics), dan iklan
              (Meta Pixel, Google Ads). Anda bisa mengatur preferensi cookie di browser.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-pink-950">8. Kontak</h2>
            <p className="mt-2">
              Untuk pertanyaan tentang privasi, hubungi: <br />
              Email: <Link href="mailto:privacy@omdc-dental.id" className="text-pink-700 hover:underline">privacy@omdc-dental.id</Link><br />
              Telepon: +62 812-3456-7890
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
