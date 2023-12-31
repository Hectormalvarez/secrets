import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

test("renders the footer with expected content and current year", () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  render(<Footer />);
  // Check for partial text until the year
  const copyrightText = screen.getByText(/Copyright © /i);
  // Get full text
  const fullCopyrightText = copyrightText.textContent;

  expect(copyrightText).toBeInTheDocument();
  expect(fullCopyrightText).toMatch(
    `Copyright © ${currentYear} Taylor Made Tech Net`
  ); // Assert full text including year
});
