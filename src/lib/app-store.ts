"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  User,
  Appointment,
  MedicalRecord,
  Bill,
  Transaction,
} from "@/components/mobile/types";
import {
  MOCK_USER,
  MOCK_APPOINTMENTS,
  MOCK_MEDICAL_RECORDS,
  MOCK_BILLS,
  MOCK_TRANSACTIONS,
} from "@/components/mobile/mock-data";

export type ViewMode = "hub" | "website" | "app" | "kiosk" | "cms";

export type CmsRole = "admin" | "doctor" | "receptionist" | "finance";

export type QueueStatus = "waiting" | "serving" | "completed" | "skipped";

export type QueueSource = "walk-in" | "booking";

export interface QueueEntry {
  id: string;
  number: string; // e.g., "A-024"
  patientName: string;
  patientPhone?: string;
  service: string;
  serviceIcon: string;
  doctor?: string;
  doctorInitials?: string;
  doctorGradient?: string;
  status: QueueStatus;
  source: QueueSource;
  bookingId?: string;
  checkInTime: string; // ISO
  calledTime?: string;
  completedTime?: string;
  counter?: number; // loket
}

export interface WalkInPatient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  age?: number;
  address?: string;
  isFirstVisit: boolean;
  registeredAt: string;
}

export interface CmsUser {
  id: string;
  name: string;
  email: string;
  role: CmsRole;
  initials: string;
  gradient: string;
  lastActive: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  initials: string;
  gradient: string;
  rating: number;
  avail: string[];
  status: "available" | "busy" | "off";
  patientsToday: number;
  photo?: string;
  branchIds?: string[];
}

export interface ClinicSettings {
  clinicName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  logoGradient: string;
  primaryColor: string;
  openHours: string;
  totalCounter: number;
}

export interface Branch {
  id: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  openHours: string;
  mapUrl?: string;
  isPrimary?: boolean;
}

export interface DoctorWithPhoto {
  id: string;
  name: string;
  specialty: string;
  initials: string;
  gradient: string;
  rating: number;
  avail: string[];
  status: "available" | "busy" | "off";
  patientsToday: number;
  photo?: string; // URL to doctor photo
  branchIds?: string[]; // which branches this doctor works at
}

export type AppVersion = "v1.5.0" | "v2.0.0";

interface AppState {
  // Top-level view
  view: ViewMode;

  // App version (for rollback capability)
  appVersion: AppVersion;

  // App auth
  isAuthenticated: boolean;

  // App navigation
  activeTab: "home" | "booking" | "records" | "payments" | "profile";
  previousTab: string | null;

  // CMS auth
  cmsAuthenticated: boolean;
  cmsUser: CmsUser | null;

  // Data — shared across all surfaces
  user: User | null;
  appointments: Appointment[];
  records: MedicalRecord[];
  bills: Bill[];
  transactions: Transaction[];

  // New shared data
  queue: QueueEntry[];
  walkInPatients: WalkInPatient[];
  doctors: Doctor[];
  branches: Branch[];
  cmsUsers: CmsUser[];
  clinicSettings: ClinicSettings;

  // Selected patient (for booking)
  selectedPatientId: string;
  selectedBranchId: string;

  // Toast notification system (global)
  toasts: { id: string; title: string; desc?: string; variant: "default" | "success" | "error" }[];

  // Actions
  setView: (v: ViewMode) => void;
  setAppVersion: (v: AppVersion) => void;
  setAuthenticated: (v: boolean) => void;
  setActiveTab: (t: AppState["activeTab"]) => void;
  setSelectedPatientId: (id: string) => void;
  setSelectedBranchId: (id: string) => void;

  addAppointment: (a: Appointment) => void;
  cancelAppointment: (id: string) => void;
  updateAppointmentStatus: (id: string, status: Appointment["status"]) => void;
  payBill: (id: string) => void;
  addTransaction: (t: Transaction) => void;

