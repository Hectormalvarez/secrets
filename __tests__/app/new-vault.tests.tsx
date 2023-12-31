import React from "react";
import { render, screen } from "@testing-library/react";
import NewVault from '@/app/new-vault/page'


describe("testing the new-vault home page", () => {
  test("renders the new-vault home page", () => {
    render(<NewVault />)
    expect(screen.getByText("New Vault")).toBeInTheDocument()
  })
})