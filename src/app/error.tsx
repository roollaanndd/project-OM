"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error tracking service (Sentry, etc.) in production
    console.error("[OMDC Error Boundary]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="w-full max-w-md overflow-hidden rounded-3xl border border-pink-100 bg-white p-8 text-center shadow-soft-pink"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 16 }}
          className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-pink-500 text-white shadow-md"
        >
          <AlertTriangle className="h-8 w-8" />
        </motion.div>
        <h1 className="mt-5 font-display text-2xl font-extrabold text-pink-950">
          Oops! Ada yang salah
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-pink-950/65">
          Maaf, terjadi kesalahan tak terduga. Tim kami sudah diberi notifikasi otomatis. Coba muat
          ulang halaman, atau kembali ke beranda.
        </p>

        {process.env.NODE_ENV === "development" && (
          <pre className="mt-4 overflow-x-auto rounded-xl bg-pink-50 p-3 text-left text-[11px] text-pink-950/70">
            {error.message}
            {error.digest ? `\nDigest: ${error.digest}` : ""}
          </pre>
        )}

        <div className="mt-6 flex gap-2">
          <button
            onClick={reset}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-5 py-3 text-sm font-bold text-white shadow-md"
          >
            <RefreshCw className="h-4 w-4" />
            Coba Lagi
          </button>
          <a
            href="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-pink-200 bg-white px-5 py-3 text-sm font-bold text-pink-700"
          >
            <Home className="h-4 w-4" />
            Beranda
          </a>
        </div>
      </motion.div>
    </div>
  );
}
