import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

test("renders the header with expected content and links", () => {
  render(<Header />);

  // Check for header elements
  const header = screen.getByRole("banner");
  expect(header).toBeInTheDocument();

  // Check for title
  const title = screen.getByText(/Vault/i);
  expect(title).toBeInTheDocument();
});
