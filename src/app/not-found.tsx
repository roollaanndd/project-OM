import Link from "next/link";
import { Home, Search, CalendarCheck } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-6">
      <div className="w-full max-w-md text-center">
        <div className="relative inline-block">
          <div className="font-display text-[10rem] font-extrabold leading-none text-gradient-pink">
            404
          </div>
          <div className="absolute inset-x-0 -bottom-2 text-center text-7xl">🦷</div>
        </div>
        <h1 className="mt-6 font-display text-2xl font-extrabold text-pink-950">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-pink-950/65">
          Maaf, halaman yang Anda cari mungkin sudah dipindahkan atau tidak pernah ada. Jangan
          khawatir, senyum Anda masih aman bersama kami.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-5 py-3 text-sm font-bold text-white shadow-md"
          >
            <Home className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
          <Link
            href="/#booking"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-pink-200 bg-white px-5 py-3 text-sm font-bold text-pink-700"
          >
            <CalendarCheck className="h-4 w-4" />
            Buat Janji Temu
          </Link>
        </div>
        <div className="mt-6 text-xs text-pink-950/45">
          atau coba cari lewat menu navigasi di beranda
          <Search className="ml-1 inline h-3 w-3" />
        </div>
      </div>
    </div>
  );
}