  // Queue actions
  addQueueEntry: (e: Omit<QueueEntry, "id" | "number" | "checkInTime">) => QueueEntry;
  updateQueueStatus: (id: string, status: QueueStatus, counter?: number) => void;
  callNext: (counter: number) => QueueEntry | null;

  // Walk-in patient
  addWalkInPatient: (p: Omit<WalkInPatient, "id" | "registeredAt">) => WalkInPatient;

  // CMS
  setCmsAuth: (v: boolean, user?: CmsUser) => void;
  updateDoctorStatus: (id: string, status: Doctor["status"]) => void;
  updateDoctor: (id: string, updates: Partial<Doctor>) => void;
  updateClinicSettings: (s: Partial<ClinicSettings>) => void;
  updateBranch: (id: string, updates: Partial<Branch>) => void;

  // Toasts
  pushToast: (t: { title: string; desc?: string; variant?: "default" | "success" | "error" }) => void;
  removeToast: (id: string) => void;

  reset: () => void;
}

const INITIAL_DOCTORS: Doctor[] = [
  { id: "d1", name: "drg. Oktri Manessa, Sp.Ort", specialty: "Orthodontist", initials: "OM", gradient: "from-pink-500 to-fuchsia-600", rating: 4.9, avail: ["Sen", "Rab", "Jum"], status: "available", patientsToday: 8, photo: "/doctors/doctor-1.jpg", branchIds: ["b1", "b2"] },
  { id: "d2", name: "drg. Adelia Putri, Sp.KGA", specialty: "Gigi Anak", initials: "AP", gradient: "from-rose-500 to-amber-400", rating: 4.9, avail: ["Sel", "Kam", "Sab"], status: "busy", patientsToday: 6, photo: "/doctors/doctor-2.jpg", branchIds: ["b1", "b3"] },
  { id: "d3", name: "drg. Reza Mahendra, Sp.Perio", specialty: "Gusi & Implant", initials: "RM", gradient: "from-fuchsia-500 to-rose-700", rating: 4.8, avail: ["Sen", "Sel", "Kam"], status: "available", patientsToday: 5, photo: "/doctors/doctor-3.jpg", branchIds: ["b1"] },
  { id: "d4", name: "drg. Salsabila Karim, Sp.Pros", specialty: "Gigi Palsu & Estetik", initials: "SK", gradient: "from-pink-600 to-fuchsia-700", rating: 5.0, avail: ["Rab", "Jum", "Sab"], status: "off", patientsToday: 0, photo: "/doctors/doctor-4.jpg", branchIds: ["b2", "b3"] },
  { id: "d5", name: "drg. Bayu Pratama", specialty: "Dokter Gigi Umum", initials: "BP", gradient: "from-rose-500 to-pink-600", rating: 4.7, avail: ["Sen", "Sel", "Rab", "Kam", "Jum"], status: "available", patientsToday: 12, photo: "/doctors/doctor-3.jpg", branchIds: ["b1", "b2", "b3"] },
  { id: "d6", name: "drg. Intan Permata", specialty: "Dokter Gigi Umum", initials: "IP", gradient: "from-fuchsia-500 to-pink-600", rating: 4.8, avail: ["Sel", "Rab", "Kam", "Jum", "Sab"], status: "available", patientsToday: 9, photo: "/doctors/doctor-2.jpg", branchIds: ["b1", "b2"] },
];

const INITIAL_BRANCHES: Branch[] = [
  {
    id: "b1",
    name: "OMDC Bekasi Selatan",
    area: "Bekasi Selatan",
    address: "Jl. Melati Raya No. 17, Bekasi Selatan, Jawa Barat 17141",
    phone: "+62 812-3456-7890",
    openHours: "Senin – Sabtu: 09.00 – 21.00 · Minggu: 10.00 – 16.00",
    isPrimary: true,
  },
  {
    id: "b2",
    name: "OMDC Jakarta Selatan",
    area: "Jakarta Selatan",
    address: "Jl. Kemang Raya No. 88, Jakarta Selatan, DKI Jakarta 12730",
    phone: "+62 812-3456-7891",
    openHours: "Senin – Sabtu: 09.00 – 21.00 · Minggu: 10.00 – 16.00",
  },
  {
    id: "b3",
    name: "OMDC Tangerang",
    area: "Tangerang",
    address: "Jl. Boulevard Raya No. 24, Tangerang, Banten 15158",
    phone: "+62 812-3456-7892",
    openHours: "Senin – Sabtu: 09.00 – 20.00 · Minggu: Tutup",
  },
];

