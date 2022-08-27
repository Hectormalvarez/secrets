import { render } from "@testing-library/react";
import NewSecret from "./NewSecret";

jest.mock("nanoid", () => {
  return { nanoid: () => "1234" };
});

describe("<NewSecret /> smoke test", () => {
  it("renders without crashing", () => {
    render(<NewSecret />);
  });
});
