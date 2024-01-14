import React from "react";
import { render, screen } from "@testing-library/react";
import OpenVault from "@/app/open-vault/page";

describe("open-vault", () => {
  test("renders the home page", () => {
    render(<OpenVault />);

    expect(screen.getByText("Open Vault")).toBeInTheDocument();
  });
});
