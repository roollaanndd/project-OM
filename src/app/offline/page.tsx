import Link from "next/link";
import { WifiOff, RefreshCw, Home } from "lucide-react";

export default function Offline() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-6">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-pink-100 bg-white p-8 text-center shadow-soft-pink">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-pink-500 text-white shadow-md">
          <WifiOff className="h-8 w-8" />
        </div>
        <h1 className="mt-5 font-display text-2xl font-extrabold text-pink-950">
          Anda Sedang Offline
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-pink-950/65">
          Tidak ada koneksi internet. Anda masih bisa melihat beberapa halaman yang sudah pernah
          dikunjungi. Hubungkan ke internet untuk pengalaman penuh.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-5 py-3 text-sm font-bold text-white shadow-md"
          >
            <RefreshCw className="h-4 w-4" />
            Coba Lagi
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-pink-200 bg-white px-5 py-3 text-sm font-bold text-pink-700"
          >
            <Home className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
        </div>

        <div className="mt-6 rounded-xl bg-pink-50/60 p-3 text-left text-[11px] leading-relaxed text-pink-950/65">
          💡 <span className="font-bold">Tips:</span> Pasang OMDC sebagai PWA di homescreen Anda
          untuk akses cepat dan dukungan offline yang lebih baik.
        </div>
      </div>
    </div>
  );
}
