import { screen, render } from "@testing-library/react";
import OpenSecret from "./OpenSecret";

describe("<OpenSecret /> Page", () => {
    it("loads successfully", () => {
        render(<OpenSecret />)
        screen.debug()
    })
});
