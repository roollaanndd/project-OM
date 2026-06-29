"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import {
  formatCurrency,
  formatDateShort,
  MOCK_PAYMENT_METHODS,
} from "../mock-data";
import type { PaymentMethod, Transaction } from "../types";
import {
  ChevronLeft,
  CreditCard,
  Check,
  Clock,
  CheckCircle2,
  Receipt,
  Plus,
  ChevronRight,
  PartyPopper,
  Wallet,
  Copy,
  Lock,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function PaymentsScreen() {
  const { bills, transactions, payBill, addTransaction } = useAppStore();
  const [view, setView] = useState<"main" | "history" | "methods">("main");
  const [payingBillId, setPayingBillId] = useState<string | null>(null);

  const unpaidBills = bills.filter((b) => b.status !== "paid");
  const totalUnpaid = unpaidBills.reduce((sum, b) => sum + b.amount, 0);
  const totalPaid = transactions.reduce((sum, t) => sum + t.amount, 0);

  if (payingBillId) {
    const bill = bills.find((b) => b.id === payingBillId);
    if (bill) {
      return (
        <PaymentFlow
          bill={bill}
          onClose={() => setPayingBillId(null)}
          onSuccess={(method) => {
            payBill(bill.id);
            addTransaction({
              id: `trx-${Date.now()}`,
              description: bill.description,
              amount: bill.amount,
              date: new Date().toISOString().split("T")[0],
              method: method.label,
              status: "success",
              invoiceId: `INV/2025/06/${String(transactions.length + 1).padStart(4, "0")}`,
            });
            setPayingBillId(null);
            setView("main");
          }}
        />
      );
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-pink-50/95 px-5 py-4 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-xl font-extrabold text-pink-950">Pembayaran</h1>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-pink-700 shadow-sm" aria-label="Riwayat">
            <Receipt className="h-5 w-5" />
          </button>
        </div>

        {/* Tab pills */}
        <div className="mt-3 flex gap-2">
          {([
            { id: "main", label: "Tagihan" },
            { id: "history", label: "Riwayat" },
            { id: "methods", label: "Metode Bayar" },
          ] as const).map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-bold transition-colors",
                view === v.id
                  ? "bg-pink-600 text-white"
                  : "border border-pink-100 bg-white text-pink-950/60",
              )}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <AnimatePresence mode="wait">
          {view === "main" && (
            <motion.div
              key="main"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {/* Summary card */}
              <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-pink-600 via-rose-500 to-fuchsia-600 p-5 text-white shadow-soft-pink">
                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-12 translate-x-8 rounded-full bg-white/10" />
                <div className="relative">
                  <div className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    Total Tagihan Belum Dibayar
                  </div>
                  <div className="mt-1 font-display text-3xl font-extrabold">
                    {formatCurrency(totalUnpaid)}
                  </div>
                  <div className="mt-1 text-xs text-white/70">
                    {unpaidBills.length} tagihan aktif
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/20 pt-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-white/70">Total Dibayar</div>
                      <div className="mt-1 font-bold">{formatCurrency(totalPaid)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-white/70">Transaksi</div>
                      <div className="mt-1 font-bold">{transactions.length}x</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bills */}
              <h2 className="mt-6 mb-3 font-display text-base font-bold text-pink-950">
                Tagihan Aktif
              </h2>

              {unpaidBills.length > 0 ? (
                <div className="space-y-3">
                  {unpaidBills.map((bill, i) => {
                    const isOverdue = bill.status === "overdue";
                    return (
                      <motion.div
                        key={bill.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm"
                      >
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="text-sm font-bold text-pink-950">
                                {bill.description}
                              </div>
                              <div className="mt-0.5 text-xs text-pink-950/55">
                                {bill.service} · {formatDateShort(bill.date)}
                              </div>
                            </div>
                            <span className={cn(
                              "rounded-full px-2 py-0.5 text-[10px] font-bold",
                              isOverdue ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700",
                            )}>
                              {isOverdue ? "Terlambat" : "Belum Bayar"}
                            </span>
                          </div>

                          <div className="mt-3 flex items-end justify-between">
                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-pink-950/45">Jumlah</div>
                              <div className="font-display text-xl font-extrabold text-pink-950">
                                {formatCurrency(bill.amount)}
                              </div>
                              <div className="mt-0.5 text-[10px] text-pink-950/55">
                                Jatuh tempo {formatDateShort(bill.dueDate)}
                              </div>
                            </div>
                            <button
                              onClick={() => setPayingBillId(bill.id)}
                              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-5 py-2.5 text-xs font-bold text-white shadow-soft-pink active:scale-95"
                            >
                              <Zap className="h-3.5 w-3.5" />
                              Bayar
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div className="mt-4 text-sm font-bold text-pink-950">Semua tagihan lunas!</div>
                  <div className="mt-1 text-xs text-pink-950/55">Tidak ada tagihan aktif</div>
                </div>
              )}
            </motion.div>
          )}

          {view === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="mb-3 font-display text-base font-bold text-pink-950">
                Riwayat Transaksi
              </h2>

              <div className="space-y-2">
                {transactions.map((trx, i) => (
                  <TransactionItem key={trx.id} trx={trx} index={i} />
                ))}
              </div>
            </motion.div>
          )}

          {view === "methods" && (
            <motion.div
              key="methods"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-base font-bold text-pink-950">
                  Metode Pembayaran
                </h2>
                <button className="flex items-center gap-1 text-xs font-bold text-pink-600">
                  <Plus className="h-3.5 w-3.5" />
                  Tambah
                </button>
              </div>

              <div className="space-y-3">
                {MOCK_PAYMENT_METHODS.map((pm, i) => (
                  <motion.div
                    key={pm.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 rounded-2xl border border-pink-100 bg-white p-4 shadow-sm"
                  >
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${pm.gradient} text-white`}>
                      <PaymentMethodIcon type={pm.type} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-bold text-pink-950">{pm.label}</div>
                        {pm.isDefault && (
                          <span className="rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-bold text-pink-700">
                            Utama
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-pink-950/55">{pm.detail}</div>
                      {pm.balance !== undefined && (
                        <div className="mt-1 text-[11px] font-semibold text-emerald-600">
                          Saldo: {formatCurrency(pm.balance)}
                        </div>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 text-pink-950/30" />
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-pink-100 bg-pink-50/40 p-4">
                <div className="flex items-start gap-2">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
                  <div className="text-xs leading-relaxed text-pink-950/70">
                    Pembayaran Anda aman. OMDC menggunakan enkripsi 256-bit dan tersertifikasi
                    PCI-DSS Level 1. Kami tidak menyimpan data kartu kredit Anda.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TransactionItem({ trx, index }: { trx: Transaction; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="flex items-center gap-3 rounded-2xl border border-pink-100 bg-white p-3.5 shadow-sm"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
        <Check className="h-5 w-5" strokeWidth={3} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="truncate text-sm font-bold text-pink-950">{trx.description}</div>
        <div className="flex items-center gap-1.5 text-[11px] text-pink-950/55">
          <span>{formatDateShort(trx.date)}</span>
          <span className="text-pink-950/30">·</span>
          <span>{trx.method}</span>
        </div>
        <div className="text-[10px] text-pink-950/40">{trx.invoiceId}</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-bold text-pink-950">{formatCurrency(trx.amount)}</div>
        <div className="text-[10px] font-semibold text-emerald-600">Berhasil</div>
      </div>
    </motion.div>
  );
}

function PaymentMethodIcon({ type }: { type: PaymentMethod["type"] }) {
  if (type === "qris") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M3 3h7v7H3V3zm2 2v3h3V5H5zm9-2h7v7h-7V3zm2 2v3h3V5h-3zM3 14h7v7H3v-7zm2 2v3h3v-3H5zm9-2h2v2h-2v-2zm4 0h3v3h-2v2h-2v-3h1v-2zm-2 4h2v3h-2v-3zm4 0h1v3h-1v-3zm-2-2h1v1h-1v-1z" />
      </svg>
    );
  }
  if (type === "card") {
    return <CreditCard className="h-5 w-5" />;
  }
  return <Wallet className="h-5 w-5" />;
}

function PaymentFlow({
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
          <motion.div
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
          </motion.div>
        ))}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-[0_20px_50px_-10px_rgba(16,185,129,0.5)]"
        >
          <Check className="h-12 w-12" strokeWidth={3} />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex items-center gap-2 font-display text-2xl font-extrabold text-pink-950"
        >
          <PartyPopper className="h-6 w-6 text-emerald-500" />
          Pembayaran Berhasil!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-2 text-sm text-pink-950/60"
        >
          {formatCurrency(bill.amount)} berhasil dibayarkan
        </motion.p>
        <motion.div
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
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-pink-50/95 px-5 py-4 backdrop-blur-md">
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
