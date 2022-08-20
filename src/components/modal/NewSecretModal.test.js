import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import NewSecretModal from "./NewSecretModal";

describe("<NewSecretModal />", () => {
  it("loads correctly", () => {
    render(<NewSecretModal />)
    expect(screen.getByText("New Secret Created!")).toBeInTheDocument()
    expect(screen.getByRole("button", {name: "View Secret"})).toBeVisible()
    expect(screen.getByRole("button", {name: "New Secret"})).toBeVisible()
  })
});