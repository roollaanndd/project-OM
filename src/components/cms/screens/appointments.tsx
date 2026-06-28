"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { formatCurrency, formatDate } from "@/components/mobile/mock-data";
import { Calendar, Clock, Check, X, Plus, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function CmsAppointments() {
  const { appointments, updateAppointmentStatus, queue } = useAppStore();

  const today = new Date();
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return {
      iso: d.toISOString().split("T")[0],
      day: d.toLocaleDateString("id-ID", { weekday: "short" }),
      dayNum: d.getDate(),
      isToday: i === 0,
    };
  });

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      upcoming: "bg-amber-50 text-amber-700",
      completed: "bg-emerald-50 text-emerald-700",
      cancelled: "bg-red-50 text-red-700",
    };
    return map[status] ?? "bg-pink-50 text-pink-700";
  };

  const statusLabel = (status: string) => {
    const map: Record<string, string> = {
      upcoming: "Akan Datang",
      completed: "Selesai",
      cancelled: "Dibatalkan",
    };
    return map[status] ?? status;
  };

  return (
    <div className="space-y-4">
      {/* Calendar week view */}
      <div className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-pink-950">
            {today.toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
          </h2>
          <div className="flex gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-50 text-pink-700 hover:bg-pink-100">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-50 text-pink-700 hover:bg-pink-100">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-7 gap-2">
          {weekDays.map((d) => {
            const dayApts = appointments.filter((a) => a.date === d.iso);
            return (
              <div
                key={d.iso}
                className={cn(
                  "rounded-xl border p-2",
                  d.isToday ? "border-pink-300 bg-pink-50" : "border-pink-100",
                )}
              >
                <div className={cn(
                  "text-[10px] font-bold uppercase",
                  d.isToday ? "text-pink-700" : "text-pink-950/55",
                )}>
                  {d.day}
                </div>
                <div className={cn(
                  "font-display text-lg font-extrabold",
                  d.isToday ? "text-pink-700" : "text-pink-950",
                )}>
                  {d.dayNum}
                </div>
                <div className="mt-1 space-y-0.5">
                  {dayApts.slice(0, 2).map((a) => (
                    <div key={a.id} className="rounded bg-pink-100 px-1 py-0.5 text-[9px] font-bold text-pink-700">
                      {a.time} {a.service.split(" ")[0]}
                    </div>
                  ))}
                  {dayApts.length > 2 && (
                    <div className="text-[9px] text-pink-950/50">+{dayApts.length - 2}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between rounded-2xl border border-pink-100 bg-white p-3 shadow-sm">
        <div className="flex gap-2">
          {["Semua", "Akan Datang", "Selesai", "Dibatalkan"].map((f, i) => (
            <button
              key={f}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-bold",
                i === 0 ? "bg-pink-600 text-white" : "bg-pink-50 text-pink-700",
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-3 py-1.5 text-xs font-bold text-white">
          <Plus className="h-3.5 w-3.5" /> Buat Janji
        </button>
      </div>

      {/* Appointments list */}
      <div className="space-y-2">
        {appointments.map((apt, i) => {
          const linkedQueue = queue.find((q) => q.bookingId === apt.id);
          return (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-3 rounded-2xl border border-pink-100 bg-white p-4 shadow-sm"
            >
              {/* Date */}
              <div className="flex flex-col items-center justify-center rounded-xl bg-pink-100 px-3 py-2 text-pink-700">
                <div className="text-[10px] font-bold uppercase">
                  {new Date(apt.date).toLocaleDateString("id-ID", { month: "short" })}
                </div>
                <div className="font-display text-xl font-extrabold leading-none">
                  {new Date(apt.date).getDate()}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="truncate font-display text-sm font-bold text-pink-950">{apt.service}</div>
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", statusBadge(apt.status))}>
                    {statusLabel(apt.status)}
                  </span>
                </div>
                <div className="mt-0.5 truncate text-xs text-pink-950/55">{apt.doctor}</div>
                <div className="mt-1 flex items-center gap-3 text-[11px] text-pink-950/55">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {apt.time} · {apt.duration}
                  </span>
                  <span>{formatCurrency(apt.price)}</span>
                  {linkedQueue && (
                    <span className="rounded-full bg-fuchsia-50 px-2 py-0.5 text-[9px] font-bold text-fuchsia-700">
                      Antrian: {linkedQueue.number}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              {apt.status === "upcoming" && (
                <div className="flex gap-1">
                  <button
                    onClick={() => updateAppointmentStatus(apt.id, "completed")}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                    aria-label="Tandai selesai"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => updateAppointmentStatus(apt.id, "cancelled")}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                    aria-label="Batalkan"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
