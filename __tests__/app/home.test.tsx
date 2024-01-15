import React from "react";
import { render } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  test("renders the NewVaultForm", () => {
    const { getAllByRole } = render(<Home />);
    const newVaultForm = getAllByRole("button");

    expect(newVaultForm[0]).toHaveTextContent("Create Vault");
    expect(newVaultForm[1]).toHaveTextContent("Open a Vault");
  });
});
