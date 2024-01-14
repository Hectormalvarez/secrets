import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

describe("Header", () => {
  test("renders the header with expected content and links", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    const image = screen.getByAltText(/Vault Logo/i);
    expect(image).toBeInTheDocument();

    const brand = screen.getByText("Vault")
    expect(brand).toBeInTheDocument();
  });
});
