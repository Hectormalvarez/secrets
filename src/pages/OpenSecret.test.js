import { render } from "@testing-library/react";
import OpenSecret from "./OpenSecret";

jest.mock("nanoid", () => {
  return { nanoid: () => "1234" };
});

describe("<OpenSecret /> smoke test", () => {
    it("renders without error", () => {
        render(<OpenSecret />)
    })
});
