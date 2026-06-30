"use client";

import { useAppStore } from "@/lib/app-store";
import { MapPin, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BranchSelectorProps {
  variant?: "default" | "compact" | "card";
  className?: string;
}

/**
 * Reusable branch selector.
 * Connects to the global store so all booking surfaces (website, app, kiosk)
 * share the same selected branch.
 */
export function BranchSelector({ variant = "default", className }: BranchSelectorProps) {
  const { branches, selectedBranchId, setSelectedBranchId } = useAppStore();
  const selected = branches.find((b) => b.id === selectedBranchId) ?? branches[0];

  if (variant === "card") {
    return (
      <div className={cn("rounded-2xl border border-pink-200 bg-white p-4", className)}>
        <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-700">
          <MapPin className="h-3.5 w-3.5" />
          Pilih Cabang Klinik
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {branches.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setSelectedBranchId(b.id)}
              className={cn(
                "relative rounded-xl border-2 p-3 text-left transition-all",
                selectedBranchId === b.id
                  ? "border-pink-500 bg-pink-50 shadow-sm"
                  : "border-pink-100 hover:border-pink-300",
              )}
            >
              {selectedBranchId === b.id && (
                <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              )}
              <div className="pr-6">
                <div className="text-sm font-bold text-pink-950">{b.name}</div>
                <div className="mt-0.5 text-[11px] text-pink-950/55">{b.area}</div>
                <div className="mt-1 text-[10px] text-pink-950/45">{b.openHours}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <Select value={selectedBranchId} onValueChange={setSelectedBranchId}>
        <SelectTrigger className={cn("w-full", className)}>
          <MapPin className="mr-1.5 h-4 w-4 text-pink-500" />
          <SelectValue placeholder="Pilih cabang" />
        </SelectTrigger>
        <SelectContent>
          {branches.map((b) => (
            <SelectItem key={b.id} value={b.id}>
              <div className="flex flex-col">
                <span className="font-semibold">{b.name}</span>
                <span className="text-xs text-pink-950/55">{b.area}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  // default variant (full)
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="flex items-center gap-1.5 text-xs font-semibold text-pink-950">
        <MapPin className="h-3.5 w-3.5 text-pink-500" />
        Cabang Klinik
        <span className="text-pink-600">*</span>
      </label>
      <Select value={selectedBranchId} onValueChange={setSelectedBranchId}>
        <SelectTrigger className="rounded-xl border-pink-200 bg-white focus:ring-pink-500/30">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {branches.map((b) => (
            <SelectItem key={b.id} value={b.id}>
              <div className="flex flex-col">
                <span className="font-semibold">{b.name}</span>
                <span className="text-xs text-pink-950/55">{b.address}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selected && (
        <div className="rounded-lg bg-pink-50/60 px-3 py-2 text-[11px] text-pink-950/65">
          📍 {selected.address} · 📞 {selected.phone}
        </div>
      )}
    </div>
  );
}
