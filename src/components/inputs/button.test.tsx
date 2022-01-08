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
    const waitTime = 50;
    const onClickImpl = async () => {
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    };

    it("renders the loading spinner while waiting for the action to complete, and then removes it", async () => {
      const onClick = jest.fn(onClickImpl);

      render(
        <Button showSpinnerOnLoad={true} onClick={onClick}>
          {buttonName}
        </Button>
      );

      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
      fireEvent.click(getButton());
      expect(screen.getByRole("progressbar")).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
      });
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("ignores any other clicks while loading", async () => {
      const onClick = jest.fn(onClickImpl);

      render(
        <Button showSpinnerOnLoad={true} onClick={onClick}>
          {buttonName}
        </Button>
      );

      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
      fireEvent.click(getButton());
      expect(screen.getByRole("progressbar")).toBeInTheDocument();

      // Clicking an additional three times while the button is still in a loading state
      for (let i = 0; i < 3; i++) {
        fireEvent.click(getButton());
      }

      await waitFor(() => {
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
      });
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});

function getButton(): HTMLButtonElement {
  return screen.getByRole("button") as HTMLButtonElement;
}
