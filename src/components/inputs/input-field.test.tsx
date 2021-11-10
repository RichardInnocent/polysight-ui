import React from "react";
import InputField from "./input-field";
import { fireEvent, render } from "@testing-library/react";

it("renders successfully", () => {
  render(<InputField type="text" />);
});

it("renders the placeholder", () => {
  const placeholder = "Some placeholder text";
  const { queryByPlaceholderText } = render(
    <InputField type="text" placeholder={placeholder} />
  );

  expect(queryByPlaceholderText(placeholder)).toBeInTheDocument();
});

it("calls the on change function when its value is modified", () => {
  const placeholder = "Some placeholder text";
  const onChangeFunction = jest.fn();
  const { getByPlaceholderText } = render(
    <InputField
      type="text"
      onChange={onChangeFunction}
      placeholder={placeholder}
    />
  );

  // Shouldn't have been called yet
  expect(onChangeFunction.mock.calls.length).toBe(0);

  const newValue = "New value";

  fireEvent.change(getByPlaceholderText(placeholder), {
    target: { value: newValue },
  });

  expect(onChangeFunction.mock.calls.length).toBe(1);
});
