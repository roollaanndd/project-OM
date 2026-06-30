import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { OmdcLogo } from "@/components/dental/logo";

describe("OmdcLogo", () => {
  it("should render OMDC text", () => {
    render(<OmdcLogo />);
    expect(screen.getByText("OMDC")).toBeInTheDocument();
  });

  it("should render SVG logo mark", () => {
    const { container } = render(<OmdcLogo />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("should show subtitle when showSubtitle=true", () => {
    render(<OmdcLogo showSubtitle />);
    expect(screen.getByText("Oktri Manessa Dental Clinic")).toBeInTheDocument();
  });

  it("should not show subtitle by default", () => {
    render(<OmdcLogo />);
    expect(screen.queryByText("Oktri Manessa Dental Clinic")).not.toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(<OmdcLogo className="custom-class" />);
    expect(container.firstChild).toHaveProperty("className");
  });
});
