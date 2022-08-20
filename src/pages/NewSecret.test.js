import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import NewSecret from "./NewSecret";

describe("<NewSecret />", () => {
  it("loads up correctly", () => {
    render(<NewSecret />);
    expect(screen.getByText("Enter a New Secret")).toBeInTheDocument();
    expect(screen.getByText("Create New Secret")).toBeInTheDocument();
  });

  test("able to enter text", () => {
    render(<NewSecret />);
    const newSecretTextArea = screen.getByPlaceholderText(
      "Enter New Secret Here"
    );
    user.type(newSecretTextArea, "This is a new secret");
  });

  test("new secret modal opens with successful submit", () => {
    render(<NewSecret />);
    const newSecretTextArea = screen.getByPlaceholderText(
      "Enter New Secret Here"
    );
    user.type(newSecretTextArea, "This is a new secret");
    user.click(screen.getByText("Create New Secret"));
    expect(screen.getByText("New Secret Created!")).toBeInTheDocument();
    screen.debug()
  });
});
