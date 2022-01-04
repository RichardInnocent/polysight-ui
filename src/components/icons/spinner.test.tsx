import React from "react";
import Spinner from "./spinner";
import { render } from "@testing-library/react";

describe("spinner", () => {
  it("renders", () => {
    render(<Spinner />);
  });
});
