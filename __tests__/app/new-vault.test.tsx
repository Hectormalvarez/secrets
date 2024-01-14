import React from "react";
import { render, screen } from "@testing-library/react";
import NewVault from "@/app/new-vault/page";

describe("new-vault", () => {
  test("renders the home page", () => {
    render(<NewVault />);

    expect(screen.getByText("New Vault")).toBeInTheDocument();
  });
});
