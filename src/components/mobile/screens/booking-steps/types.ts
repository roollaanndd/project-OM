export interface BookingStepProps {
  serviceId: string;
  setServiceId: (id: string) => void;
  doctorId: string;
  setDoctorId: (id: string) => void;
  date: string;
  setDate: (d: string) => void;
  time: string;
  setTime: (t: string) => void;
  patientId: string;
  setPatientId: (id: string) => void;
  user: import("@/lib/app-store").CmsUser | null;
}
