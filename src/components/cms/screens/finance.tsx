"use client";

import { m } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { formatCurrency, formatDateShort } from "@/components/mobile/mock-data";
import {
  TrendingUp,
  Wallet,
  CreditCard,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
} from "lucide-react";

export function CmsFinance() {
  const { transactions, bills } = useAppStore();

  const totalRevenue = transactions.reduce((s, t) => s + t.amount, 0);
  const outstandingBills = bills.filter((b) => b.status !== "paid").reduce((s, b) => s + b.amount, 0);
  const avgTransaction = totalRevenue / transactions.length || 0;

  // Monthly data (mock)
  const monthlyData = [
    { month: "Jan", value: 245 },
    { month: "Feb", value: 268 },
    { month: "Mar", value: 312 },
    { month: "Apr", value: 285 },
    { month: "Mei", value: 298 },
    { month: "Jun", value: 348 },
    { month: "Jul", value: 285 },
  ];
  const maxVal = Math.max(...monthlyData.map((d) => d.value));

  const stats = [
    {
      label: "Total Pendapatan",
      value: formatCurrency(totalRevenue),
      change: "+12.5%",
      up: true,
      icon: Wallet,
      color: "from-emerald-500 to-teal-600",
    },
    {
      label: "Tagihan Outstanding",
      value: formatCurrency(outstandingBills),
      change: "2 tagihan",
      up: false,
      icon: Receipt,
      color: "from-amber-400 to-pink-500",
    },
    {
      label: "Rata-rata Transaksi",
      value: formatCurrency(avgTransaction),
      change: "+5.2%",
      up: true,
      icon: TrendingUp,
      color: "from-pink-500 to-rose-500",
    },
    {
      label: "Transaksi Sukses",
      value: `${transactions.length}x`,
      change: "100% success",
      up: true,
      icon: CreditCard,
      color: "from-fuchsia-500 to-pink-600",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <m.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-sm`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${s.up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {s.change}
              </div>
            </div>
            <div className="mt-3 font-display text-xl font-extrabold text-pink-950">{s.value}</div>
            <div className="text-xs text-pink-950/55">{s.label}</div>
          </m.div>
        ))}
      </div>

      {/* Revenue chart */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-base font-bold text-pink-950">Pendapatan Bulanan</h3>
            <p className="text-xs text-pink-950/55">Dalam jutaan Rupiah</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-full bg-pink-50 px-3 py-1.5 text-xs font-bold text-pink-700">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>

        <div className="mt-6 flex h-48 items-end justify-between gap-3">
          {monthlyData.map((d, i) => (
            <div key={d.month} className="group flex flex-1 flex-col items-center gap-2">
              <div className="relative flex w-full flex-1 items-end">
                <m.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.value / maxVal) * 100}%` }}
                  transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 220, damping: 22 }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-emerald-500 to-teal-400 transition-colors group-hover:from-emerald-600 group-hover:to-teal-500"
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-md bg-pink-950 px-2 py-0.5 text-[10px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Rp {d.value}jt
                  </div>
                </m.div>
              </div>
              <div className="text-[11px] font-semibold text-pink-950/60">{d.month}</div>
            </div>
          ))}
        </div>
      </m.div>

      {/* Outstanding bills */}
      {bills.filter((b) => b.status !== "paid").length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <h3 className="text-sm font-bold text-amber-900">⚠️ Tagihan Belum Dibayar</h3>
          <div className="mt-2 space-y-2">
            {bills.filter((b) => b.status !== "paid").map((b) => (
              <div key={b.id} className="flex items-center justify-between rounded-xl bg-white p-3">
                <div>
                  <div className="text-sm font-bold text-pink-950">{b.description}</div>
                  <div className="text-xs text-pink-950/55">Jatuh tempo: {formatDateShort(b.dueDate)}</div>
                </div>
                <div className="font-display text-base font-bold text-amber-700">{formatCurrency(b.amount)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transactions list */}
      <div className="rounded-2xl border border-pink-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-pink-100 p-4">
          <h3 className="font-display text-base font-bold text-pink-950">Riwayat Transaksi</h3>
          <button className="flex items-center gap-1.5 rounded-full border border-pink-200 px-3 py-1.5 text-xs font-bold text-pink-700">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-pink-100 bg-pink-50/40 text-[11px] uppercase tracking-wider text-pink-950/55">
                <th className="px-4 py-3">Invoice</th>
                <th className="px-4 py-3">Deskripsi</th>
                <th className="px-4 py-3">Metode</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3 text-right">Jumlah</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-pink-50 hover:bg-pink-50/40">
                  <td className="px-4 py-3 font-mono text-[11px] text-pink-950/55">{t.invoiceId}</td>
                  <td className="px-4 py-3 font-bold text-pink-950">{t.description}</td>
                  <td className="px-4 py-3 text-pink-950/70">{t.method}</td>
                  <td className="px-4 py-3 text-pink-950/55">{formatDateShort(t.date)}</td>
                  <td className="px-4 py-3 text-right font-bold text-pink-950">{formatCurrency(t.amount)}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                      Berhasil
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
