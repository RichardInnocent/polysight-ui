import React from "react";
import FormErrorMessage from "./formErrorMessage";
import { render, screen } from "@testing-library/react";

describe("FormErrorMessage", () => {
  it("renders with text", () => {
    const errorMessage = "Please enter a valid value";
    render(<FormErrorMessage>{errorMessage}</FormErrorMessage>);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
