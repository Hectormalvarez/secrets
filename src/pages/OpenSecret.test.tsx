import React from "react";
import { render } from "@testing-library/react";
import OpenSecret from "./OpenSecret";

jest.mock("nanoid", () => {
  return { nanoid: () => "1234" };
});
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

describe("<OpenSecret /> smoke test", () => {
  it("renders without error", () => {
    render(<OpenSecret />);
  });
});
