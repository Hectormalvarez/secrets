import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";

describe("<Footer /> smoke test", () => {
  it("renders without error", () => {
    render(<Footer />);
  });
});
