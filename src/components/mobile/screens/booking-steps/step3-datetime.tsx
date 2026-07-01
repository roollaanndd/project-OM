"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";

interface Step3Props {
  date: string;
  setDate: (d: string) => void;
  time: string;
  setTime: (t: string) => void;
}

const TIME_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

export function BookingStep3({ date, setDate, time, setTime }: Step3Props) {
  const today = new Date();
  const todayISO = today.toISOString().split("T")[0];

  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return {
      iso: d.toISOString().split("T")[0],
      day: d.toLocaleDateString("id-ID", { weekday: "short" }),
      dayNum: d.getDate(),
      month: d.toLocaleDateString("id-ID", { month: "short" }),
    };
  });

  return (
    <m.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      <h2 className="font-display text-xl font-bold text-gray-900">Pilih Tanggal</h2>
      <p className="mt-1 text-xs text-gray-500">14 hari ke depan tersedia</p>

      <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {days.map((d) => (
          <button key={d.iso} onClick={() => setDate(d.iso)} className={cn("flex h-20 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border-2 transition-all", date === d.iso ? "border-pink-500 bg-gradient-to-b from-pink-500 to-rose-500 text-white shadow-soft-pink" : "border-pink-100 bg-white text-gray-900")}>
            <span className={cn("text-[10px] font-bold uppercase", date === d.iso ? "text-white/80" : "text-gray-500")}>{d.day}</span>
            <span className="font-display text-xl font-extrabold">{d.dayNum}</span>
            <span className={cn("text-[10px] font-medium", date === d.iso ? "text-white/70" : "text-gray-400")}>{d.month}</span>
          </button>
        ))}
      </div>

      <h3 className="mt-6 font-display text-base font-bold text-gray-900">Pilih Waktu</h3>
      <p className="mt-1 text-xs text-gray-500">Slot tersedia untuk tanggal dipilih</p>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {TIME_SLOTS.map((t, i) => {
          // Only disable 1-2 slots for demo (not most of them)
          const unavailable = i === 6 || i === 8;
          return (
            <button key={t} disabled={unavailable || !date} onClick={() => setTime(t)} className={cn("rounded-xl border-2 py-2.5 text-xs font-bold transition-all", unavailable ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300 line-through" : time === t ? "border-pink-500 bg-pink-500 text-white shadow-sm" : "border-gray-100 bg-white text-gray-900 hover:border-pink-300")}>
              {t}
            </button>
          );
        })}
      </div>

      {!date && <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">Pilih tanggal terlebih dahulu untuk melihat slot waktu</div>}
    </m.div>
  );
}
