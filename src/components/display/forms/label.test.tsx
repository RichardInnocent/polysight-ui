import React from "react";
import Label from "./label";
import { render, screen } from "@testing-library/react";

describe("Label", () => {
  it("renders text", () => {
    const labelText = "Test label";
    render(<Label>{labelText}</Label>);
    expect(screen.getByText(labelText)).toBeInTheDocument();
  });
});
