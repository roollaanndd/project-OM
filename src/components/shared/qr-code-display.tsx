"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { QrCode, Download, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface QRCodeDisplayProps {
  /** QR type */
  type: "booking" | "payment" | "patient" | "queue";
  /** Unique ID (booking ID, payment ID, etc.) */
  id: string;
  /** Human-readable code (e.g., OMD-20250615-A3F2) */
  code?: string;
  /** Embedded data for offline use */
  data?: {
    service?: string;
    doctor?: string;
    date?: string;
    time?: string;
    patientName?: string;
    amount?: number;
    branch?: string;
  };
  /** Show download button */
  downloadable?: boolean;
  /** Size in pixels */
  size?: number;
  className?: string;
}

/**
 * Displays a QR code generated from the OMDC QR system.
 * Fetches QR from /api/qr/generate and displays it.
 */
export function QRCodeDisplay({
  type,
  id,
  code,
  data,
  downloadable = true,
  size = 240,
  className,
}: QRCodeDisplayProps) {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingCode, setBookingCode] = useState<string>(code ?? "");

  useEffect(() => {
    let cancelled = false;

    const generate = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/qr/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, id, code, data }),
        });
        const json = await res.json();
        if (!json.ok) throw new Error(json.error ?? "Failed to generate QR");
        if (!cancelled) {
          setQrUrl(json.data.qrCode);
          setBookingCode(json.data.code);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    generate();
    return () => {
      cancelled = true;
    };
  }, [type, id, code, JSON.stringify(data)]);

  const handleDownload = () => {
    if (!qrUrl) return;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `omdc-qr-${type}-${bookingCode}.png`;
    link.click();
  };

  if (loading) {
    return (
      <div
        className={cn("flex flex-col items-center gap-3", className)}
        style={{ width: size + 40 }}
      >
        <div
          className="flex items-center justify-center rounded-2xl border-2 border-pink-200 bg-pink-50"
          style={{ width: size, height: size }}
        >
          <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
        </div>
        <p className="text-xs text-pink-600">Membuat QR code...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn("flex flex-col items-center gap-3", className)}
        style={{ width: size + 40 }}
      >
        <div
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-red-200 bg-red-50"
          style={{ width: size, height: size }}
        >
          <p className="px-4 text-center text-xs text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={cn("flex flex-col items-center gap-3", className)}
      style={{ width: size + 40 }}
    >
      {/* QR Code */}
      <div className="relative rounded-2xl border-4 border-pink-200 bg-white p-3 shadow-soft-pink">
        <img
          src={qrUrl ?? ""}
          alt={`QR Code untuk ${type} ${bookingCode}`}
          width={size}
          height={size}
          className="rounded-lg"
        />
        {/* Success badge */}
        <m.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 240 }}
          className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md"
        >
          <CheckCircle2 className="h-5 w-5" />
        </m.div>
      </div>

      {/* Code label */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-700">
          <QrCode className="h-3.5 w-3.5" />
          {type === "booking" ? "Kode Booking" : type === "payment" ? "Kode Pembayaran" : type === "patient" ? "Kode Pasien" : "Kode Antrian"}
        </div>
        <div className="mt-1 font-mono text-lg font-extrabold text-pink-950">{bookingCode}</div>
      </div>

      {/* Download button */}
      {downloadable && (
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-1.5 rounded-full bg-pink-50 px-4 py-2 text-xs font-bold text-pink-700 transition-colors hover:bg-pink-100"
        >
          <Download className="h-3.5 w-3.5" />
          Download QR
        </button>
      )}

      {/* Instructions */}
      <p className="text-center text-[11px] leading-relaxed text-foreground/55">
        Tunjukkan QR ini di kiosk OMDC untuk check-in cepat.
        <br />
        QR berlaku selama 24 jam.
      </p>
    </m.div>
  );
}
