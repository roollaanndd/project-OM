import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeToggle } from "@/components/shared/theme-toggle";

vi.mock("@/lib/app-store", () => ({
  useAppStore: vi.fn((selector) => {
    const state = { theme: "light", toggleTheme: vi.fn() };
    return selector ? selector(state) : state;
  }),
}));

describe("ThemeToggle", () => {
  it("should render a button", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should have accessible label", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Aktifkan mode gelap");
  });

  it("should contain an icon (SVG)", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button.querySelector("svg")).toBeInTheDocument();
  });
});
