"use client";

import { create } from "zustand";
import type { ScreenTab, User, Appointment, MedicalRecord, Bill, Transaction } from "@/components/mobile/types";
import {
  MOCK_USER,
  MOCK_APPOINTMENTS,
  MOCK_MEDICAL_RECORDS,
  MOCK_BILLS,
  MOCK_TRANSACTIONS,
} from "@/components/mobile/mock-data";

export type ViewMode = "hub" | "website" | "app";

interface AppState {
  // Top-level view
  view: ViewMode;

  // App auth
  isAuthenticated: boolean;

  // App navigation
  activeTab: ScreenTab;
  previousTab: ScreenTab | null;

  // Data
  user: User | null;
  appointments: Appointment[];
  records: MedicalRecord[];
  bills: Bill[];
  transactions: Transaction[];

  // Selected patient (for booking)
  selectedPatientId: string;

  // Actions
  setView: (v: ViewMode) => void;
  setAuthenticated: (v: boolean) => void;
  setActiveTab: (t: ScreenTab) => void;
  setSelectedPatientId: (id: string) => void;
  addAppointment: (a: Appointment) => void;
  cancelAppointment: (id: string) => void;
  payBill: (id: string) => void;
  addTransaction: (t: Transaction) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  view: "hub",
  isAuthenticated: false,
  activeTab: "home",
  previousTab: null,
  user: MOCK_USER,
  appointments: MOCK_APPOINTMENTS,
  records: MOCK_MEDICAL_RECORDS,
  bills: MOCK_BILLS,
  transactions: MOCK_TRANSACTIONS,
  selectedPatientId: "u-001",

  setView: (v) => set({ view: v }),
  setAuthenticated: (v) => set({ isAuthenticated: v }),
  setActiveTab: (t) => set((s) => ({ previousTab: s.activeTab, activeTab: t })),
  setSelectedPatientId: (id) => set({ selectedPatientId: id }),
  addAppointment: (a) => set((s) => ({ appointments: [a, ...s.appointments] })),
  cancelAppointment: (id) =>
    set((s) => ({
      appointments: s.appointments.map((a) =>
        a.id === id ? { ...a, status: "cancelled" as const } : a
      ),
    })),
  payBill: (id) =>
    set((s) => ({
      bills: s.bills.map((b) =>
        b.id === id ? { ...b, status: "paid" as const } : b
      ),
    })),
  addTransaction: (t) =>
    set((s) => ({ transactions: [t, ...s.transactions] })),
  reset: () =>
    set({
      view: "hub",
      isAuthenticated: false,
      activeTab: "home",
      previousTab: null,
      user: MOCK_USER,
      appointments: MOCK_APPOINTMENTS,
      records: MOCK_MEDICAL_RECORDS,
      bills: MOCK_BILLS,
      transactions: MOCK_TRANSACTIONS,
      selectedPatientId: "u-001",
    }),
}));
