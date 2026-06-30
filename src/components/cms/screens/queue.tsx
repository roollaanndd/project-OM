"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import {

  Check,
  SkipForward,
  Play,

  Bell,
  Volume2,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function CmsQueue() {
  const { queue, updateQueueStatus, callNext } = useAppStore();
  // nowServing state removed (unused)
  const [autoAnnounce, setAutoAnnounce] = useState(true);

  const waiting = queue.filter((q) => q.status === "waiting");
  const serving = queue.filter((q) => q.status === "serving");
  const completed = queue.filter((q) => q.status === "completed");

  const handleCallNext = (counter: number) => {
    const next = callNext(counter);
    if (next) {
// setNowServing removed
    }
  };

  const handleComplete = (id: string) => {
    updateQueueStatus(id, "completed");
  };

  const handleSkip = (id: string) => {
    updateQueueStatus(id, "skipped");
  };

  return (
    <div className="space-y-4">
      {/* Control bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-pink-100 bg-white p-4 shadow-sm">
        <div>
          <h2 className="font-display text-lg font-bold text-pink-950">Monitor Antrian Real-Time</h2>
          <p className="text-xs text-pink-950/55">
            {waiting.length} menunggu · {serving.length} dilayani · {completed.length} selesai
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoAnnounce((v) => !v)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold",
              autoAnnounce ? "bg-emerald-50 text-emerald-600" : "bg-pink-50 text-pink-950/55",
            )}
          >
            <Volume2 className="h-3.5 w-3.5" />
            Auto-announce: {autoAnnounce ? "On" : "Off"}
          </button>
          <button className="flex items-center gap-1.5 rounded-full bg-pink-50 px-3 py-1.5 text-xs font-bold text-pink-700">
            <Maximize2 className="h-3.5 w-3.5" /> Fullscreen
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Counters (calling) */}
        <div className="space-y-3 lg:col-span-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-pink-950/55">Loket Aktif</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[1, 2, 3].map((counter) => {
              const servingHere = serving.find((s) => s.counter === counter);
              return (
                <motion.div
                  key={counter}
                  layout
                  className={cn(
                    "rounded-2xl border-2 p-4 shadow-sm",
                    servingHere ? "border-emerald-300 bg-emerald-50/60" : "border-pink-100 bg-white",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold uppercase tracking-wider text-pink-950/55">
                      Loket {counter}
                    </div>
                    <span className={cn(
                      "flex h-2 w-2 rounded-full",
                      servingHere ? "bg-emerald-500 animate-pulse" : "bg-pink-300",
                    )} />
                  </div>

                  {servingHere ? (
                    <div className="mt-3">
                      <div className="font-display text-4xl font-extrabold text-emerald-600">
                        {servingHere.number}
                      </div>
                      <div className="mt-1 truncate text-xs font-bold text-pink-950">{servingHere.patientName}</div>
                      <div className="truncate text-[10px] text-pink-950/55">{servingHere.service}</div>
                      <div className="mt-3 flex gap-1.5">
                        <button
                          onClick={() => handleComplete(servingHere.id)}
                          className="flex-1 rounded-lg bg-emerald-500 py-1.5 text-[10px] font-bold text-white hover:bg-emerald-600"
                        >
                          <Check className="mx-auto h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleSkip(servingHere.id)}
                          className="flex-1 rounded-lg bg-amber-500 py-1.5 text-[10px] font-bold text-white hover:bg-amber-600"
                        >
                          <SkipForward className="mx-auto h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <div className="font-display text-4xl font-extrabold text-pink-200">--</div>
                      <div className="mt-1 text-xs text-pink-950/45">Loket siap</div>
                      <button
                        onClick={() => handleCallNext(counter)}
                        disabled={waiting.length === 0}
                        className={cn(
                          "mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-[11px] font-bold transition-colors",
                          waiting.length === 0
                            ? "cursor-not-allowed bg-pink-100 text-pink-950/30"
                            : "bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-sm hover:from-pink-700 hover:to-rose-600",
                        )}
                      >
                        <Play className="h-3.5 w-3.5" />
                        Panggil Berikutnya
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Currently serving big display */}
          {serving.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 p-5 text-white shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    Sekarang Dipanggil
                  </div>
                  <div className="mt-1 font-display text-5xl font-extrabold">
                    {serving[0].number}
                  </div>
                  <div className="mt-1 text-sm font-bold">{serving[0].patientName}</div>
                  <div className="text-xs text-white/70">{serving[0].service}</div>
                </div>
                <Bell className="h-12 w-12 text-white/40" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Waiting queue */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-pink-950/55">
            Antrian Menunggu ({waiting.length})
          </h3>
          <div className="max-h-[600px] space-y-2 overflow-y-auto rounded-2xl border border-pink-100 bg-white p-3 shadow-sm">
            <AnimatePresence>
              {waiting.map((q, i) => (
                <motion.div
                  key={q.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border p-2",
                    i === 0 ? "border-pink-300 bg-pink-50/60" : "border-pink-50",
                  )}
                >
                  <div className={cn(
                    "flex h-10 w-14 items-center justify-center rounded-lg font-display text-sm font-extrabold",
                    i === 0 ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-700",
                  )}>
                    {q.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="truncate text-xs font-bold text-pink-950">{q.patientName}</div>
                    <div className="truncate text-[10px] text-pink-950/55">{q.service}</div>
                  </div>
                  <span className={cn(
                    "rounded-full px-1.5 py-0.5 text-[9px] font-bold",
                    q.source === "booking" ? "bg-fuchsia-100 text-fuchsia-700" : "bg-amber-100 text-amber-700",
                  )}>
                    {q.source === "booking" ? "Booking" : "Walk-in"}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            {waiting.length === 0 && (
              <div className="py-8 text-center text-xs text-pink-950/50">
                <Check className="mx-auto mb-2 h-8 w-8 text-emerald-400" />
                Tidak ada antrian menunggu
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Completed today */}
      <div className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm">
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-pink-950/55">
          Selesai Hari Ini ({completed.length})
        </h3>
        <div className="flex flex-wrap gap-2">
          {completed.map((q) => (
            <div key={q.id} className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs">
              <Check className="h-3 w-3 text-emerald-600" />
              <span className="font-bold text-emerald-700">{q.number}</span>
              <span className="text-pink-950/55">· {q.patientName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
