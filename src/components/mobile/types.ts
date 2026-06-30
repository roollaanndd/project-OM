// Mobile app type definitions

export type MemberTier = "Silver" | "Gold" | "Platinum";

export type AppointmentStatus = "upcoming" | "completed" | "cancelled";

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age: number;
  initials: string;
  gradient: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  initials: string;
  gradient: string;
  memberTier: MemberTier;
  points: number;
  pointsToNextTier: number;
  joinedDate: string;
  familyMembers: FamilyMember[];
}

export interface Appointment {
  id: string;
  service: string;
  serviceIcon: string;
  doctor: string;
  doctorInitials: string;
  doctorGradient: string;
  date: string; // ISO date
  time: string;
  duration: string;
  status: AppointmentStatus;
  price: number;
  clinic: string;
  address: string;
  phone?: string;
  patientPhone?: string;
}

export interface Prescription {
  name: string;
  dosage: string;
  duration: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  doctor: string;
  doctorInitials: string;
  doctorGradient: string;
  doctorSpecialty: string;
  service: string;
  serviceIcon: string;
  diagnosis: string;
  treatment: string;
  prescription: Prescription[];
  notes: string;
  cost: number;
  affectedTeeth: {
    upper: number[];
    lower: number[];
  };
}

export type BillStatus = "unpaid" | "paid" | "overdue";

export interface Bill {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: BillStatus;
  service: string;
  date: string;
}

export type PaymentMethodType = "gopay" | "ovo" | "dana" | "card" | "bank" | "qris";

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  label: string;
  detail: string;
  balance?: number;
  isDefault?: boolean;
  gradient: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  method: string;
  status: "success" | "pending" | "failed";
  invoiceId: string;
}

export type ScreenTab =
  | "home"
  | "booking"
  | "records"
  | "payments"
  | "profile";
