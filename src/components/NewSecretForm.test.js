import { screen, render } from "@testing-library/react";
import NewSecretForm from "./NewSecretForm";

describe('<NewSecretForm />', () => {
  it("loads up correctly", () => {
    render(<NewSecretForm />)
    expect(screen.getByText("Enter a New Secret")).toBeInTheDocument()
    expect(screen.getByText("Create New Secret")).toBeInTheDocument()
  });

});