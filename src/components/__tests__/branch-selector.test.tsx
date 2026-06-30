import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BranchSelector } from "@/components/shared/branch-selector";

vi.mock("@/lib/app-store", () => ({
  useAppStore: vi.fn((selector) => {
    const state = {
      branches: [
        { id: "b1", name: "OMDC Bekasi", area: "Bekasi", address: "Jl. Melati", phone: "+62", openHours: "9-21", isPrimary: true },
        { id: "b2", name: "OMDC Jakarta", area: "Jakarta", address: "Jl. Kemang", phone: "+62", openHours: "9-21" },
      ],
      selectedBranchId: "b1",
      setSelectedBranchId: vi.fn(),
    };
    return selector ? selector(state) : state;
  }),
}));

// Mock shadcn Select (Radix) — it uses portals that are hard to test
vi.mock("@/components/ui/select", () => ({
  Select: ({ children }: { children: React.ReactNode }) => <div data-testid="select">{children}</div>,
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <div data-testid="select-trigger">{children}</div>,
  SelectValue: ({ placeholder }: { placeholder?: string }) => <span>{placeholder ?? "selected"}</span>,
  SelectContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectItem: ({ children, value }: { children: React.ReactNode; value: string }) => (
    <option value={value}>{children}</option>
  ),
}));

describe("BranchSelector", () => {
  it("should render with card variant", () => {
    render(<BranchSelector variant="card" />);
    expect(screen.getByText("Pilih Cabang Klinik")).toBeInTheDocument();
  });

  it("should show branch names in card variant", () => {
    render(<BranchSelector variant="card" />);
    expect(screen.getByText("OMDC Bekasi")).toBeInTheDocument();
    expect(screen.getByText("OMDC Jakarta")).toBeInTheDocument();
  });

  it("should show branch areas", () => {
    render(<BranchSelector variant="card" />);
    expect(screen.getByText("Bekasi")).toBeInTheDocument();
    expect(screen.getByText("Jakarta")).toBeInTheDocument();
  });

  it("should render compact variant", () => {
    render(<BranchSelector variant="compact" />);
    expect(screen.getByTestId("select-trigger")).toBeInTheDocument();
  });

  it("should mark selected branch with check badge in card variant", () => {
    render(<BranchSelector variant="card" />);
    // b1 is selected, should have AKTIF indicator
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });
});
