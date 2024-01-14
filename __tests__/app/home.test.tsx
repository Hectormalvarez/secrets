import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  test("renders the NewVaultForm", () => {
    const { getByRole } = render(<Home />);
    const newVaultForm = getByRole("button");

    expect(newVaultForm).toHaveTextContent("Create Vault");
  });
});
