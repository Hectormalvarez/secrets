import { screen, render } from "@testing-library/react";
import Header from "./Header";

describe('<Header />', () => {
  it("loads up correctly", () => {
    render(<Header />)
    expect(screen.getByText("Taylor Made Secrets")).toBeInTheDocument()
  });
});