const INITIAL_CMS_USERS: CmsUser[] = [
  { id: "cms-1", name: "dr. Oktri Manessa", email: "admin@omdc.id", role: "admin", initials: "OM", gradient: "from-pink-500 to-fuchsia-600", lastActive: "Sekarang" },
  { id: "cms-2", name: "drg. Bayu Pratama", email: "dokter@omdc.id", role: "doctor", initials: "BP", gradient: "from-rose-500 to-pink-600", lastActive: "5 menit lalu" },
  { id: "cms-3", name: "Siti Aminah", email: "resepsionis@omdc.id", role: "receptionist", initials: "SA", gradient: "from-amber-400 to-pink-500", lastActive: "Sekarang" },
  { id: "cms-4", name: "Andi Wijaya", email: "finance@omdc.id", role: "finance", initials: "AW", gradient: "from-emerald-500 to-teal-600", lastActive: "1 jam lalu" },
];

const INITIAL_QUEUE: QueueEntry[] = [
  {
    id: "q-001",
    number: "A-001",
    patientName: "Rina Marlina",
    patientPhone: "0812-1111-2222",
    service: "Scaling & Polishing",
    serviceIcon: "sparkles",
    doctor: "drg. Bayu Pratama",
    doctorInitials: "BP",
    doctorGradient: "from-rose-500 to-pink-600",
    status: "completed",
    source: "walk-in",
    checkInTime: new Date(Date.now() - 3600 * 1000).toISOString(),
    completedTime: new Date(Date.now() - 1800 * 1000).toISOString(),
    counter: 1,
  },
  {
    id: "q-002",
    number: "A-002",
    patientName: "Joko Susilo",
    patientPhone: "0812-3333-4444",
    service: "Tambal Gigi",
    serviceIcon: "stethoscope",
    doctor: "drg. Intan Permata",
    doctorInitials: "IP",
    doctorGradient: "from-fuchsia-500 to-pink-600",
    status: "serving",
    source: "walk-in",
    checkInTime: new Date(Date.now() - 1200 * 1000).toISOString(),
    calledTime: new Date(Date.now() - 600 * 1000).toISOString(),
    counter: 2,
  },
  {
    id: "q-003",
    number: "A-003",
    patientName: "Dewi Anggraini",
    patientPhone: "0812-5555-6666",
    service: "Konsultasi Behel",
    serviceIcon: "wrench",
    doctor: "drg. Oktri Manessa, Sp.Ort",
    doctorInitials: "OM",
    doctorGradient: "from-pink-500 to-fuchsia-600",
    status: "waiting",
    source: "booking",
    bookingId: "apt-001",
    checkInTime: new Date(Date.now() - 300 * 1000).toISOString(),
  },
  {
    id: "q-004",
    number: "A-004",
    patientName: "Budi Santoso",
    patientPhone: "0812-7777-8888",
    service: "Pemutihan Gigi",
    serviceIcon: "smile",
    status: "waiting",
    source: "walk-in",
    checkInTime: new Date(Date.now() - 180 * 1000).toISOString(),
  },
  {
    id: "q-005",
    number: "A-005",
    patientName: "Maya Sari",
    patientPhone: "0812-9999-0000",
    service: "Dental Kids",
    serviceIcon: "baby",
    doctor: "drg. Adelia Putri, Sp.KGA",
    doctorInitials: "AP",
    doctorGradient: "from-rose-500 to-amber-400",
    status: "waiting",
    source: "walk-in",
    checkInTime: new Date(Date.now() - 60 * 1000).toISOString(),
  },
];

