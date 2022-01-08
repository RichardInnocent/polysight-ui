import React from "react";
import Input from "./input";
import { fireEvent, render, screen } from "@testing-library/react";

describe("input", () => {
  it("renders successfully", () => {
    render(<Input type="text" />);
  });

  it("renders the placeholder", () => {
    const placeholder = "Some placeholder text";
    render(<Input type="text" placeholder={placeholder} />);

    expect(screen.queryByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it("calls the on change function when its value is modified", () => {
    const placeholder = "Some placeholder text";
    const onChangeFunction = jest.fn();
    render(
      <Input
        type="text"
        onChange={onChangeFunction}
        placeholder={placeholder}
      />
    );

    // Shouldn't have been called yet
    expect(onChangeFunction.mock.calls.length).toBe(0);

    const newValue = "New value";

    fireEvent.change(screen.getByPlaceholderText(placeholder), {
      target: { value: newValue },
    });

    expect(onChangeFunction.mock.calls.length).toBe(1);
  });
});
