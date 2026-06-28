"use client";

import { useState } from "react";
import { KioskShell } from "./kiosk-shell";
import { KioskWelcome } from "./screens/welcome";
import { KioskWalkIn } from "./screens/walk-in";
import { KioskCheckIn } from "./screens/check-in";
import { KioskPayment } from "./screens/payment";
import { KioskTicket } from "./screens/ticket";

type KioskMode = "welcome" | "walk-in" | "check-in" | "payment" | "ticket";

interface TicketData {
  ticketNumber: string;
  patientName: string;
  service: string;
  doctor?: string;
  doctorInitials?: string;
  doctorGradient?: string;
  queuePosition: number;
  estimatedWait: number;
  bookingId?: string;
}

export function KioskApp() {
  const [mode, setMode] = useState<KioskMode>("welcome");
  const [ticket, setTicket] = useState<TicketData | null>(null);

  const handleWalkInComplete = (data: TicketData) => {
    setTicket(data);
    setMode("ticket");
  };

  const handleCheckInComplete = (data: TicketData) => {
    setTicket(data);
    setMode("ticket");
  };

  return (
    <KioskShell>
      {mode === "welcome" && <KioskWelcome onSelect={(m) => setMode(m as KioskMode)} />}
      {mode === "walk-in" && (
        <KioskWalkIn onComplete={handleWalkInComplete} onBack={() => setMode("welcome")} />
      )}
      {mode === "check-in" && (
        <KioskCheckIn onComplete={handleCheckInComplete} onBack={() => setMode("welcome")} />
      )}
      {mode === "payment" && (
        <KioskPayment onComplete={() => setMode("welcome")} onBack={() => setMode("welcome")} />
      )}
      {mode === "ticket" && ticket && (
        <KioskTicket data={ticket} onDone={() => setMode("welcome")} />
      )}
    </KioskShell>
  );
}
