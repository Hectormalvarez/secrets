import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  test("renders copyright with current year", () => {
    const currentYear = new Date().getFullYear();
    render(<Footer />);
    const copyrightText = screen.getByText(/Copyright © /i);
    const fullCopyrightText = copyrightText.textContent;

    expect(copyrightText).toBeInTheDocument();
    expect(fullCopyrightText).toMatch(
      `Copyright © ${currentYear} Taylor Made Tech Net`,
    );
  });
});
