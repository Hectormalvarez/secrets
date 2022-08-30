import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";

describe("<Header /> smoke test", () => {
  it("loads without errors", () => {
    render(<Header />);
  });
});
