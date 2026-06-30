"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { formatCurrency } from "@/components/mobile/mock-data";
import {
  ChevronLeft,
  Search,
  CreditCard,
  Wallet,
  QrCode,
  Banknote,
  Check,
  X,
  Lock,

  PartyPopper,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "input" | "found" | "method" | "processing" | "success" | "not-found";

const PAYMENT_METHODS = [
  { id: "cash", label: "Tunai", icon: Banknote, color: "from-emerald-500 to-green-600", desc: "Bayar di loket kasir" },
  { id: "card", label: "Kartu Debit/Kredit", icon: CreditCard, color: "from-blue-500 to-cyan-600", desc: "Visa, Mastercard, BCA, Mandiri" },
  { id: "qris", label: "QRIS", icon: QrCode, color: "from-rose-500 to-red-600", desc: "Scan dengan e-wallet apapun" },
  { id: "ewallet", label: "E-Wallet", icon: Wallet, color: "from-purple-500 to-violet-700", desc: "GoPay, OVO, DANA, ShopeePay" },
];

export function KioskPayment({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) {
  const { bills, payBill, addTransaction, transactions } = useAppStore();
  const [code, setCode] = useState("");
  const [step, setStep] = useState<Step>("input");
  const [foundBill, setFoundBill] = useState<any>(null);
  const [method, setMethod] = useState<string>("");

  const handleLookup = () => {
    const normalized = code.trim().toLowerCase();
    // Find bill by ID or invoice
    const bill = bills.find(
      (b) => b.id.toLowerCase() === normalized || b.description.toLowerCase().includes(normalized),
    );

    if (bill && bill.status !== "paid") {
      setFoundBill(bill);
      setStep("found");
    } else if (normalized.match(/^(bill-)?\d+$/) || normalized.match(/^\d{3}$/)) {
      // Allow demo lookups
      const demoBill = bills.find((b) => b.status !== "paid");
      if (demoBill) {
        setFoundBill(demoBill);
        setStep("found");
        return;
      }
    }
    setStep("not-found");
  };

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => {
      // Process payment
      if (foundBill) {
        payBill(foundBill.id);
        addTransaction({
          id: `trx-${Date.now()}`,
          description: foundBill.description,
          amount: foundBill.amount,
          date: new Date().toISOString().split("T")[0],
          method: PAYMENT_METHODS.find((m) => m.id === method)?.label ?? "Tunai",
          status: "success",
          invoiceId: `INV/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, "0")}/${String(transactions.length + 1).padStart(4, "0")}`,
        });
      }
      setStep("success");
      setTimeout(() => {
        onComplete();
      }, 2500);
    }, 2000);
  };

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-pink-200 bg-white px-8 py-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-full bg-pink-100 px-4 py-2 text-sm font-bold text-pink-700 hover:bg-pink-200"
        >
          <ChevronLeft className="h-4 w-4" />
          Kembali
        </button>
        <div className="font-display text-base font-bold text-pink-950">Pembayaran Tagihan</div>
        <div className="w-24" />
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            {step === "input" && (
              <m.div key="i" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-700 text-white shadow-md">
                    <CreditCard className="h-7 w-7" />
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-extrabold text-pink-950">Cari Tagihan</h2>
                  <p className="mt-1 text-sm text-pink-950/55">Masukkan kode invoice atau nomor tagihan</p>
                </div>

                <div className="mt-6">
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLookup()}
                    placeholder="cth. bill-001 atau 001"
                    className="w-full rounded-2xl border-2 border-pink-200 bg-white px-5 py-4 text-center font-mono text-lg font-bold text-pink-950 placeholder:text-pink-950/30 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-200"
                  />
                  <button
                    onClick={handleLookup}
                    disabled={!code.trim()}
                    className={cn(
                      "mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold transition-all",
                      code.trim()
                        ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-md active:scale-95"
                        : "cursor-not-allowed bg-pink-100 text-pink-950/30",
                    )}
                  >
                    <Search className="h-5 w-5" />
                    Cari Tagihan
                  </button>
                  <div className="mt-4 rounded-2xl border border-pink-200 bg-pink-50 p-3 text-center text-xs text-pink-950/65">
                    💡 <span className="font-bold">Demo:</span> Coba kode <code className="rounded bg-white px-1.5 py-0.5 font-mono font-bold text-pink-700">bill-001</code> atau <code className="rounded bg-white px-1.5 py-0.5 font-mono font-bold text-pink-700">001</code>
                  </div>
                </div>
              </m.div>
            )}

            {step === "found" && foundBill && (
              <m.div key="f" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="text-center">
                  <m.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 16 }}
                    className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-md"
                  >
                    <Check className="h-7 w-7" strokeWidth={3} />
                  </m.div>
                  <h2 className="mt-3 font-display text-2xl font-extrabold text-pink-950">Tagihan Ditemukan</h2>
                  <p className="mt-1 text-sm text-pink-950/55">Konfirmasi detail tagihan</p>
                </div>

                <div className="mt-6 overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-md">
                  <div className="bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-4 text-white">
                    <div className="text-xs font-semibold uppercase tracking-wider text-white/80">Tagihan</div>
                    <div className="mt-1 font-display text-base font-bold">{foundBill.description}</div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between border-b border-pink-50 pb-3 text-sm">
                      <span className="text-pink-950/55">Layanan</span>
                      <span className="font-bold text-pink-950">{foundBill.service}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-pink-50 py-3 text-sm">
                      <span className="text-pink-950/55">Tanggal</span>
                      <span className="font-bold text-pink-950">{new Date(foundBill.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-pink-50 py-3 text-sm">
                      <span className="text-pink-950/55">Jatuh Tempo</span>
                      <span className="font-bold text-amber-600">{new Date(foundBill.dueDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-pink-950/45">Total Bayar</div>
                        <div className="font-display text-3xl font-extrabold text-pink-950">{formatCurrency(foundBill.amount)}</div>
                      </div>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">Belum Bayar</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep("method")}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-500 py-4 text-base font-bold text-white shadow-md active:scale-95"
                >
                  Lanjut ke Pembayaran
                </button>
              </m.div>
            )}

            {step === "method" && (
              <m.div key="m" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-md">
                    <Wallet className="h-7 w-7" />
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-extrabold text-pink-950">Pilih Metode Bayar</h2>
                  <p className="mt-1 text-sm text-pink-950/55">Total: <span className="font-bold text-pink-700">{formatCurrency(foundBill?.amount ?? 0)}</span></p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  {PAYMENT_METHODS.map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => setMethod(pm.id)}
                      className={cn(
                        "relative flex flex-col items-start gap-2 rounded-2xl border-2 bg-white p-5 text-left transition-all",
                        method === pm.id ? "border-pink-500 shadow-md ring-4 ring-pink-200" : "border-pink-100",
                      )}
                    >
                      {method === pm.id && (
                        <m.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-pink-500 text-white"
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </m.div>
                      )}
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${pm.color} text-white shadow-sm`}>
                        <pm.icon className="h-6 w-6" />
                      </div>
                      <div className="text-sm font-bold text-pink-950">{pm.label}</div>
                      <div className="text-xs text-pink-950/55">{pm.desc}</div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handlePay}
                  disabled={!method}
                  className={cn(
                    "mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold transition-all",
                    method
                      ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-md active:scale-95"
                      : "cursor-not-allowed bg-pink-100 text-pink-950/30",
                  )}
                >
                  <Lock className="h-5 w-5" />
                  Bayar {formatCurrency(foundBill?.amount ?? 0)}
                </button>
              </m.div>
            )}

            {step === "processing" && (
              <m.div key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16">
                <svg className="h-20 w-20 animate-spin text-pink-500" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <h2 className="mt-6 font-display text-xl font-bold text-pink-950">Memproses Pembayaran...</h2>
                <p className="mt-2 text-sm text-pink-950/55">Mohon tunggu, jangan tinggalkan kiosk</p>
              </m.div>
            )}

            {step === "success" && (
              <m.div
                key="s"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-8 text-center"
              >
                {/* Confetti */}
                {[...Array(8)].map((_, i) => (
                  <m.div
                    key={i}
                    className="absolute text-2xl"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: [50, 320],
                      x: [(i - 4) * 30, (i - 4) * 70],
                      rotate: [0, 360],
                    }}
                    transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatDelay: 0.5 }}
                    style={{ left: "50%", top: "10%" }}
                  >
                    {["🎉", "✨", "💰", "⭐", "💖", "🎈", "🌟", "🎊"][i]}
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
                <h2 className="mt-6 flex items-center gap-2 font-display text-2xl font-extrabold text-pink-950">
                  <PartyPopper className="h-6 w-6 text-emerald-500" />
                  Pembayaran Berhasil!
                </h2>
                <p className="mt-2 text-sm text-pink-950/60">
                  {formatCurrency(foundBill?.amount ?? 0)} telah dibayarkan
                </p>
                <div className="mt-6 rounded-2xl border border-pink-100 bg-white p-4 text-left text-xs shadow-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-pink-950/55">Metode</span>
                    <span className="font-bold text-pink-950">{PAYMENT_METHODS.find((m) => m.id === method)?.label}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-pink-950/55">Status</span>
                    <span className="font-bold text-emerald-600">Berhasil</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-pink-950/55">Waktu</span>
                    <span className="font-bold text-pink-950">{new Date().toLocaleTimeString("id-ID")}</span>
                  </div>
                </div>
              </m.div>
            )}

            {step === "not-found" && (
              <m.div key="nf" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                  <X className="h-7 w-7" />
                </div>
                <h2 className="mt-3 font-display text-2xl font-extrabold text-pink-950">Tagihan Tidak Ditemukan</h2>
                <p className="mt-1 text-sm text-pink-950/55">Kode tagihan salah atau sudah dibayar</p>
                <button
                  onClick={() => {
                    setStep("input");
                    setCode("");
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-3 text-sm font-bold text-white shadow-md"
                >
                  Coba Lagi
                </button>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
