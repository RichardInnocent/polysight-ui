import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Button from "./button";

const buttonName = "Button";

describe("Button", () => {
  describe("Rendering", () => {
    it("renders", () => {
      render(<Button />);
    });
  });

  describe("Loading state", () => {
    const waitTime = 2000;

    const onClick = jest.fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      return;
    });

    it("renders the loading spinner while waiting for the action to complete, and then removes it", async () => {
      const view = render(
        <Button showSpinnerOnLoad={true} onClick={onClick}>
          {buttonName}
        </Button>
      );

      expect(view.queryByRole("progressbar")).not.toBeInTheDocument();
      fireEvent.click(getButton());
      expect(view.getByRole("progressbar")).toBeInTheDocument();

      await waitFor(() => {
        expect(view.queryByRole("progressbar")).not.toBeInTheDocument();
      });
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("ignores any other clicks while loading", async () => {
      const view = render(
        <Button showSpinnerOnLoad={true} onClick={onClick}>
          {buttonName}
        </Button>
      );

      expect(view.queryByRole("progressbar")).not.toBeInTheDocument();
      fireEvent.click(getButton());
      expect(view.getByRole("progressbar")).toBeInTheDocument();

      // Clicking an additional three times while the button is still in a loading state
      for (let i = 0; i < 3; i++) {
        fireEvent.click(getButton());
      }

      await waitFor(() => {
        expect(view.queryByRole("progressbar")).not.toBeInTheDocument();
      });
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});

function getButton(): HTMLButtonElement {
  return screen.getByRole("button") as HTMLButtonElement;
}