const INITIAL_WALK_INS: WalkInPatient[] = [
  { id: "w-1", name: "Rina Marlina", phone: "0812-1111-2222", age: 32, isFirstVisit: false, registeredAt: new Date(Date.now() - 3700 * 1000).toISOString() },
  { id: "w-2", name: "Joko Susilo", phone: "0812-3333-4444", age: 45, isFirstVisit: true, registeredAt: new Date(Date.now() - 1300 * 1000).toISOString() },
  { id: "w-3", name: "Budi Santoso", phone: "0812-7777-8888", age: 38, isFirstVisit: false, registeredAt: new Date(Date.now() - 280 * 1000).toISOString() },
  { id: "w-4", name: "Maya Sari", phone: "0812-9999-0000", age: 28, isFirstVisit: true, registeredAt: new Date(Date.now() - 160 * 1000).toISOString() },
];

const INITIAL_SETTINGS: ClinicSettings = {
  clinicName: "OMDC",
  tagline: "Oktri Manessa Dental Clinic",
  address: "Jl. Melati Raya No. 17, Bekasi Selatan, Jawa Barat 17141",
  phone: "+62 812-3456-7890",
  email: "halo@omdc-dental.id",
  logoGradient: "from-pink-600 via-rose-500 to-fuchsia-600",
  primaryColor: "#DB2777",
  openHours: "Senin – Sabtu: 09.00 – 21.00",
  totalCounter: 3,
};

