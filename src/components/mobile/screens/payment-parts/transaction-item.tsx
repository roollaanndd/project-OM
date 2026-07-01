"use client";

import { m } from "framer-motion";
import { Check } from "lucide-react";
import { formatCurrency, formatDateShort } from "../../mock-data";
import type { Transaction } from "../../types";

export function TransactionItem({ trx, index }: { trx: Transaction; index: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
        <Check className="h-5 w-5" strokeWidth={3} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="truncate text-sm font-bold text-gray-900">{trx.description}</div>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
          <span>{formatDateShort(trx.date)}</span>
          <span className="text-gray-300">·</span>
          <span>{trx.method}</span>
        </div>
        <div className="text-[10px] text-gray-400">{trx.invoiceId}</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-bold text-gray-900">{formatCurrency(trx.amount)}</div>
        <div className="text-[10px] font-semibold text-emerald-600">Berhasil</div>
      </div>
    </m.div>
  );
}

export function PaymentMethodIcon({ type }: { type: string }) {
  if (type === "qris") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M3 3h7v7H3V3zm2 2v3h3V5H5zm9-2h7v7h-7V3zm2 2v3h3V5h-3zM3 14h7v7H3v-7zm2 2v3h3v-3H5zm9-2h2v2h-2v-2zm4 0h3v3h-2v2h-2v3h-1v-3h2v-2h-2v2h-1v-3h2v-2h2v-2zm-2 4h1v3h-1v-3zm4 0h1v3h-1v-3zm-2-4h1v1h-1v-1z" />
      </svg>
    );
  }
  if (type === "card") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12V7H5a2 2 0 010-4h14v4" />
      <path d="M3 5v14a2 2 0 002 2h16v-5" />
      <path d="M18 12a2 2 0 000 4h4v-4z" />
    </svg>
  );
}
