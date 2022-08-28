import { render } from "@testing-library/react";
import OpenSecret from "./OpenSecret";

describe("<OpenSecret /> smoke test", () => {
    it("renders without error", () => {
        render(<OpenSecret />)
    })
});
