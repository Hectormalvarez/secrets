import React from "react";
import { render } from "@testing-library/react";
import NewVaultPage from "@/app/new-vault/page";

describe("new-vault", () => {
  test("renders the NewVaultForm", () => {
    const { getAllByRole } = render(<NewVaultPage />);
    const newVaultForm = getAllByRole("button");

    expect(newVaultForm[0]).toHaveTextContent("Create Vault");
    expect(newVaultForm[1]).toHaveTextContent("Open a Vault");
  });
});
