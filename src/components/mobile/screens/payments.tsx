"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
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

  CheckCircle2,
  Receipt,
  Plus,
  ChevronRight,
  PartyPopper,
  Wallet,

  Lock,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TransactionItem, PaymentMethodIcon } from "./payment-parts/transaction-item";
import { PaymentFlow } from "./payment-parts/payment-flow";

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
      <div className="sticky top-0 z-20 bg-white/95 px-5 py-4 backdrop-blur-md shadow-sm">
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
            <m.div
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
                      <m.div
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
                      </m.div>
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
            </m.div>
          )}

          {view === "history" && (
            <m.div
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
            </m.div>
          )}

          {view === "methods" && (
            <m.div
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
                  <m.div
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
                  </m.div>
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
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


