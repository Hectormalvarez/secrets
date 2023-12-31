import React from "react";
import { render, screen } from "@testing-library/react";
import OpenVault from '@/app/open-vault/page'


describe("testing the open-vault home page", () => {
  test("renders the open-vault home page", () => {
    render(<OpenVault />)
    expect(screen.getByText("Open Vault")).toBeInTheDocument()
  })
})