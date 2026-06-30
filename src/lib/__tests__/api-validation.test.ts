import { describe, it, expect } from "vitest";

// Mock the booking API validation logic
// (Testing the actual route requires a running server, so we test the schema)

import { z } from "zod";

const BookingSchema = z.object({
  name: z.string().trim().min(2, "Nama wajib diisi").max(100),
  phone: z.string().trim().min(8, "Telepon tidak valid").max(20),
  email: z.string().trim().max(150).regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).optional().or(z.literal("")),
  service: z.string().trim().min(2).max(100),
  date: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().trim().regex(/^\d{2}:\d{2}$/),
});

describe("Booking API Validation", () => {
  it("should accept valid booking data", () => {
    const data = {
      name: "Sarah Wijayanti",
      phone: "081234567890",
      service: "Scaling & Polishing",
      date: "2025-12-15",
      time: "10:00",
    };
    const result = BookingSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should reject name that is too short", () => {
    const result = BookingSchema.safeParse({
      name: "S",
      phone: "081234567890",
      service: "Scaling",
      date: "2025-12-15",
      time: "10:00",
    });
    expect(result.success).toBe(false);
  });

  it("should reject phone that is too short", () => {
    const result = BookingSchema.safeParse({
      name: "Sarah",
      phone: "123",
      service: "Scaling",
      date: "2025-12-15",
      time: "10:00",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid date format", () => {
    const result = BookingSchema.safeParse({
      name: "Sarah",
      phone: "081234567890",
      service: "Scaling",
      date: "15-12-2025",
      time: "10:00",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid time format", () => {
    const result = BookingSchema.safeParse({
      name: "Sarah",
      phone: "081234567890",
      service: "Scaling",
      date: "2025-12-15",
      time: "10:00:00",
    });
    expect(result.success).toBe(false);
  });

  it("should accept valid email", () => {
    const result = BookingSchema.safeParse({
      name: "Sarah",
      phone: "081234567890",
      email: "sarah@email.com",
      service: "Scaling",
      date: "2025-12-15",
      time: "10:00",
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid email", () => {
    const result = BookingSchema.safeParse({
      name: "Sarah",
      phone: "081234567890",
      email: "not-an-email",
      service: "Scaling",
      date: "2025-12-15",
      time: "10:00",
    });
    expect(result.success).toBe(false);
  });

  it("should accept empty email (optional)", () => {
    const result = BookingSchema.safeParse({
      name: "Sarah",
      phone: "081234567890",
      email: "",
      service: "Scaling",
      date: "2025-12-15",
      time: "10:00",
    });
    expect(result.success).toBe(true);
  });
});

describe("Queue API Validation", () => {
  const QueueSchema = z.object({
    patientName: z.string().min(2).max(100),
    patientPhone: z.string().min(8).max(20).optional(),
    service: z.string().min(2).max(100),
    source: z.enum(["walk-in", "booking"]).default("walk-in"),
  });

  it("should accept valid queue entry", () => {
    const result = QueueSchema.safeParse({
      patientName: "John Doe",
      service: "Scaling & Polishing",
    });
    expect(result.success).toBe(true);
  });

  it("should reject empty patient name", () => {
    const result = QueueSchema.safeParse({
      patientName: "",
      service: "Scaling",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid source", () => {
    const result = QueueSchema.safeParse({
      patientName: "John",
      service: "Scaling",
      source: "invalid",
    });
    expect(result.success).toBe(false);
  });

  it("should default source to walk-in", () => {
    const result = QueueSchema.safeParse({
      patientName: "John",
      service: "Scaling",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.source).toBe("walk-in");
    }
  });
});

describe("Payment API Validation", () => {
  const PaymentSchema = z.object({
    description: z.string().min(2).max(200),
    amount: z.number().positive(),
    method: z.enum(["cash", "card", "qris", "ewallet"]).default("cash"),
  });

  it("should accept valid payment", () => {
    const result = PaymentSchema.safeParse({
      description: "Scaling & Polishing",
      amount: 250000,
      method: "cash",
    });
    expect(result.success).toBe(true);
  });

  it("should reject negative amount", () => {
    const result = PaymentSchema.safeParse({
      description: "Test",
      amount: -100,
      method: "cash",
    });
    expect(result.success).toBe(false);
  });

  it("should reject zero amount", () => {
    const result = PaymentSchema.safeParse({
      description: "Test",
      amount: 0,
      method: "cash",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid method", () => {
    const result = PaymentSchema.safeParse({
      description: "Test",
      amount: 100,
      method: "bitcoin",
    });
    expect(result.success).toBe(false);
  });

  it("should default method to cash", () => {
    const result = PaymentSchema.safeParse({
      description: "Test",
      amount: 100,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.method).toBe("cash");
    }
  });
});
