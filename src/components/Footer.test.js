import React from 'react'
import { render, screen } from '@testing-library/react'

import Footer from './Footer'

describe('<Footer />', () => {
  it("loads up correctly", () => {
    render(<Footer />)
    expect(screen.getByText("by Taylor Made Technology Network")).toBeInTheDocument()
    expect(screen.getByText("by Taylor Made Technology Network")).toBeInTheDocument()

  });
});