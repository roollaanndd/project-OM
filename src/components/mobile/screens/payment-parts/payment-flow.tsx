"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Check, Lock, Loader2, PartyPopper, X, ChevronLeft } from "lucide-react";
import { useAppStore } from "@/lib/app-store";
import { formatCurrency, MOCK_PAYMENT_METHODS } from "../../mock-data";
import { cn } from "@/lib/utils";
import { TransactionItem, PaymentMethodIcon } from "./transaction-item";
import type { PaymentMethod } from "../../types";

export function PaymentFlow({
  bill,
  onClose,
  onSuccess,
}: {
  bill: { id: string; description: string; amount: number; dueDate: string };
  onClose: () => void;
  onSuccess: (method: PaymentMethod) => void;
}) {
  const [selected, setSelected] = useState<string>(MOCK_PAYMENT_METHODS[0].id);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      const method = MOCK_PAYMENT_METHODS.find((m) => m.id === selected)!;
      setTimeout(() => {
        onSuccess(method);
      }, 1800);
    }, 1500);
  };

  if (success) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Confetti */}
        {[...Array(6)].map((_, i) => (
          <m.div
            key={i}
            className="absolute text-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: [0, 1, 0],
              y: [50, 280],
              x: [(i - 3) * 25, (i - 3) * 50],
              rotate: [0, 360],
            }}
            transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatDelay: 0.5 }}
            style={{ left: "50%", top: "20%" }}
          >
            {["🎉", "✨", "💰", "⭐", "💖", "🎈"][i]}
          </m.div>
        ))}

        <m.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-[0_20px_50px_-10px_rgba(16,185,129,0.5)]"
        >
          <Check className="h-12 w-12" strokeWidth={3} />
        </m.div>
        <m.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex items-center gap-2 font-display text-2xl font-extrabold text-pink-950"
        >
          <PartyPopper className="h-6 w-6 text-emerald-500" />
          Pembayaran Berhasil!
        </m.h2>
        <m.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-2 text-sm text-pink-950/60"
        >
          {formatCurrency(bill.amount)} berhasil dibayarkan
        </m.p>
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 w-full max-w-xs rounded-2xl border border-pink-100 bg-white p-4 text-left text-xs"
        >
          <div className="flex justify-between py-1">
            <span className="text-pink-950/55">Pembayaran</span>
            <span className="font-semibold text-pink-950">{bill.description}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-pink-950/55">Jumlah</span>
            <span className="font-bold text-pink-950">{formatCurrency(bill.amount)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-pink-950/55">Metode</span>
            <span className="font-semibold text-pink-950">
              {MOCK_PAYMENT_METHODS.find((m) => m.id === selected)?.label}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-pink-950/55">Status</span>
            <span className="font-bold text-emerald-600">Berhasil</span>
          </div>
        </m.div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 px-5 py-4 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-pink-700 shadow-sm"
            aria-label="Tutup"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="font-display text-base font-bold text-pink-950">Bayar Tagihan</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Bill summary */}
        <div className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold text-pink-950/55">Tagihan</div>
          <div className="mt-1 font-display text-base font-bold text-pink-950">{bill.description}</div>
          <div className="mt-3 flex items-end justify-between border-t border-pink-50 pt-3">
            <div className="text-xs text-pink-950/55">Total</div>
            <div className="font-display text-2xl font-extrabold text-pink-950">
              {formatCurrency(bill.amount)}
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <h3 className="mt-6 mb-3 font-display text-base font-bold text-pink-950">
          Pilih Metode Pembayaran
        </h3>

        <div className="space-y-2">
          {MOCK_PAYMENT_METHODS.map((pm) => (
            <button
              key={pm.id}
              onClick={() => setSelected(pm.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl border-2 bg-white p-4 text-left transition-all",
                selected === pm.id ? "border-pink-500 shadow-soft-pink" : "border-pink-100",
              )}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${pm.gradient} text-white`}>
                <PaymentMethodIcon type={pm.type} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-pink-950">{pm.label}</div>
                {pm.balance !== undefined ? (
                  <div className="text-[11px] text-emerald-600">
                    Saldo: {formatCurrency(pm.balance)}
                  </div>
                ) : (
                  <div className="text-[11px] text-pink-950/55">{pm.detail}</div>
                )}
              </div>
              <div className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors",
                selected === pm.id ? "border-pink-500 bg-pink-500" : "border-pink-200",
              )}>
                {selected === pm.id && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-pink-50/60 p-3 text-xs text-pink-950/65">
          <Lock className="h-3.5 w-3.5 shrink-0 text-pink-500" />
          Transaksi aman & terenkripsi. Pembayaran akan diproses instan.
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-pink-100 bg-white/95 px-5 py-3 backdrop-blur-md">
        <button
          onClick={handlePay}
          disabled={processing}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-base font-bold transition-all",
            processing
              ? "cursor-wait bg-pink-300 text-white"
              : "bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-soft-pink active:scale-[0.98]",
          )}
        >
          {processing ? (
            <>
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Memproses...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              Bayar {formatCurrency(bill.amount)}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
