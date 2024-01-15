import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import NewVaultForm from "@/components/NewVaultForm";

describe("NewVaultForm", () => {
  const { getByText, getByPlaceholderText, queryByText } = render(<NewVaultForm />);
  const vaultNameInput = getByPlaceholderText("enter your vault text");
  const passwordInput = getByPlaceholderText("enter your password");
  const submitButton = getByText("Create Vault");

  test("required error on empty submit", async () => {
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // expect required field validation errors to be displayed
    expect(getByText("Cannot save empty vault!")).toBeInTheDocument();
    expect(getByText("Password is required!")).toBeInTheDocument();
  });

  test("no required error on valid submit", async () => {
    await act(async () => {
      fireEvent.change(vaultNameInput, { target: { value: "My Vault" } });
      fireEvent.change(passwordInput, { target: { value: "secret123" } });
      fireEvent.click(submitButton);
    });
    
    // Expect no validation errors
    expect(queryByText("Vault name is required")).not.toBeInTheDocument();
    expect(queryByText("Password is required")).not.toBeInTheDocument();
  });
});
