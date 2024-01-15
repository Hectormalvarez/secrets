import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

describe("Header", () => {
  test("renders the header with expected content and links", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    const logo = screen.getByAltText(/Vault Logo/i);
    const brand = screen.getByText("Vault");
    expect(logo).toBeInTheDocument();
    expect(brand).toBeInTheDocument();
  });
});