let queueCounter = 6;

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
  view: "website",
  appVersion: "v2.0.0",
  isAuthenticated: false,
  activeTab: "home",
  previousTab: null,

  cmsAuthenticated: false,
  cmsUser: null,

  user: MOCK_USER,
  appointments: MOCK_APPOINTMENTS,
  records: MOCK_MEDICAL_RECORDS,
  bills: MOCK_BILLS,
  transactions: MOCK_TRANSACTIONS,

  queue: INITIAL_QUEUE,
  walkInPatients: INITIAL_WALK_INS,
  doctors: INITIAL_DOCTORS,
  branches: INITIAL_BRANCHES,
  cmsUsers: INITIAL_CMS_USERS,
  clinicSettings: INITIAL_SETTINGS,

  selectedPatientId: "u-001",
  selectedBranchId: "b1",
  toasts: [],

  setView: (v) => set({ view: v }),
  setAppVersion: (v) => set({ appVersion: v }),
  setAuthenticated: (v) => set({ isAuthenticated: v }),
  setActiveTab: (t) => set((s) => ({ previousTab: s.activeTab, activeTab: t })),
  setSelectedPatientId: (id) => set({ selectedPatientId: id }),
  setSelectedBranchId: (id) => set({ selectedBranchId: id }),

  addAppointment: (a) => set((s) => ({ appointments: [a, ...s.appointments] })),
  cancelAppointment: (id) =>
    set((s) => ({
      appointments: s.appointments.map((a) =>
        a.id === id ? { ...a, status: "cancelled" as const } : a
      ),
    })),
  updateAppointmentStatus: (id, status) =>
    set((s) => ({
      appointments: s.appointments.map((a) => (a.id === id ? { ...a, status } : a)),
    })),
  payBill: (id) =>
    set((s) => ({
      bills: s.bills.map((b) => (b.id === id ? { ...b, status: "paid" as const } : b)),
    })),
  addTransaction: (t) => set((s) => ({ transactions: [t, ...s.transactions] })),

  // Queue actions
  addQueueEntry: (e) => {
    const num = `A-${String(queueCounter++).padStart(3, "0")}`;
    const entry: QueueEntry = {
      ...e,
      id: `q-${Date.now()}`,
      number: num,
      checkInTime: new Date().toISOString(),
    };
    set((s) => ({ queue: [...s.queue, entry] }));
    return entry;
  },
  updateQueueStatus: (id, status, counter) =>
    set((s) => ({
      queue: s.queue.map((q) =>
        q.id === id
          ? {
              ...q,
              status,
              counter: counter ?? q.counter,
              calledTime: status === "serving" ? new Date().toISOString() : q.calledTime,
              completedTime: status === "completed" ? new Date().toISOString() : q.completedTime,
            }
          : q
      ),
    })),
  callNext: (counter) => {
    const state = get();
    const next = state.queue.find((q) => q.status === "waiting");
    if (!next) return null;
    get().updateQueueStatus(next.id, "serving", counter);
    return state.queue.find((q) => q.id === next.id) ?? next;
  },

  // Walk-in patient
  addWalkInPatient: (p) => {
    const patient: WalkInPatient = {
      ...p,
      id: `w-${Date.now()}`,
      registeredAt: new Date().toISOString(),
    };
    set((s) => ({ walkInPatients: [patient, ...s.walkInPatients] }));
    return patient;
  },

  // CMS
  setCmsAuth: (v, user) => set({ cmsAuthenticated: v, cmsUser: user ?? null }),
  updateDoctorStatus: (id, status) =>
    set((s) => ({
      doctors: s.doctors.map((d) => (d.id === id ? { ...d, status } : d)),
    })),
  updateDoctor: (id, updates) =>
    set((s) => ({
      doctors: s.doctors.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    })),
  updateClinicSettings: (s) =>
    set((state) => ({ clinicSettings: { ...state.clinicSettings, ...s } })),
  updateBranch: (id, updates) =>
    set((s) => ({
      branches: s.branches.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    })),

  pushToast: (t) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    set((s) => ({
      toasts: [...s.toasts, { id, variant: "default", ...t }],
    }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) }));
    }, 3000);
  },
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  reset: () =>
    set({
      view: "website",
      appVersion: "v2.0.0",
      isAuthenticated: false,
      activeTab: "home",
      previousTab: null,
      cmsAuthenticated: false,
      cmsUser: null,
      user: MOCK_USER,
      appointments: MOCK_APPOINTMENTS,
      records: MOCK_MEDICAL_RECORDS,
      bills: MOCK_BILLS,
      transactions: MOCK_TRANSACTIONS,
      queue: INITIAL_QUEUE,
      walkInPatients: INITIAL_WALK_INS,
      doctors: INITIAL_DOCTORS,
      branches: INITIAL_BRANCHES,
      cmsUsers: INITIAL_CMS_USERS,
      clinicSettings: INITIAL_SETTINGS,
      selectedPatientId: "u-001",
      selectedBranchId: "b1",
    }),
    }),
    {
      name: "omdc-store-v4",
      storage: createJSONStorage(() => {
        // Guard for SSR — return a noop storage on server
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return window.localStorage;
      }),
      // Only persist data, not transient UI state
      partialize: (state) => ({
        appVersion: state.appVersion,
        appointments: state.appointments,
        bills: state.bills,
        transactions: state.transactions,
        queue: state.queue,
        walkInPatients: state.walkInPatients,
        doctors: state.doctors,
        branches: state.branches,
        clinicSettings: state.clinicSettings,
        user: state.user,
        records: state.records,
        selectedBranchId: state.selectedBranchId,
      }),
      version: 4,
      // Skip auto-hydration to prevent SSR mismatch.
      // Hydration is handled manually via useHasHydrated hook.
      skipHydration: true,
      // Migrate from older versions
      migrate: (persistedState: any, version: number) => {
        if (version < 2 && persistedState) {
          persistedState.view = "website";
        }
        if (version < 3 && persistedState) {
          persistedState.doctors = undefined;
          persistedState.branches = undefined;
          persistedState.selectedBranchId = "b1";
        }
        if (version < 4 && persistedState) {
          persistedState.appVersion = "v2.0.0";
        }
        return persistedState;
      },
    },
  ),
);
