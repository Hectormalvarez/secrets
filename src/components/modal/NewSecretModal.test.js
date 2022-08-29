import { render } from "@testing-library/react";

import NewSecretModal from "./NewSecretModal";

describe("<NewSecretModal /> smoke test", () => {
  it("renders without error", () => {
    const setIsOpen = jest.fn();
    render(<NewSecretModal isOpen={true} setIsOpen={setIsOpen} />);
  });
});
