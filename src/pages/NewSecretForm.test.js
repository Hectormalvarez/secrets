import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event"
import NewSecretForm from "./NewSecretForm";

describe('<NewSecretForm />', () => {
  it("loads up correctly", () => {
    render(<NewSecretForm />)
    expect(screen.getByText("Enter a New Secret")).toBeInTheDocument()
    expect(screen.getByText("Create New Secret")).toBeInTheDocument()
  });

  test("able to enter text", () => {
    render(<NewSecretForm />)
    const newSecretTextArea = screen.getByPlaceholderText("Enter New Secret Here")
    user.type(newSecretTextArea, 'This is a new secret')
    expect(screen.getByText('This is a new secret')).toBeInTheDocument()
  })
});